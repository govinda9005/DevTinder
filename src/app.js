const express = require('express');
const connectDB = require("./config/database");

const app = express();
const User = require("./models/user");

app.post("/signup", async (req,res) => {
    
    //creating a new instance of the user model
    const user = new User({
        firstName : "Virat",
        lastName : "Kohli",
        emailId : "vitarkohli9005@gmail.com",
        password : "123hhhh"
    });
    try{
        await user.save();
        res.send("User added successfully!!")
    }
    catch (err){
        res.status(400).send("Error saving the user:"+ err.message)
    }
    
});

connectDB()
.then(() => {
    console.log("database connection established");
    app.listen(3000, () => {
    console.log("Server is successfully lisrenning on port 3000....");
});
})
.catch(err => {
    console.error("Database cannot be connected")
});
