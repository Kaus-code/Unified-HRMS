require('dotenv').config();
const mongoose = require('mongoose');
const Ward = require('./src/models/Ward');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hrms').then(async () => {
    // Check current state
    const shahdaraSouthZone = await Ward.find({ zoneName: 'Shahdara South Zone' }).select('wardNumber wardName');
    console.log('\n=== Wards in "Shahdara South Zone": ===');
    shahdaraSouthZone.forEach(w => console.log(`  ${w.wardNumber}: ${w.wardName}`));
    console.log('Total:', shahdaraSouthZone.length);

    const shahdaraSouth = await Ward.find({ zoneName: 'Shahdara South' }).select('wardNumber wardName');
    console.log('\n=== Wards in "Shahdara South": ===');
    shahdaraSouth.forEach(w => console.log(`  ${w.wardNumber}: ${w.wardName}`));
    console.log('Total:', shahdaraSouth.length);

    // Now fix: Revert wards 201-215 back to "Shahdara South"
    const result = await Ward.updateMany(
        {
            wardNumber: { $in: ['201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215'] }
        },
        { $set: { zoneName: 'Shahdara South' } }
    );
    console.log('\n=== Reverted wards 201-215 to "Shahdara South": ===', result.modifiedCount);

    // Verify final count
    const finalCount = await Ward.countDocuments({ zoneName: 'Shahdara South Zone' });
    console.log('\nFinal count in "Shahdara South Zone":', finalCount, '(should be 11)');

    process.exit(0);
});
