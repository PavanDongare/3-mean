

const express = require("express");
const router =  express.Router();

const checkAuth = require("../middleware/check.auth");
const postController = require("../controllers/post");

router.post     ("",    checkAuth,postController.submitPost);
router.get      ("",              postController.getAllPost); //posts?size=2&page=1  this is right url to test : 1st question mark then onwards &
router.delete   ("/:id",checkAuth,postController.deletePost);
router.put      ("/:id",checkAuth,postController.updatePost);
router.get      ("/:id",          postController.getSinglePost);

module.exports = router;
