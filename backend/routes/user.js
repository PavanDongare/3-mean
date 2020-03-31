const express = require("express"); // import express
const router =  express.Router(); // create router;
const userController = require("../controllers/user");


router.post("/signup", userController.createUser);
router.post("/login" , userController.loginUser);


module.exports = router;
