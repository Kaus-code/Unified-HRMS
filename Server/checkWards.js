require('dotenv').config();
const mongoose = require('mongoose');
const Ward = require('./src/models/Ward');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hrms').then(async () => {
    // Check what wards are in "Shahdara South Zone"
    const shahdaraSouthZone = await Ward.find({ zoneName: 'Shahdara South Zone' })
        .select('wardNumber wardName zoneName')
        .sort({ wardNumber: 1 });

    console.log('\n=== Wards in "Shahdara South Zone": ===');
    console.log('Total:', shahdaraSouthZone.length);
    shahdaraSouthZone.forEach(w => console.log(`  ${w.wardNumber}: ${w.wardName}`));

    // Check ward 190-200 (should be Sh South Zone)
    const wards190to200 = await Ward.find({
        wardNumber: { $in: ['190', '191', '192', '193', '194', '195', '196', '197', '198', '199', '200'] }
    }).select('wardNumber wardName zoneName');

    console.log('\n=== Wards 190-200 (should be Shahdara South Zone): ===');
    wards190to200.forEach(w => console.log(`  ${w.wardNumber}: ${w.wardName} - ${w.zoneName}`));

    // Check ward 201-215 (should be Shahdara South)
    const wards201to215 = await Ward.find({
        wardNumber: { $in: ['201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215'] }
    }).select('wardNumber wardName zoneName');

    console.log('\n=== Wards 201-215 (should be Shahdara South): ===');
    wards201to215.forEach(w => console.log(`  ${w.wardNumber}: ${w.wardName} - ${w.zoneName}`));

    process.exit(0);
});
