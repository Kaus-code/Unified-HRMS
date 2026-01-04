const axios = require('axios');

async function checkStatus() {
    try {
        console.log("Checking Status...");
        const res = await axios.post('http://localhost:5000/api/recruitment/check-status', {
            examId: "EX-01",
            enrollmentNumber: "EN12345",
            dob: "2000-05-15"
        });

        const c = res.data.candidate;
        console.log(`Name: ${c.fullName}`);
        console.log(`Status: ${c.verificationStatus}`);

        if (c.verificationStatus === 'Approved') {
            console.log(`EID: ${c.generatedEmployeeId}`);
            console.log(`Ward: ${c.allocatedWard}`);
            console.log(`Zone: ${c.allocatedZone}`);
        }
    } catch (e) {
        console.log("Error:", e.message);
        if (e.response) console.log("Response:", JSON.stringify(e.response.data));
    }
}

checkStatus();
