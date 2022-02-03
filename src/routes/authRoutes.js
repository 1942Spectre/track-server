const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();
const secret_key_token = "SECRET_WEB_TOKEN"

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });

    await user.save();
    const token = jwt.sign({ userId: user._id }, secret_key_token);
    res.send({ token });
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

router.get("/asx", requireAuth, (req, res) => {
  res.send("Hello There from asx");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You can not log in without credentials" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(422).send({ error: "Invalid password or email" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({userId: user._id}, secret_key_token)
    res.send({token})
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});
module.exports = router;
