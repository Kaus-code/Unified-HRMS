const mongoose = require('mongoose');
const WardPoint = require('./src/models/WardPoint');
require('dotenv').config();

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hrms');
        const count = await WardPoint.countDocuments();
        console.log(`WardPoint collection has ${count} documents.`);

        if (count > 0) {
            const sample = await WardPoint.findOne();
            console.log('Sample ward:', sample.wardNumber, sample.wardName);
            console.log('Boundary type:', sample.boundary.type);
            console.log('Boundary coordinates length:', sample.boundary.coordinates[0].length);
        }
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

check();
