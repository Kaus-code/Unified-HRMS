const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://aditya986896:aditya1234@unifiedhrms.qbpjztu.mongodb.net/';

const wardSchema = new mongoose.Schema({
    wardNumber: String,
    wardName: String,
    boundary: {}
}, { strict: false });

const Ward = mongoose.model('Ward', wardSchema);

async function check() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected.');

        const ward215 = await Ward.findOne({ wardNumber: '215' });
        if (!ward215) {
            console.log('Ward 215 NOT FOUND in DB!');
            process.exit(0);
        }

        console.log(`Ward 215 Found: ${ward215.wardName}`);
        if (!ward215.boundary || !ward215.boundary.coordinates) {
            console.log('Ward 215 has NO BOUNDARY data!');
            process.exit(0);
        }

        // Test Point
        const lat = 28.671778;
        const lon = 77.287064;

        console.log(`Testing Point: [${lon}, ${lat}]`);

        const isInside = await Ward.findOne({
            wardNumber: '215',
            boundary: {
                $geoIntersects: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lon, lat]
                    }
                }
            }
        });

        if (isInside) {
            console.log('SUCCESS: Point is INSIDE the polygon.');
        } else {
            console.log('FAILURE: Point is OUTSIDE the polygon.');

            // Print first few points of polygon to manually check
            const poly = ward215.boundary.coordinates[0];
            console.log(`Polygon has ${poly.length} points.`);
            console.log('First 5 points:', poly.slice(0, 5));

            // Check finding ANY ward this point is in
            const anyWard = await Ward.findOne({
                boundary: {
                    $geoIntersects: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lon, lat]
                        }
                    }
                }
            });

            if (anyWard) {
                console.log(`NOTE: This point is actually inside Ward ${anyWard.wardNumber} (${anyWard.wardName})!`);
            } else {
                console.log('This point is NOT inside ANY known ward polygon.');
            }
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

check();
