const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://namasteGovinda:r5qy1jqc60Vxm6Y6@namastenode.8x5r2v3.mongodb.net/devTinder");
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error.message);
        console.error("Full error:", error);
    }
};

module.exports = connectDB;