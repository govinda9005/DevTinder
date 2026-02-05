const express = require('express');
const connectDB = require("./config/database");

const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
app.use(express.json());

app.post("/signup", async (req,res) => {
    //validation of data
    try{
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    //creating a new instance of the user model
    const user = new User({
        firstName,
         lastName,
          emailId, 
          password : passwordHash,
    });
    
        await user.save();
        res.send("User added successfully!!")
    }
    catch (err){
        res.status(400).send("ERROR :"+ err.message)
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

//delete user from database
app.delete("/user", async (req,res) =>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully");
    }
    catch{
       res.status(400).send("something went wrong"); 
    }
})

//update data of the user
app.patch("/user/:userId", async (req,res) =>{
    const userId = req.params?.userId;
        const data = req.body;
    try{
        const ALLOWED_UPDATES = [
            "photoUrl",
            "about",
            "age",
            "gender",
            "skills",
        ];
        const isUpdateAllowed = Object.keys(data).every((k) =>
        ALLOWED_UPDATES.includes(k));
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }
        if (data?.skills.length > 10) {
            throw new Error("skills cannot be more than 10");
        }
        await User.findByIdAndUpdate({_id: userId}, data,{
            returnDocument: "after",
            runValidators: true,
        });
        res.send("user updated successfully");
    } catch (err){
        res.status(400).send("Update failed:" + err.message);
    }
})

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
