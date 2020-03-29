const express = require("express"); // import express
const router =  express.Router(); // create router;
const User =  require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




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


router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      console.log("***************",req.body.email,user);
      if (!user) {

        return res.status(401).json({
          message: "Auth failed1"
        });
      }
      fetchedUser = user;


      console.log("*******user********",req.body.password, user.password);
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {

      if (!result) {
        return res.status(401).json({
          message: "Auth failed2"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      console.log("*******token********",token);

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId : fetchedUser._id
      });
    })
    .catch(err => {
      console.log("*******err********",err);

      return res.status(401).json({
        message: "Auth failed3"
      });
    });
});




module.exports = router;
