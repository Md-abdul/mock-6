const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await userModel.findOne({ email });

    if (user) {
      res.status(400).json({ msg: "user Alredy there" });
    } else {
      bcrypt.hash(req.body.password, 12, async (error, hash) => {
        if (error) {
          res.status(500).json({ msg: "error hashing" });
        } else {
          const newUser = new userModel({
            ...req.body,
            password: hash,
          });
          await newUser.save();
          res.status(200).json({ msg: "user register " });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          const token = jwt.sign({ userID: user._id }, "passkey");
          res.status(200).json({ msg: "Login successful", token });
        } else {
          res.status(401).json({ msg: "Incorrect password" });
        }
      });
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
