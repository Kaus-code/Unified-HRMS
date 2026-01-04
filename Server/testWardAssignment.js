const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/recruitment';

async function testAssignment() {
    try {
        console.log("1. Seeding Dummy Data...");
        await axios.post(`${BASE_URL}/seed`);

        console.log("2. Fetching a candidate...");
        const res = await axios.get(`${BASE_URL}/pending`);
        const candidates = res.data.candidates;

        if (candidates.length === 0) {
            console.error("No candidates found.");
            return;
        }

        const candidate = candidates[0];
        console.log(`Approving candidate ${candidate.fullName} for 'Shahdara South Zone'...`);

        const approveRes = await axios.post(`${BASE_URL}/approve`, {
            candidateId: candidate._id,
            zone: "Shahdara South Zone"
        });

        const { assignedWard, user } = approveRes.data;
        console.log("\n--- RESULT ---");
        console.log(`Assigned Ward: ${assignedWard}`);
        console.log(`Assigned Zone: ${user.Zone}`);

        if (assignedWard !== '1' && assignedWard !== 1) {
            console.log("✅ SUCCESS: Assigned a non-default ward (likely valid).");
        } else {
            console.log("⚠️ WARNING: Assigned Ward 1. Check if Ward 1 belongs to Shahdara South Zone or if fallback triggered.");
        }

    } catch (e) {
        console.error("Error:", e.message);
        if (e.response) console.error("Response:", JSON.stringify(e.response.data));
    }
}

testAssignment();
