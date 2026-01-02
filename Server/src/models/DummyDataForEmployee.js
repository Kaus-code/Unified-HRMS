const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars from Server/.env (which is two levels up from src/models)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const User = require("./User");

const uri = process.env.MONGO_URI;

const mcdHierarchicalData = [
  // COMMISSIONER: No Zone, No Ward
  { name: "Siddharth Verma", employeeId: "MCD-1004", email: "siddharth.v@mcd.gov.in", role: "Commissioner", department: "Head Office", joiningDate: new Date("2016-03-10"), employmentStatus: "Permanent" },

  // DEPUTY COMMISSIONERS: Zone Required, No Ward
  { name: "Anjali Gupta", employeeId: "MCD-2060", email: "anjali.g@mcd.gov.in", role: "Deputy Commissioner", department: "Sanitation", Zone: "Narela", joiningDate: new Date("2018-07-22"), employmentStatus: "Permanent" },
  { name: "Kiran Bedi", employeeId: "MCD-2077", email: "kiran.b@mcd.gov.in", role: "Deputy Commissioner", department: "Security", Zone: "Civil Line", joiningDate: new Date("2017-11-05"), employmentStatus: "Permanent" },
  { name: "Rajneesh Kumar", employeeId: "MCD-2088", email: "rajneesh.k@mcd.gov.in", role: "Deputy Commissioner", department: "Finance", Zone: "Rohini", joiningDate: new Date("2019-05-30"), employmentStatus: "Permanent" },
  { name: "Vikrant Massey", employeeId: "MCD-2099", email: "vikrant.m@mcd.gov.in", role: "Deputy Commissioner", department: "Transport", Zone: "Keshavpuram", joiningDate: new Date("2020-02-20"), employmentStatus: "Permanent" },

  // SANITARY INSPECTORS: Same Zone allowed, but Wards MUST be unique
  { name: "Rohan Jha", employeeId: "MCD-3001", email: "rohan.j@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Narela", Ward: 1, joiningDate: new Date("2021-02-15"), employmentStatus: "Permanent" },
  { name: "Manish Sisodia", employeeId: "MCD-3007", email: "manish.s@mcd.gov.in", role: "Sanitary Inspector", department: "Solid Waste", Zone: "Civil Line", Ward: 7, joiningDate: new Date("2022-09-12"), employmentStatus: "Permanent" },
  { name: "Sushil Kumar", employeeId: "MCD-3023", email: "sushil.k@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Rohini", Ward: 23, joiningDate: new Date("2021-08-14"), employmentStatus: "Permanent" },
  { name: "Ishaan Khattar", employeeId: "MCD-3024", email: "ishaan.k@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Rohini", Ward: 24, joiningDate: new Date("2022-04-10"), employmentStatus: "Permanent" },
  { name: "Shefali Shah", employeeId: "MCD-3061", email: "shefali.s@mcd.gov.in", role: "Sanitary Inspector", department: "Solid Waste", Zone: "Keshavpuram", Ward: 61, joiningDate: new Date("2023-01-05"), employmentStatus: "Permanent" },
  { name: "Piyush Goyal", employeeId: "MCD-3071", email: "piyush.g@mcd.gov.in", role: "Sanitary Inspector", department: "Market Control", Zone: "City S.P.Zone", Ward: 71, joiningDate: new Date("2022-06-25"), employmentStatus: "Permanent" },
  { name: "Abhinav Bindra", employeeId: "MCD-3072", email: "abhinav.b@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "City S.P.Zone", Ward: 72, joiningDate: new Date("2021-09-05"), employmentStatus: "Permanent" },

  // WORKERS: Can share Wards with Inspectors or other Workers
  { name: "Sumit Negi", employeeId: "MCD-9005", email: "sumit.n@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Narela", Ward: 1, joiningDate: new Date("2024-01-10"), employmentStatus: "Contractual" },
  { name: "Aman Preet", employeeId: "MCD-9008", email: "aman.p@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Civil Line", Ward: 7, joiningDate: new Date("2024-03-01"), employmentStatus: "Contractual" },
  { name: "Pooja Hegde", employeeId: "MCD-9023", email: "pooja.h@mcd.gov.in", role: "Worker", department: "Health", Zone: "Rohini", Ward: 23, joiningDate: new Date("2023-12-15"), employmentStatus: "Contractual" },
  { name: "Kabir Singh", employeeId: "MCD-9061", email: "kabir.s@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Keshavpuram", Ward: 61, joiningDate: new Date("2024-05-18"), employmentStatus: "Contractual" },
  { name: "Smriti Khanna", employeeId: "MCD-9071", email: "smriti.k@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "City S.P.Zone", Ward: 71, joiningDate: new Date("2024-02-10"), employmentStatus: "Contractual" },
  { name: "Neeraj Chopra", employeeId: "MCD-9072", email: "neeraj.c@mcd.gov.in", role: "Worker", department: "Solid Waste", Zone: "City S.P.Zone", Ward: 72, joiningDate: new Date("2023-11-20"), employmentStatus: "Contractual" },
  { name: "Hardik Pandya", employeeId: "MCD-9128", email: "hardik.p@mcd.gov.in", role: "Worker", department: "Water Supply", Zone: "Najafgarh Zone", Ward: 128, joiningDate: new Date("2024-04-15"), employmentStatus: "Contractual" },
  { name: "Ravi Dahiya", employeeId: "MCD-9129", email: "ravi.d@mcd.gov.in", role: "Worker", department: "Sanitation", Zone: "Najafgarh Zone", Ward: 128, joiningDate: new Date("2024-01-05"), employmentStatus: "Contractual" },
  // COMMISSIONERS (High Level)
  { name: "Arvinder Singh", employeeId: "MCD-10001", email: "arvinder.s@mcd.gov.in", role: "Commissioner", department: "Head Office", joiningDate: new Date("2014-11-20"), employmentStatus: "Permanent" },
  
  // DEPUTY COMMISSIONERS (Zone Level)
  { name: "Megha Kapoor", employeeId: "MCD-10002", email: "megha.k@mcd.gov.in", role: "Deputy Commissioner", department: "Finance", Zone: "West Zone", joiningDate: new Date("2018-02-15"), employmentStatus: "Permanent" },
  { name: "Siddharth Malhotra", employeeId: "MCD-10003", email: "siddharth.m@mcd.gov.in", role: "Deputy Commissioner", department: "Education", Zone: "Central Zone", joiningDate: new Date("2019-06-10"), employmentStatus: "Permanent" },
  { name: "Ridhima Sen", employeeId: "MCD-10004", email: "ridhima.s@mcd.gov.in", role: "Deputy Commissioner", department: "Health", Zone: "South Zone", joiningDate: new Date("2020-09-25"), employmentStatus: "Permanent" },
  { name: "Varun Dhawan", employeeId: "MCD-10005", email: "varun.d@mcd.gov.in", role: "Deputy Commissioner", department: "Transport", Zone: "Shahdara North Zone", joiningDate: new Date("2021-01-05"), employmentStatus: "Permanent" },

  // SANITARY INSPECTORS (Unique Wards in Zones)
  { name: "Rahul Dravid", employeeId: "MCD-10006", email: "rahul.d@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Narela", Ward: 3, joiningDate: new Date("2021-12-12"), employmentStatus: "Permanent" },
  { name: "VVS Laxman", employeeId: "MCD-10007", email: "vvs.l@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Narela", Ward: 4, joiningDate: new Date("2022-03-01"), employmentStatus: "Permanent" },
  { name: "Saurav Ganguly", employeeId: "MCD-10008", email: "saurav.g@mcd.gov.in", role: "Sanitary Inspector", department: "Solid Waste", Zone: "Civil Line", Ward: 8, joiningDate: new Date("2020-05-15"), employmentStatus: "Permanent" },
  { name: "Jasprit Bumrah", employeeId: "MCD-10009", email: "jasprit.b@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Civil Line", Ward: 9, joiningDate: new Date("2023-08-20"), employmentStatus: "Permanent" },
  { name: "Yuvraj Singh", employeeId: "MCD-10010", email: "yuvraj.s@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Rohini", Ward: 39, joiningDate: new Date("2021-11-11"), employmentStatus: "Permanent" },
  { name: "Harbhajan Singh", employeeId: "MCD-10011", email: "harbhajan.s@mcd.gov.in", role: "Sanitary Inspector", department: "Solid Waste", Zone: "Rohini", Ward: 40, joiningDate: new Date("2022-01-25"), employmentStatus: "Permanent" },
  { name: "Zahir Khan", employeeId: "MCD-10012", email: "zahir.k@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "West Zone", Ward: 94, joiningDate: new Date("2019-12-01"), employmentStatus: "Permanent" },
  { name: "Ashish Nehra", employeeId: "MCD-10013", email: "ashish.n@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "West Zone", Ward: 95, joiningDate: new Date("2020-04-18"), employmentStatus: "Permanent" },
  { name: "Ishant Sharma", employeeId: "MCD-10014", email: "ishant.s@mcd.gov.in", role: "Sanitary Inspector", department: "Solid Waste", Zone: "Shahdara South Zone", Ward: 192, joiningDate: new Date("2021-07-30"), employmentStatus: "Permanent" },
  { name: "Kuldeep Yadav", employeeId: "MCD-10015", email: "kuldeep.y@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Shahdara South Zone", Ward: 193, joiningDate: new Date("2023-02-14"), employmentStatus: "Permanent" },

  // WORKERS & STAFF (Can share Wards/Zones)
  { name: "Rinku Singh", employeeId: "MCD-10016", email: "rinku.s@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Narela", Ward: 3, joiningDate: new Date("2024-05-01"), employmentStatus: "Contractual" },
  { name: "Surya Kumar", employeeId: "MCD-10017", email: "surya.k@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Narela", Ward: 4, joiningDate: new Date("2024-06-15"), employmentStatus: "Contractual" },
  { name: "Axar Patel", employeeId: "MCD-10018", email: "axar.p@mcd.gov.in", role: "Worker", department: "Water Supply", Zone: "Civil Line", Ward: 8, joiningDate: new Date("2024-02-10"), employmentStatus: "Contractual" },
  { name: "Arshdeep Singh", employeeId: "MCD-10019", email: "arshdeep.s@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Civil Line", Ward: 9, joiningDate: new Date("2024-03-22"), employmentStatus: "Contractual" },
  { name: "Shubman Gill", employeeId: "MCD-10020", email: "shubman.g@mcd.gov.in", role: "Staff", department: "Education", Zone: "Rohini", Ward: 39, joiningDate: new Date("2023-11-05"), employmentStatus: "Permanent" },
  { name: "Yashasvi Jaiswal", employeeId: "MCD-10021", email: "yashasvi.j@mcd.gov.in", role: "Staff", department: "Health", Zone: "Rohini", Ward: 40, joiningDate: new Date("2024-01-18"), employmentStatus: "Permanent" },
  { name: "Mohammed Siraj", employeeId: "MCD-10022", email: "mohammed.s@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "West Zone", Ward: 94, joiningDate: new Date("2024-05-12"), employmentStatus: "Contractual" },
  { name: "Ravindra Jadeja", employeeId: "MCD-10023", email: "ravindra.j@mcd.gov.in", role: "Staff", department: "Electricity", Zone: "West Zone", Ward: 95, joiningDate: new Date("2022-10-10"), employmentStatus: "Permanent" },
  { name: "Shreyas Iyer", employeeId: "MCD-10024", email: "shreyas.i@mcd.gov.in", role: "Worker", department: "Road Maintenance", Zone: "Shahdara South Zone", Ward: 192, joiningDate: new Date("2024-04-05"), employmentStatus: "Contractual" },
  { name: "Sanju Samson", employeeId: "MCD-10025", email: "sanju.s@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Shahdara South Zone", Ward: 193, joiningDate: new Date("2024-02-28"), employmentStatus: "Contractual" },
  { name: "Ishan Kishan", employeeId: "MCD-10026", email: "ishan.k@mcd.gov.in", role: "Staff", department: "Finance", Zone: "Central Zone", Ward: 142, joiningDate: new Date("2023-09-12"), employmentStatus: "Permanent" },
  { name: "Rishabh Pant", employeeId: "MCD-10027", email: "rishabh.p@mcd.gov.in", role: "Staff", department: "Security", Zone: "Central Zone", Ward: 143, joiningDate: new Date("2022-12-05"), employmentStatus: "Permanent" },
  { name: "Prithvi Shaw", employeeId: "MCD-10028", email: "prithvi.s@mcd.gov.in", role: "Worker", department: "Market Control", Zone: "South Zone", Ward: 148, joiningDate: new Date("2024-06-20"), employmentStatus: "Contractual" },
  { name: "Deepak Chahar", employeeId: "MCD-10029", email: "deepak.c@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "South Zone", Ward: 149, joiningDate: new Date("2024-01-15"), employmentStatus: "Contractual" },
  { name: "Shardul Thakur", employeeId: "MCD-10030", email: "shardul.t@mcd.gov.in", role: "Staff", department: "Solid Waste", Zone: "Shahdara North Zone", Ward: 216, joiningDate: new Date("2023-05-18"), employmentStatus: "Permanent" },
  { name: "S. Jaishankar", employeeId: "MCD-10031", email: "jaishankar.s@mcd.gov.in", role: "Commissioner", department: "Head Office", joiningDate: new Date("2013-05-10"), employmentStatus: "Permanent" },
  { name: "Ajit Doval", employeeId: "MCD-10032", email: "ajit.d@mcd.gov.in", role: "Commissioner", department: "Security", joiningDate: new Date("2012-08-15"), employmentStatus: "Permanent" },

  // DEPUTY COMMISSIONERS (Zone Assigned, No Ward)
  { name: "Ravi Shastri", employeeId: "MCD-10033", email: "ravi.s@mcd.gov.in", role: "Deputy Commissioner", department: "Transport", Zone: "Narela", joiningDate: new Date("2017-04-20"), employmentStatus: "Permanent" },
  { name: "Anil Kumble", employeeId: "MCD-10034", email: "anil.k@mcd.gov.in", role: "Deputy Commissioner", department: "Health", Zone: "Civil Line", joiningDate: new Date("2018-11-12"), employmentStatus: "Permanent" },
  { name: "Rahul Bajaj", employeeId: "MCD-10035", email: "rahul.b@mcd.gov.in", role: "Deputy Commissioner", department: "Finance", Zone: "Rohini", joiningDate: new Date("2016-09-05"), employmentStatus: "Permanent" },
  { name: "Kiran Mazumdar", employeeId: "MCD-10036", email: "kiran.m@mcd.gov.in", role: "Deputy Commissioner", department: "Water Supply", Zone: "Keshavpuram", joiningDate: new Date("2019-02-28"), employmentStatus: "Permanent" },
  { name: "Narayan Murthy", employeeId: "MCD-10037", email: "narayan.m@mcd.gov.in", role: "Deputy Commissioner", department: "Education", Zone: "City S.P.Zone", joiningDate: new Date("2015-12-10"), employmentStatus: "Permanent" },
  { name: "Azim Premji", employeeId: "MCD-10038", email: "azim.p@mcd.gov.in", role: "Deputy Commissioner", department: "Market Control", Zone: "Karolbagh", joiningDate: new Date("2017-07-14"), employmentStatus: "Permanent" },
  { name: "Ratan Tata", employeeId: "MCD-10039", email: "ratan.t@mcd.gov.in", role: "Deputy Commissioner", department: "Road Maintenance", Zone: "West Zone", joiningDate: new Date("2014-10-01"), employmentStatus: "Permanent" },
  { name: "Nandan Nilekani", employeeId: "MCD-10040", email: "nandan.n@mcd.gov.in", role: "Deputy Commissioner", department: "Solid Waste", Zone: "Najafgarh Zone", joiningDate: new Date("2020-05-22"), employmentStatus: "Permanent" },

  // SANITARY INSPECTORS (Unique Ward per Zone in this list)
  { name: "Sunil Gavaskar", employeeId: "MCD-10041", email: "sunil.g@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Narela", Ward: 5, joiningDate: new Date("2021-01-10"), employmentStatus: "Permanent" },
  { name: "Kapil Dev", employeeId: "MCD-10042", email: "kapil.d@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Narela", Ward: 26, joiningDate: new Date("2021-03-15"), employmentStatus: "Permanent" },
  { name: "Sachin Tendulkar", employeeId: "MCD-10043", email: "sachin.t@mcd.gov.in", role: "Sanitary Inspector", department: "Solid Waste", Zone: "Civil Line", Ward: 10, joiningDate: new Date("2020-11-20"), employmentStatus: "Permanent" },
  { name: "Mahendra Singh", employeeId: "MCD-10044", email: "mahendra.s@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Civil Line", Ward: 12, joiningDate: new Date("2022-05-05"), employmentStatus: "Permanent" },
  { name: "Virat Kohli", employeeId: "MCD-10045", email: "virat.k@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Rohini", Ward: 21, joiningDate: new Date("2022-08-14"), employmentStatus: "Permanent" },
  { name: "Rohit Sharma", employeeId: "MCD-10046", email: "rohit.s@mcd.gov.in", role: "Sanitary Inspector", department: "Solid Waste", Zone: "Rohini", Ward: 22, joiningDate: new Date("2021-12-01"), employmentStatus: "Permanent" },
  { name: "Hardik Pandya", employeeId: "MCD-10047", email: "hardik.p2@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Keshavpuram", Ward: 55, joiningDate: new Date("2023-01-20"), employmentStatus: "Permanent" },
  { name: "Lokesh Rahul", employeeId: "MCD-10048", email: "lokesh.r@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Keshavpuram", Ward: 56, joiningDate: new Date("2023-04-10"), employmentStatus: "Permanent" },
  { name: "Rishabh Pant", employeeId: "MCD-10049", email: "rishabh.p2@mcd.gov.in", role: "Sanitary Inspector", department: "Solid Waste", Zone: "City S.P.Zone", Ward: 70, joiningDate: new Date("2022-09-30"), employmentStatus: "Permanent" },
  { name: "Ravindra Jadeja", employeeId: "MCD-10050", email: "ravindra.j2@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "City S.P.Zone", Ward: 71, joiningDate: new Date("2021-06-18"), employmentStatus: "Permanent" },
  { name: "Shubman Gill", employeeId: "MCD-10051", email: "shubman.g2@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Karolbagh", Ward: 82, joiningDate: new Date("2023-02-14"), employmentStatus: "Permanent" },
  { name: "Yashasvi Jaiswal", employeeId: "MCD-10052", email: "yashasvi.j2@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Karolbagh", Ward: 83, joiningDate: new Date("2023-11-11"), employmentStatus: "Permanent" },
  { name: "Mohammed Siraj", employeeId: "MCD-10053", email: "mohammed.s2@mcd.gov.in", role: "Sanitary Inspector", department: "Solid Waste", Zone: "West Zone", Ward: 92, joiningDate: new Date("2022-01-25"), employmentStatus: "Permanent" },
  { name: "Kuldeep Yadav", employeeId: "MCD-10054", email: "kuldeep.y2@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "West Zone", Ward: 93, joiningDate: new Date("2023-08-20"), employmentStatus: "Permanent" },
  { name: "Axar Patel", employeeId: "MCD-10055", email: "axar.p2@mcd.gov.in", role: "Sanitary Inspector", department: "Sanitation", Zone: "Najafgarh Zone", Ward: 117, joiningDate: new Date("2021-11-01"), employmentStatus: "Permanent" },

  // WORKERS & STAFF (Wards can be shared)
  { name: "Sanju Samson", employeeId: "MCD-10056", email: "sanju.s2@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Narela", Ward: 5, joiningDate: new Date("2024-05-15"), employmentStatus: "Contractual" },
  { name: "Ishan Kishan", employeeId: "MCD-10057", email: "ishan.k2@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Narela", Ward: 5, joiningDate: new Date("2024-06-01"), employmentStatus: "Contractual" },
  { name: "Rinku Singh", employeeId: "MCD-10058", email: "rinku.s2@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Narela", Ward: 26, joiningDate: new Date("2024-04-10"), employmentStatus: "Contractual" },
  { name: "Deepak Hooda", employeeId: "MCD-10059", email: "deepak.h@mcd.gov.in", role: "Staff", department: "Education", Zone: "Civil Line", Ward: 10, joiningDate: new Date("2023-12-05"), employmentStatus: "Permanent" },
  { name: "Vijay Shankar", employeeId: "MCD-10060", email: "vijay.s@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Civil Line", Ward: 10, joiningDate: new Date("2024-01-20"), employmentStatus: "Contractual" },
  { name: "Washington Sundar", employeeId: "MCD-10061", email: "washington.s@mcd.gov.in", role: "Staff", department: "Finance", Zone: "Civil Line", Ward: 12, joiningDate: new Date("2023-11-15"), employmentStatus: "Permanent" },
  { name: "Shardul Thakur", employeeId: "MCD-10062", email: "shardul.t2@mcd.gov.in", role: "Worker", department: "Water Supply", Zone: "Rohini", Ward: 21, joiningDate: new Date("2024-03-22"), employmentStatus: "Contractual" },
  { name: "Prithvi Shaw", employeeId: "MCD-10063", email: "prithvi.s2@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Rohini", Ward: 22, joiningDate: new Date("2024-02-10"), employmentStatus: "Contractual" },
  { name: "Ruturaj Gaikwad", employeeId: "MCD-10064", email: "ruturaj.g@mcd.gov.in", role: "Staff", department: "Health", Zone: "Keshavpuram", Ward: 55, joiningDate: new Date("2023-10-18"), employmentStatus: "Permanent" },
  { name: "Venkatesh Iyer", employeeId: "MCD-10065", email: "venkatesh.i@mcd.gov.in", role: "Worker", department: "Solid Waste", Zone: "Keshavpuram", Ward: 56, joiningDate: new Date("2024-05-01"), employmentStatus: "Contractual" },
  { name: "Deepak Chahar", employeeId: "MCD-10066", email: "deepak.c2@mcd.gov.in", role: "Staff", department: "Electricity", Zone: "City S.P.Zone", Ward: 70, joiningDate: new Date("2023-09-12"), employmentStatus: "Permanent" },
  { name: "Varun Chakaravarthy", employeeId: "MCD-10067", email: "varun.c@mcd.gov.in", role: "Worker", department: "Road Maintenance", Zone: "City S.P.Zone", Ward: 71, joiningDate: new Date("2024-04-15"), employmentStatus: "Contractual" },
  { name: "Rahul Chahar", employeeId: "MCD-10068", email: "rahul.c2@mcd.gov.in", role: "Staff", department: "Market Control", Zone: "Karolbagh", Ward: 82, joiningDate: new Date("2023-06-25"), employmentStatus: "Permanent" },
  { name: "Chetan Sakariya", employeeId: "MCD-10069", email: "chetan.s@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Karolbagh", Ward: 83, joiningDate: new Date("2024-01-05"), employmentStatus: "Contractual" },
  { name: "Arshdeep Singh", employeeId: "MCD-10070", email: "arshdeep.s2@mcd.gov.in", role: "Staff", department: "Animal Control", Zone: "West Zone", Ward: 92, joiningDate: new Date("2023-12-12"), employmentStatus: "Permanent" },
  { name: "Harshal Patel", employeeId: "MCD-10071", email: "harshal.p@mcd.gov.in", role: "Worker", department: "Security", Zone: "West Zone", Ward: 93, joiningDate: new Date("2024-04-30"), employmentStatus: "Contractual" },
  { name: "Avesh Khan", employeeId: "MCD-10072", email: "avesh.k@mcd.gov.in", role: "Staff", department: "Sanitation", Zone: "Najafgarh Zone", Ward: 117, joiningDate: new Date("2022-07-20"), employmentStatus: "Permanent" },
  { name: "Umran Malik", employeeId: "MCD-10073", email: "umran.m@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Najafgarh Zone", Ward: 117, joiningDate: new Date("2024-06-10"), employmentStatus: "Contractual" },
  { name: "Shivam Dube", employeeId: "MCD-10074", email: "shivam.d@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Najafgarh Zone", Ward: 118, joiningDate: new Date("2024-05-18"), employmentStatus: "Contractual" },
  { name: "Jitesh Sharma", employeeId: "MCD-10075", email: "jitesh.s@mcd.gov.in", role: "Staff", department: "Health", Zone: "South Zone", Ward: 150, joiningDate: new Date("2023-08-01"), employmentStatus: "Permanent" },
  { name: "Tilak Varma", employeeId: "MCD-10076", email: "tilak.v@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "South Zone", Ward: 151, joiningDate: new Date("2024-03-12"), employmentStatus: "Contractual" },
  { name: "Sai Sudharsan", employeeId: "MCD-10077", email: "sai.s@mcd.gov.in", role: "Staff", department: "Education", Zone: "Central Zone", Ward: 142, joiningDate: new Date("2023-11-25"), employmentStatus: "Permanent" },
  { name: "Ravi Bishnoi", employeeId: "MCD-10078", email: "ravi.b@mcd.gov.in", role: "Worker", department: "Water Supply", Zone: "Central Zone", Ward: 143, joiningDate: new Date("2024-02-14"), employmentStatus: "Contractual" },
  { name: "Mukesh Kumar", employeeId: "MCD-10079", email: "mukesh.k@mcd.gov.in", role: "Staff", department: "Sanitation", Zone: "Shahdara South Zone", Ward: 190, joiningDate: new Date("2023-10-05"), employmentStatus: "Permanent" },
  { name: "Tushar Deshpande", employeeId: "MCD-10080", email: "tushar.d@mcd.gov.in", role: "Worker", department: "Cleaning", Zone: "Shahdara South Zone", Ward: 191, joiningDate: new Date("2024-01-10"), employmentStatus: "Contractual" }
];


const seedDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB...");


    await User.deleteMany({});
    console.log("Old data cleared.");

    await User.insertMany(mcdHierarchicalData);
    console.log("100 Dummy Users inserted successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
    mongoose.connection.close();
  }
};

seedDB();