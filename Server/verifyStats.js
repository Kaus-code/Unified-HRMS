require('dotenv').config();

const verifyStats = async () => {
    try {
        const zone = "Shahdara South Zone";
        // Assuming server is running on localhost:3000
        const PORT = process.env.PORT || 3000;
        const URL = `http://localhost:${PORT}/analytics/zone-stats/${encodeURIComponent(zone)}`;

        console.log(`Making request to: ${URL}`);

        const response = await fetch(URL);
        const data = await response.json();

        console.log('\n✅ Response Status:', response.status);
        console.log('✅ Response Data:', JSON.stringify(data, null, 2));

        if (data.success && data.stats.totalWards === 15) {
            console.log('\nSUCCESS: Total Wards count is correctly 15.');
        } else {
            console.log(`\nFAILURE: Total Wards count is ${data.stats.totalWards}, expected 15.`);
        }

    } catch (error) {
        console.error('❌ Request failed:', error.message);
    }
};

verifyStats();
