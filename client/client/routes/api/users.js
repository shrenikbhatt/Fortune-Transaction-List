const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password, confirm_password } = req.body;

  // Check to ensure all fields are filled out
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  } else if (password != confirm_password) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  // Check for any existing users
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "This user already exists" });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    // Gen salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 1800 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
