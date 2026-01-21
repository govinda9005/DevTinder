const express = require('express');

const app = express();

app.get("/user",(req,res) => {
    res.send({ firstName:"Govinda", lastName:"Yadav"})
})

app.post("/user",(req,res) => {
    //Savind Data to DB
    res.send("Data saved successfuly")
})

app.delete("/user",(req,res) => {
    res.send("Data deleted successfully")
})

app.use("/test",(req, res) => {
    res.send("Hello from the server 3000...!")
});

app.use("/",(req, res) => {
    res.send("Welcome to Balen world!")
});



app.listen(3000, () => {
    console.log("Server is successfully lisrenning on port 3000....");
});