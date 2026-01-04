const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const WardPoint = require('./src/models/WardPoint');
require('dotenv').config();

const seedWardPoints = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hrms');
        console.log('MongoDB connected for WardPoint seeding');

        const kmlPath = path.join(__dirname, 'Scripts', 'delhi_wards.kml');
        const kmlContent = fs.readFileSync(kmlPath, 'utf8');

        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(kmlContent);

        const placemarks = result.kml.Document[0].Folder[0].Placemark;
        console.log(`Found ${placemarks.length} wards in KML.`);

        let processedCount = 0;
        let errorCount = 0;

        for (const placemark of placemarks) {
            try {
                // Extract Ward Number and Name from SchemaData
                const schemaData = placemark.ExtendedData?.[0]?.SchemaData?.[0]?.SimpleData;
                if (!schemaData) {
                    // console.warn('Skipping placemark with no SchemaData');
                    continue;
                }

                let wardNo = '';
                let wardName = '';

                schemaData.forEach(data => {
                    if (data.$.name === 'Ward_No') wardNo = data._;
                    if (data.$.name === 'WardName') wardName = data._;
                });

                if (!wardNo || !wardName) {
                    // console.warn('Skipping placemark with missing Ward Number or Name');
                    continue;
                }

                // Extract Coordinates
                const polygon = placemark.Polygon?.[0];
                if (!polygon) continue;

                const outerBoundary = polygon.outerBoundaryIs?.[0];
                if (!outerBoundary) continue;

                const linearRing = outerBoundary.LinearRing?.[0];
                if (!linearRing) continue;

                const coordinatesStr = linearRing.coordinates?.[0];
                if (!coordinatesStr) continue;

                // Split by whitespace to get pairs of "lon,lat"
                const pointStrings = coordinatesStr.trim().split(/\s+/);

                const coordinates = pointStrings.map(pair => {
                    const parts = pair.split(',');
                    if (parts.length < 2) return null;
                    const lon = parseFloat(parts[0]);
                    const lat = parseFloat(parts[1]);
                    if (isNaN(lon) || isNaN(lat)) return null;
                    return [lon, lat];
                }).filter(c => c !== null);

                if (coordinates.length < 4) { // Polygon needs at least 4 points (3 + closed)
                    console.warn(`Ward ${wardNo} has insufficient points: ${coordinates.length}`);
                    continue;
                }

                // Ensure valid GeoJSON Polygon (first and last points must match)
                const first = coordinates[0];
                const last = coordinates[coordinates.length - 1];
                if (first[0] !== last[0] || first[1] !== last[1]) {
                    coordinates.push(first);
                }

                // Upsert WardPoint
                await WardPoint.findOneAndUpdate(
                    { wardNumber: String(wardNo) },
                    {
                        wardNumber: String(wardNo),
                        wardName: wardName,
                        boundary: {
                            type: 'Polygon',
                            coordinates: [coordinates]
                        }
                    },
                    { upsert: true, new: true }
                );

                process.stdout.write(`\rProcessed Ward ${wardNo}: ${wardName}          `);
                processedCount++;
            } catch (innerError) {
                console.error(`\nError processing ward: ${innerError.message}`);
                errorCount++;
            }
        }

        console.log(`\n\n✅ Successfully seeded ${processedCount} wards into WardPoints collection.`);
        console.log(`❌ Failed to process ${errorCount} wards.`);
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Fatal Error seeding WardPoints:', error);
        process.exit(1);
    }
};

seedWardPoints();
