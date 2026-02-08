const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("send connection request received");
    res.send(user.firstName + " send connection request received");
  } catch (err) {
    return res.status(400).send("Invalid token" + err.message);
  }
});

module.exports = requestRouter;
