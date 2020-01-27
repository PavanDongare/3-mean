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



app.post("/api/posts", (req,res,next) => {
    Post.find().then( documents => {
      console.log(documents);
    })
    const post = new Post({   // object created with mongoose
      title: req.body.title ,
      content: req.body.content
   });
   post.save().then(
     result => {
      console.log(post);
      res.status(201).json({
        message: "post added successfully",
        PostId: result._id
      });
     }
   )  ; // provided by mongoose

});

app.get("/api/posts",(req,res,next)=> {
  Post.find().then(  documents=> {
    console.log(documents);
    res.status(200).json( {
      message: " get successful",
      posts: documents
    })
  } )
})

app.delete("/api/posts/:id",(req,res,next)=>{
  console.log("delete called "+req.params.id);
  Post.deleteOne({_id:req.params.id}).then(result=>{
    console.log("result"+result);
  });
  res.status(200).json({message:"post deleted"});
})

module.exports = app;



// $ lsof -i tcp:3000
// $ kill -9 PID
