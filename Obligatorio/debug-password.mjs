import { validateSingup } from "./src/validations/validation-user.mjs";

// Test data
const testData = {
    name: "Test User",
    email: "test1234@mail.com", 
    password: "Password4330"
};

console.log("=== TESTING PASSWORD VALIDATION ===");
console.log("Password to test:", testData.password);
console.log("Password length:", testData.password.length);

// Test regex manually
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
console.log("Manual regex test:", passwordRegex.test(testData.password));

// Test each requirement individually
console.log("Has lowercase:", /[a-z]/.test(testData.password));
console.log("Has uppercase:", /[A-Z]/.test(testData.password));
console.log("Has digit:", /\d/.test(testData.password));
console.log("Only alphanumeric:", /^[A-Za-z\d]+$/.test(testData.password));
console.log("At least 8 chars:", testData.password.length >= 8);

// Test JOI validation
console.log("\n=== JOI VALIDATION TEST ===");
const { error, value } = validateSingup.validate(testData);
if (error) {
    console.log("JOI Error:", error.details.map(d => d.message));
} else {
    console.log("JOI validation passed ✅");
    console.log("Validated value:", value);
}

// Test Mongoose schema validation
console.log("\n=== MONGOOSE SCHEMA TEST ===");
import "./src/config/mongo-config.mjs";
import User from "./src/model/user.mjs";

const testUser = new User(testData);
try {
    await testUser.validate();
    console.log("Mongoose validation passed ✅");
} catch (mongooseError) {
    console.log("Mongoose Error:", mongooseError.message);
    if (mongooseError.errors) {
        Object.keys(mongooseError.errors).forEach(key => {
            console.log(`Field ${key}:`, mongooseError.errors[key].message);
        });
    }
}

process.exit(0);