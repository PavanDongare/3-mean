var express = require('express')
  , cors = require('cors')
  , app = express();

app.use(cors());


//const express = require('express');
const bodyParser = require("body-parser");

//const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pavan:isg39Vqal4YvodDJ@cluster0-rcm2k.mongodb.net/test?retryWrites=true&w=majority')
.then(()=>{
  console.log("connection successful")
})
.catch(()=>{
  console.log("connection failed")
})

const PostRoutes = require("./routes/posts"); // import routes object
// posts saved as docs
const Post = require("./models/post");


// isg39Vqal4YvodDJ
app.use(bodyParser.json());

app.use( (req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, X-Auth-Token, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,UPDATE,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,UPDATE,DELETE,OPTIONS"
  )
  next();
});


app.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
  return next(); // call  next if you are not sending a response
});



app.use("/api/posts",PostRoutes);

module.exports = app;

// $ lsof -i tcp:3000
// $ kill -9 PID
