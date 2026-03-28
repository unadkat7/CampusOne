const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: __dirname + "/../.env" });

const User = require("../models/User");

// ========================
// Realistic Indian Names
// ========================
const maleFirstNames = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun",
  "Reyansh", "Sai", "Arnav", "Dhruv", "Kabir",
  "Rohan", "Ishaan", "Krishna", "Shaurya", "Atharv",
  "Advait", "Pranav", "Rudra", "Ayaan", "Kartik",
  "Rishi", "Ansh", "Dev", "Yash", "Harsh",
  "Manav", "Laksh", "Aarush", "Parth", "Daksh",
  "Siddharth", "Kunal", "Rahul", "Amit", "Nikhil",
];

const femaleFirstNames = [
  "Ananya", "Diya", "Myra", "Sara", "Aadhya",
  "Isha", "Kiara", "Riya", "Priya", "Neha",
  "Kavya", "Navya", "Aanya", "Saanvi", "Anika",
  "Pooja", "Shreya", "Tanya", "Meera", "Sneha",
];

const lastNames = [
  "Sharma", "Verma", "Patel", "Gupta", "Singh",
  "Kumar", "Reddy", "Nair", "Joshi", "Malhotra",
  "Chauhan", "Mishra", "Agarwal", "Rao", "Iyer",
  "Pillai", "Deshmukh", "Thakur", "Chopra", "Bansal",
  "Tiwari", "Saxena", "Kulkarni", "Mehta", "Kapoor",
];

const departments = ["CS", "IT", "EC", "ME", "CE"];

/**
 * Generate a random date of birth between 1999 and 2005 (for students)
 */
function randomStudentDOB() {
  const year = 1999 + Math.floor(Math.random() * 6);
  const month = Math.floor(Math.random() * 12);
  const day = 1 + Math.floor(Math.random() * 28);
  return new Date(year, month, day);
}

/**
 * Generate a random date of birth between 1970 and 1990 (for faculty)
 */
function randomFacultyDOB() {
  const year = 1970 + Math.floor(Math.random() * 20);
  const month = Math.floor(Math.random() * 12);
  const day = 1 + Math.floor(Math.random() * 28);
  return new Date(year, month, day);
}

/**
 * Generate a random 10-digit Indian phone number
 */
function randomPhone() {
  const prefixes = ["98", "97", "96", "95", "94", "93", "91", "90", "88", "87"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  let rest = "";
  for (let i = 0; i < 8; i++) {
    rest += Math.floor(Math.random() * 10);
  }
  return prefix + rest;
}

/**
 * Build student data (50 students)
 */
function buildStudents() {
  const students = [];
  const allFirstNames = [...maleFirstNames, ...femaleFirstNames];

  for (let i = 0; i < 50; i++) {
    const firstName = allFirstNames[i % allFirstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const isFemale = i >= maleFirstNames.length;
    const gender = isFemale ? "female" : "male";

    const name = `${firstName} ${lastName}`;
    const emailName = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    const enrollment = `2025${String(10001 + i).padStart(5, "0")}`;
    const department = departments[i % departments.length];

    students.push({
      name,
      email: `${emailName}@campusone.edu`,
      password: "Student@123",
      role: "student",
      enrollmentNumber: enrollment,
      department,
      phone: randomPhone(),
      dateOfBirth: randomStudentDOB(),
      gender,
      address: `${100 + i}, Student Hostel, Campus Road, University City`,
      isActive: true,
    });
  }

  return students;
}

/**
 * Build faculty data (10 faculty members)
 */
function buildFaculty() {
  const facultyNames = [
    { name: "Dr. Rajesh Sharma", gender: "male" },
    { name: "Dr. Sunita Verma", gender: "female" },
    { name: "Prof. Amit Patel", gender: "male" },
    { name: "Dr. Kavita Gupta", gender: "female" },
    { name: "Prof. Vikram Singh", gender: "male" },
    { name: "Dr. Meena Kumar", gender: "female" },
    { name: "Prof. Suresh Reddy", gender: "male" },
    { name: "Dr. Anita Nair", gender: "female" },
    { name: "Prof. Deepak Joshi", gender: "male" },
    { name: "Dr. Priya Malhotra", gender: "female" },
  ];

  return facultyNames.map((fac, i) => {
    const emailName = fac.name
      .replace(/Dr\.\s|Prof\.\s/g, "")
      .replace(/\s/g, "")
      .toLowerCase();

    return {
      name: fac.name,
      email: `${emailName}@campusone.edu`,
      password: "Faculty@123",
      role: "faculty",
      employeeId: `FAC${String(i + 1).padStart(3, "0")}`,
      department: departments[i % departments.length],
      phone: randomPhone(),
      dateOfBirth: randomFacultyDOB(),
      gender: fac.gender,
      address: `${200 + i}, Faculty Quarters, Campus Road, University City`,
      isActive: true,
    };
  });
}

/**
 * Build admin data (1 admin)
 */
function buildAdmin() {
  return {
    name: "Campus Administrator",
    email: "admin@campusone.edu",
    password: "Admin@123",
    role: "admin",
    employeeId: "ADM001",
    department: "Administration",
    phone: "9000000001",
    dateOfBirth: new Date(1985, 0, 15),
    gender: "male",
    address: "Admin Block, University Campus, University City",
    isActive: true,
  };
}

/**
 * Main seed function
 */
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding.");

    // Check if data already exists
    const existingCount = await User.countDocuments();
    if (existingCount > 0) {
      console.log(
        `⚠️  Database already has ${existingCount} users. Skipping seed to avoid duplicates.`
      );
      console.log(
        '   To re-seed, drop the "users" collection first: db.users.drop()'
      );
      process.exit(0);
    }

    // Build all user data
    const students = buildStudents();
    const faculty = buildFaculty();
    const admin = buildAdmin();

    const allUsers = [...students, ...faculty, admin];

    // Hash all passwords before inserting
    console.log("🔐 Hashing passwords...");
    const salt = await bcrypt.genSalt(10);
    for (const user of allUsers) {
      user.password = await bcrypt.hash(user.password, salt);
    }

    // Insert all users
    console.log("📥 Inserting users into the database...");
    await User.insertMany(allUsers);

    console.log(`\n🎉 Seed completed successfully!`);
    console.log(`   📚 Students: ${students.length}`);
    console.log(`   🎓 Faculty:  ${faculty.length}`);
    console.log(`   🔑 Admin:    1`);
    console.log(`   📊 Total:    ${allUsers.length}`);
    console.log(`\n📋 Default Credentials:`);
    console.log(`   Students → <name>@campusone.edu / Student@123`);
    console.log(`   Faculty  → <name>@campusone.edu / Faculty@123`);
    console.log(`   Admin    → admin@campusone.edu  / Admin@123`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
}

seedDatabase();
