const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUser = req.user._id;
      const { toUserId, status } = req.params;

      const allowedStatuses = ["ignored", "interested"];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message:
            "Invalid status. Allowed values are: " + allowedStatuses.join(", "),
        });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "Recipient user not found" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUser, toUserId },
          { fromUserId: toUserId, toUserId: fromUser },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "A connection request already exists between these users",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId: fromUser,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
        data,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
);

module.exports = requestRouter;
