const express = require('express');
const connectDB = require("./config/database");

const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req,res) => {
    
    //creating a new instance of the user model
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added successfully!!")
    }
    catch (err){
        res.status(400).send("Error saving the user:"+ err.message)
    }
    
});

//Get User by email
app.get("/user", async (req,res) =>{
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({emailId: userEmail});
        if(users.length === 0){
            res.status(400).send("user not found");
        } else {
            res.send(users);
        }
        
    }
    catch{
        res.status(400).send("something went wrong");
    }
});

// Feed API - GET/feed - gat all the users from the database
app.get("/feed", async (req,res) => {
    try{
        const users = await User.find({});
        res.send(users)
    }
    catch{
        res.status(400).send("something went wrong");
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
