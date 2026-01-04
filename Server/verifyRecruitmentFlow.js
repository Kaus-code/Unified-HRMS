const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/recruitment';

async function verifyFlow() {
    console.log("Starting Recruitment Flow Verification...");

    // 1. Seed Dummy Data to ensure we have a candidate
    try {
        console.log("\n1. Seeding Data...");
        await axios.post(`${BASE_URL}/seed`);
        console.log("   Seed Success.");
    } catch (e) {
        console.log("   Seed failed or already seeded.", e.message);
    }

    // 2. Fetch Pending Candidates (Global Pool)
    let candidateId;
    try {
        console.log("\n2. Fetching Pending Candidates...");
        const res = await axios.get(`${BASE_URL}/pending`);
        const candidates = res.data.candidates;

        if (candidates.length === 0) {
            console.error("   No candidates found! Cannot proceed.");
            return;
        }

        const candidate = candidates[0];
        candidateId = candidate._id;
        console.log(`   Found candidate: ${candidate.fullName} (${candidate.enrollmentNumber})`);
        console.log(`   ID: ${candidateId}`);
    } catch (e) {
        console.error("   Fetch failed:", e.message);
        if (e.response) console.error("   Response:", JSON.stringify(e.response.data));
        return;
    }

    // 3. Approve Candidate (Simulate Deputy Action)
    try {
        console.log("\n3. Approving Candidate...");
        const approvePayload = {
            candidateId: candidateId,
            zone: "Rohini Zone" // Simulating the deputy's zone
        };
        const res = await axios.post(`${BASE_URL}/approve`, approvePayload);

        console.log("   Approval Success!");
        console.log("   Generated EID:", res.data.employeeId);
        console.log("   Assigned Ward:", res.data.assignedWard);
    } catch (e) {
        console.error("   Approval failed:", e.response ? e.response.data : e.message);
        // If already approved, we can still proceed to check status
    }

    // 4. Check Candidate Status (Simulate Portal View)
    // We need the details to check status accurately
    // Fetching the candidate details from DB directly or just reusing know data would be cheaty
    // Let's use the known dummy data credentials for "Amritesh Kumar Rai" if that's who we picked, 
    // or just hardcode the check for the first candidate in the dummy list if we can guess their creds.
    // The dummy list has "Rahul Sharma" (EN12345, 2000-05-15, EX-01)

    // Better: let's try to verify "Rahul Sharma" specifically.
    const targetCandidate = {
        examId: "EX-01",
        enrollmentNumber: "EN12345",
        dob: "2000-05-15"
    };

    try {
        console.log(`\n4. Checking Portal Status for Rahul Sharma (EN12345)...`);
        const res = await axios.post(`${BASE_URL}/check-status`, targetCandidate);

        const c = res.data.candidate;
        console.log("   Status Check Result:");
        console.log(`   - Name: ${c.fullName}`);
        console.log(`   - Status: ${c.verificationStatus}`);

        if (c.verificationStatus === 'Approved') {
            console.log(`   - Generated EID: ${c.generatedEmployeeId}`);
            console.log(`   - Allocated Ward: ${c.allocatedWard}`);
            console.log(`   - Allocated Zone: ${c.allocatedZone}`);

            if (c.generatedEmployeeId && c.allocatedWard) {
                console.log("\n✅ VERIFICATION SUCCESSFUL: Candidate sees their new EID and Location!");
            } else {
                console.log("\n❌ VERIFICATION FAILED: Missing EID or Location in response.");
            }
        } else {
            console.log("   Candidate is not Approved yet (might have picked a different one in step 2).");
        }

    } catch (e) {
        console.error("   Status check failed:", e.message);
    }
}

verifyFlow();
