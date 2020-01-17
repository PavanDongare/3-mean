const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://pavan:isg39Vqal4YvodDJ@cluster0-rcm2k.mongodb.net/test?retryWrites=true&w=majority")


const Post = require("./models/post");


// isg39Vqal4YvodDJ
app.use(bodyParser.json());

app.use( (req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,UPDATE,OPTIONS"
  )
  next();
});


app.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
  return next(); // call  next if you are not sending a response
});



app.post("/api/posts", (req,res,next) => {

    const post = Post({
      title: req.body.title ,
      content: req.body.content

   });
   console.log(post);
   res.status(201).json({
     message: "post added successfully"
   });
});





app.use('/api/posts',(req,res,next)=>{
  posts = [
    {
      id: "1",
      title: "title1",
      content:"content1"
    },

    {
      id: "id2",
      title: "title2",
      content:"content2"
    },

  ];
  res.status(200).json({
    message: "success",
    posts : posts,
  });

});



module.exports = app;
