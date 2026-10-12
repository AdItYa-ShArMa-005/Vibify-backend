
const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.mongodb_url);
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Error connecting database:", err);
        throw err;
    }
};

module.exports = connectDatabase;
