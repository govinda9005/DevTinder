const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    return res.status(400).send("Invalid token" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid profile edit data");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, Your profile updated successfully!`,
      Data: loggedInUser,
    });
  } catch (err) {
    return res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // 1️⃣ Check fields exist
    if (!oldPassword || !newPassword) {
      return res.status(400).send("Both old and new password are required");
    }

    const loggedInUser = req.user;

    // 2️⃣ Verify old password
    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      loggedInUser.password,
    );

    if (!isPasswordValid) {
      return res.status(400).send("Old password is incorrect");
    }

    // 3️⃣ Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // 4️⃣ Update password
    loggedInUser.password = newPasswordHash;
    await loggedInUser.save();

    res.send("Password updated successfully!");
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
