const mongoose = require('mongoose');
const Ward = require('./src/models/Ward');
const fs = require('fs');
require('dotenv').config();

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const zones = await Ward.distinct('zoneName');
        fs.writeFileSync('zones_output.txt', JSON.stringify(zones, null, 2));
        console.log("Zones written to zones_output.txt");
    } catch (e) {
        fs.writeFileSync('zones_output.txt', "Error: " + e.message);
    } finally {
        mongoose.disconnect();
    }
};

run();
