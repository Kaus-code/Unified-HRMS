const mongoose = require('mongoose');

const wardPointSchema = new mongoose.Schema({
    wardNumber: {
        type: String,
        required: true,
        unique: true
    },
    wardName: {
        type: String,
        required: true
    },
    // Using GeoJSON Polygon format for standard geospatial queries if needed,
    // but also keeping a simple array of points if the user prefers "points".
    // The user said "group of points", but KML has polygons.
    // I will store as a GeoJSON Polygon for robust verification using $geoIntersects.
    boundary: {
        type: {
            type: String,
            enum: ['Polygon'],
            required: true
        },
        coordinates: {
            type: [[[Number]]], // Array of arrays of arrays of numbers [ [ [lon, lat], [lon, lat] ] ]
            required: true
        }
    }
});

// Add 2dsphere index for geospatial queries
wardPointSchema.index({ boundary: '2dsphere' });

module.exports = mongoose.model('WardPoint', wardPointSchema);
