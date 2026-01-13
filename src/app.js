const express = require('express');

const app = express();

app.use("/",(req, res) => {
    res.send("Welcome to Balen world!")
});

app.use("/test",(req, res) => {
    res.send("Hello from the server 3000...!")
});

app.listen(3000, () => {
    console.log("Server is successfully lisrenning on port 3000....");
});