const express = require("express"); // import express
const router =  express.Router(); // create router;
const User =  require("../models/user");
const bcrypt = require("bcrypt");




// commit to continue streak. cheating :(

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});






module.exports = router;
