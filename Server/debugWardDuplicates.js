const mongoose = require('mongoose');
const Ward = require('./src/models/Ward');
require('dotenv').config();

const compareZones = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hrms');

        const shSouth = await Ward.find({ zoneName: 'Sh South Zone' }).sort({ wardNumber: 1 });
        const shahdaraSouth = await Ward.find({ zoneName: 'Shahdara South' }).sort({ wardNumber: 1 });

        console.log(`\n--- "Sh South Zone" (${shSouth.length}) ---`);
        shSouth.forEach(w => console.log(`${w.wardNumber}: ${w.wardName}`));

        console.log(`\n--- "Shahdara South" (${shahdaraSouth.length}) ---`);
        shahdaraSouth.forEach(w => console.log(`${w.wardNumber}: ${w.wardName}`));

        // Check for overlaps
        const shSouthIds = shSouth.map(w => w.wardNumber);
        const shahdaraSouthIds = shahdaraSouth.map(w => w.wardNumber);
        const intersection = shSouthIds.filter(id => shahdaraSouthIds.includes(id));

        console.log(`\nOverlapping Ward Numbers: ${intersection.length}`);
        if (intersection.length > 0) {
            console.log(intersection);
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

compareZones();
