const mongoose = require('mongoose');
const Ward = require('./src/models/Ward');
require('dotenv').config();

const run = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected.");

        const zone = "Shahdara South Zone";
        console.log(`Testing logic for: "${zone}"`);

        const baseZoneName = zone.replace(/ Zone$/i, '').trim();
        const zoneRegex = new RegExp(`^${baseZoneName}`, 'i');

        console.log(`Base: "${baseZoneName}", Regex: ${zoneRegex}`);

        const validWards = await Ward.find({
            $or: [
                { zoneName: zone },
                { zoneName: baseZoneName },
                { zoneName: zoneRegex },
                { zoneName: "Sh South Zone" }
            ]
        });

        console.log(`Found ${validWards.length} wards.`);
        if (validWards.length > 0) {
            console.log("SUCCESS: Found wards:", validWards.map(w => w.wardNumber).slice(0, 5));
        } else {
            console.log("FAILURE: No wards found.");
        }

    } catch (e) {
        console.error("Script Error:", e);
    } finally {
        mongoose.disconnect();
    }
};

run();
