const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars from Server/.env (which is two levels up from src/models)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const User = require("./User");

const uri = process.env.MONGO_URI;

const dummyUsers = [
  { name: "Arjun Sharma", employeeId: "MCD-1001", email: "arjun.sharma@mcd.gov.in", role: "Commissioner", department: "Head Office", zone: "Civil Lines", ward: 1 },

  // Deputy Commissioners (12)
  { name: "Ravi Verma", employeeId: "MCD-1002", email: "ravi.verma@mcd.gov.in", role: "Deputy Commissioner", department: "Finance", zone: "Rohini", ward: 2 },
  { name: "Neha Singh", employeeId: "MCD-1003", email: "neha.singh@mcd.gov.in", role: "Deputy Commissioner", department: "Health", zone: "Najafgarh", ward: 3 },
  { name: "Amit Kumar", employeeId: "MCD-1004", email: "amit.kumar@mcd.gov.in", role: "Deputy Commissioner", department: "Engineering", zone: "Karol Bagh", ward: 4 },
  { name: "Simran Kaur", employeeId: "MCD-1005", email: "simran.kaur@mcd.gov.in", role: "Deputy Commissioner", department: "Education", zone: "Narela", ward: 5 },
  { name: "Pawan Gupta", employeeId: "MCD-1006", email: "pawan.gupta@mcd.gov.in", role: "Deputy Commissioner", department: "Water Supply", zone: "Shahdara", ward: 6 },
  { name: "Rahul Mehta", employeeId: "MCD-1007", email: "rahul.mehta@mcd.gov.in", role: "Deputy Commissioner", department: "Electricity", zone: "Dwarka", ward: 7 },
  { name: "Tanya Jain", employeeId: "MCD-1008", email: "tanya.jain@mcd.gov.in", role: "Deputy Commissioner", department: "Transport", zone: "Paschim Vihar", ward: 8 },
  { name: "Karan Malhotra", employeeId: "MCD-1009", email: "karan.malhotra@mcd.gov.in", role: "Deputy Commissioner", department: "Road Maintenance", zone: "Lajpat Nagar", ward: 9 },
  { name: "Jyoti Chauhan", employeeId: "MCD-1010", email: "jyoti.chauhan@mcd.gov.in", role: "Deputy Commissioner", department: "Market Control", zone: "Pitampura", ward: 10 },
  { name: "Vikas Tiwari", employeeId: "MCD-1011", email: "vikas.tiwari@mcd.gov.in", role: "Deputy Commissioner", department: "Solid Waste", zone: "Saket", ward: 11 },
  { name: "Suhani Roy", employeeId: "MCD-1012", email: "suhani.roy@mcd.gov.in", role: "Deputy Commissioner", department: "Animal Control", zone: "Vasant Kunj", ward: 12 },
  { name: "Mohit Sethi", employeeId: "MCD-1013", email: "mohit.sethi@mcd.gov.in", role: "Deputy Commissioner", department: "Security", zone: "Mayur Vihar", ward: 13 },

  // Sanitary Inspectors (30)
  { name: "Inspector 1", employeeId: "MCD-2001", email: "inspector1@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Rohini", ward: 1 },
  { name: "Inspector 2", employeeId: "MCD-2002", email: "inspector2@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Civil Lines", ward: 2 },
  { name: "Inspector 3", employeeId: "MCD-2003", email: "inspector3@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Najafgarh", ward: 3 },
  { name: "Inspector 4", employeeId: "MCD-2004", email: "inspector4@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Karol Bagh", ward: 4 },
  { name: "Inspector 5", employeeId: "MCD-2005", email: "inspector5@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Shahdara", ward: 5 },
  { name: "Inspector 6", employeeId: "MCD-2006", email: "inspector6@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Dwarka", ward: 6 },
  { name: "Inspector 7", employeeId: "MCD-2007", email: "inspector7@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Pitampura", ward: 7 },
  { name: "Inspector 8", employeeId: "MCD-2008", email: "inspector8@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Paschim Vihar", ward: 8 },
  { name: "Inspector 9", employeeId: "MCD-2009", email: "inspector9@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Lajpat Nagar", ward: 9 },
  { name: "Inspector 10", employeeId: "MCD-2010", email: "inspector10@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Civil Lines", ward: 10 },

  { name: "Inspector 11", employeeId: "MCD-2011", email: "inspector11@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Rohini", ward: 11 },
  { name: "Inspector 12", employeeId: "MCD-2012", email: "inspector12@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Shahdara", ward: 12 },
  { name: "Inspector 13", employeeId: "MCD-2013", email: "inspector13@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Karol Bagh", ward: 13 },
  { name: "Inspector 14", employeeId: "MCD-2014", email: "inspector14@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Narela", ward: 14 },
  { name: "Inspector 15", employeeId: "MCD-2015", email: "inspector15@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Najafgarh", ward: 15 },
  { name: "Inspector 16", employeeId: "MCD-2016", email: "inspector16@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Dwarka", ward: 16 },
  { name: "Inspector 17", employeeId: "MCD-2017", email: "inspector17@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Pitampura", ward: 17 },
  { name: "Inspector 18", employeeId: "MCD-2018", email: "inspector18@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Lajpat Nagar", ward: 18 },
  { name: "Inspector 19", employeeId: "MCD-2019", email: "inspector19@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Paschim Vihar", ward: 19 },
  { name: "Inspector 20", employeeId: "MCD-2020", email: "inspector20@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Civil Lines", ward: 20 },

  { name: "Inspector 21", employeeId: "MCD-2021", email: "inspector21@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Shahdara", ward: 21 },
  { name: "Inspector 22", employeeId: "MCD-2022", email: "inspector22@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Rohini", ward: 22 },
  { name: "Inspector 23", employeeId: "MCD-2023", email: "inspector23@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Najafgarh", ward: 23 },
  { name: "Inspector 24", employeeId: "MCD-2024", email: "inspector24@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Karol Bagh", ward: 24 },
  { name: "Inspector 25", employeeId: "MCD-2025", email: "inspector25@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Paschim Vihar", ward: 25 },
  { name: "Inspector 26", employeeId: "MCD-2026", email: "inspector26@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Lajpat Nagar", ward: 26 },
  { name: "Inspector 27", employeeId: "MCD-2027", email: "inspector27@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Dwarka", ward: 27 },
  { name: "Inspector 28", employeeId: "MCD-2028", email: "inspector28@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Pitampura", ward: 28 },
  { name: "Inspector 29", employeeId: "MCD-2029", email: "inspector29@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Rohini", ward: 29 },
  { name: "Inspector 30", employeeId: "MCD-2030", email: "inspector30@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", zone: "Shahdara", ward: 30 },
  { name: "Worker 1", employeeId: "MCD-W001", email: "worker1@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Rohini", ward: 1 },
  { name: "Worker 2", employeeId: "MCD-W002", email: "worker2@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Civil Lines", ward: 2 },
  { name: "Worker 3", employeeId: "MCD-W003", email: "worker3@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Shahdara", ward: 3 },
  { name: "Worker 4", employeeId: "MCD-W004", email: "worker4@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Najafgarh", ward: 4 },
  { name: "Worker 5", employeeId: "MCD-W005", email: "worker5@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Karol Bagh", ward: 5 },
  { name: "Worker 6", employeeId: "MCD-W006", email: "worker6@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Dwarka", ward: 6 },
  { name: "Worker 7", employeeId: "MCD-W007", email: "worker7@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Pitampura", ward: 7 },
  { name: "Worker 8", employeeId: "MCD-W008", email: "worker8@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Paschim Vihar", ward: 8 },
  { name: "Worker 9", employeeId: "MCD-W009", email: "worker9@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Lajpat Nagar", ward: 9 },
  { name: "Worker 10", employeeId: "MCD-W010", email: "worker10@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Saket", ward: 10 },

  { name: "Worker 11", employeeId: "MCD-W011", email: "worker11@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Rohini", ward: 11 },
  { name: "Worker 12", employeeId: "MCD-W012", email: "worker12@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Civil Lines", ward: 12 },
  { name: "Worker 13", employeeId: "MCD-W013", email: "worker13@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Shahdara", ward: 13 },
  { name: "Worker 14", employeeId: "MCD-W014", email: "worker14@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Najafgarh", ward: 14 },
  { name: "Worker 15", employeeId: "MCD-W015", email: "worker15@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Karol Bagh", ward: 15 },
  { name: "Worker 16", employeeId: "MCD-W016", email: "worker16@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Dwarka", ward: 16 },
  { name: "Worker 17", employeeId: "MCD-W017", email: "worker17@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Paschim Vihar", ward: 17 },
  { name: "Worker 18", employeeId: "MCD-W018", email: "worker18@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Pitampura", ward: 18 },
  { name: "Worker 19", employeeId: "MCD-W019", email: "worker19@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Lajpat Nagar", ward: 19 },
  { name: "Worker 20", employeeId: "MCD-W020", email: "worker20@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Saket", ward: 20 },

  { name: "Worker 21", employeeId: "MCD-W021", email: "worker21@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Rohini", ward: 21 },
  { name: "Worker 22", employeeId: "MCD-W022", email: "worker22@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Civil Lines", ward: 22 },
  { name: "Worker 23", employeeId: "MCD-W023", email: "worker23@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Shahdara", ward: 23 },
  { name: "Worker 24", employeeId: "MCD-W024", email: "worker24@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Dwarka", ward: 24 },
  { name: "Worker 25", employeeId: "MCD-W025", email: "worker25@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Pitampura", ward: 25 },
  { name: "Worker 26", employeeId: "MCD-W026", email: "worker26@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Najafgarh", ward: 26 },
  { name: "Worker 27", employeeId: "MCD-W027", email: "worker27@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Karol Bagh", ward: 27 },
  { name: "Worker 28", employeeId: "MCD-W028", email: "worker28@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Paschim Vihar", ward: 28 },
  { name: "Worker 29", employeeId: "MCD-W029", email: "worker29@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Saket", ward: 29 },
  { name: "Worker 30", employeeId: "MCD-W030", email: "worker30@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Lajpat Nagar", ward: 30 },

  { name: "Worker 31", employeeId: "MCD-W031", email: "worker31@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Rohini", ward: 31 },
  { name: "Worker 32", employeeId: "MCD-W032", email: "worker32@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Civil Lines", ward: 32 },
  { name: "Worker 33", employeeId: "MCD-W033", email: "worker33@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Pitampura", ward: 33 },
  { name: "Worker 34", employeeId: "MCD-W034", email: "worker34@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Najafgarh", ward: 34 },
  { name: "Worker 35", employeeId: "MCD-W035", email: "worker35@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Karol Bagh", ward: 35 },
  { name: "Worker 36", employeeId: "MCD-W036", email: "worker36@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Dwarka", ward: 36 },
  { name: "Worker 37", employeeId: "MCD-W037", email: "worker37@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Paschim Vihar", ward: 37 },
  { name: "Worker 38", employeeId: "MCD-W038", email: "worker38@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Pitampura", ward: 38 },
  { name: "Worker 39", employeeId: "MCD-W039", email: "worker39@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Shahdara", ward: 39 },
  { name: "Worker 40", employeeId: "MCD-W040", email: "worker40@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Lajpat Nagar", ward: 40 },

  { name: "Worker 41", employeeId: "MCD-W041", email: "worker41@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Saket", ward: 41 },
  { name: "Worker 42", employeeId: "MCD-W042", email: "worker42@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Rohini", ward: 42 },
  { name: "Worker 43", employeeId: "MCD-W043", email: "worker43@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Civil Lines", ward: 43 },
  { name: "Worker 44", employeeId: "MCD-W044", email: "worker44@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Shahdara", ward: 44 },
  { name: "Worker 45", employeeId: "MCD-W045", email: "worker45@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Najafgarh", ward: 45 },
  { name: "Worker 46", employeeId: "MCD-W046", email: "worker46@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Karol Bagh", ward: 46 },
  { name: "Worker 47", employeeId: "MCD-W047", email: "worker47@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Dwarka", ward: 47 },
  { name: "Worker 48", employeeId: "MCD-W048", email: "worker48@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Pitampura", ward: 48 },
  { name: "Worker 49", employeeId: "MCD-W049", email: "worker49@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Paschim Vihar", ward: 49 },
  { name: "Worker 50", employeeId: "MCD-W050", email: "worker50@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Rohini", ward: 50 },

  { name: "Worker 51", employeeId: "MCD-W051", email: "worker51@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Civil Lines", ward: 51 },
  { name: "Worker 52", employeeId: "MCD-W052", email: "worker52@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Shahdara", ward: 52 },
  { name: "Worker 53", employeeId: "MCD-W053", email: "worker53@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Paschim Vihar", ward: 53 },
  { name: "Worker 54", employeeId: "MCD-W054", email: "worker54@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Dwarka", ward: 54 },
  { name: "Worker 55", employeeId: "MCD-W055", email: "worker55@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Najafgarh", ward: 55 },
  { name: "Worker 56", employeeId: "MCD-W056", email: "worker56@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Karol Bagh", ward: 56 },
  { name: "Worker 57", employeeId: "MCD-W057", email: "worker57@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Saket", ward: 57 },
  { name: "Worker 58", employeeId: "MCD-W058", email: "worker58@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Lajpat Nagar", ward: 58 },
  { name: "Worker 59", employeeId: "MCD-W059", email: "worker59@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Pitampura", ward: 59 },
  { name: "Worker 60", employeeId: "MCD-W060", email: "worker60@mcd.gov.in", role: "Worker", department: "Cleaning", zone: "Shahdara", ward: 60 }


];


const seedDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB...");


    await User.deleteMany({});
    console.log("Old data cleared.");

    await User.insertMany(dummyUsers);
    console.log("100 Dummy Users inserted successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
    mongoose.connection.close();
  }
};

seedDB();