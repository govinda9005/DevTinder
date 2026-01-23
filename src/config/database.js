const mongoose = require ("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://namasteGovinda:r5qy1jqc60Vxm6Y6@namastenode.8x5r2v3.mongodb.net/devTinder");
};

module.exports = connectDB;

