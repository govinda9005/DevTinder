const express = require('express');

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin",adminAuth);  

app.get("/user",userAuth, (req,res) => {
    res.send("User data send")
});

app.get("/admin/getAllData",(req,res) => {
    //Savind Data to DB
    res.send("All Data send")
})

app.delete("/admin/deleteUser",(req,res) => {
    res.send("User deleted successfully")
})

app.listen(3000, () => {
    console.log("Server is successfully lisrenning on port 3000....");
});