const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //Validate user input data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    //Hash password before saving to database
    const passwordHash = await bcrypt.hash(password, 10);

    //creating user object and saving to database
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();

    // 4. Generate JWT & set cookie (auto-login after signup)
    const token = await user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    });

    res.status(201).send("Signup successful!");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      //Add token to cookies and send response back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 3600000), // 1 hour
      });

      res.send("Login successfull!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      expires: new Date(Date.now()),
    });
    res.send("Logout successful!!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/forgot-password", async (req, res) => {
  try {
    const { emailId } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).send("User not found");
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Normally you send email here
    res.send(`Reset link: http://localhost:3000/reset-password/${resetToken}`);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.patch("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send("Invalid or expired token");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.send("Password reset successful!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = authRouter;
