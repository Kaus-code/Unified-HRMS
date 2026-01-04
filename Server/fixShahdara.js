require('dotenv').config();
const mongoose = require('mongoose');
const Ward = require('./src/models/Ward');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hrms').then(async () => {
    // Update "Shahdara South" to "Shahdara South Zone"
    const result1 = await Ward.updateMany(
        { zoneName: 'Shahdara South' },
        { $set: { zoneName: 'Shahdara South Zone' } }
    );
    console.log('Updated "Shahdara South" → "Shahdara South Zone":', result1.modifiedCount);

    // Update "Sh South Zone" to "Shahdara South Zone"
    const result2 = await Ward.updateMany(
        { zoneName: 'Sh South Zone' },
        { $set: { zoneName: 'Shahdara South Zone' } }
    );
    console.log('Updated "Sh South Zone" → "Shahdara South Zone":', result2.modifiedCount);

    // Verify
    const count = await Ward.countDocuments({ zoneName: 'Shahdara South Zone' });
    console.log('Total wards in "Shahdara South Zone":', count);

    process.exit(0);
});
