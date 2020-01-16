const express = require('express');

const app = express();

app.use('/hello',(req,res,next)=>{
  console.log("2nd middlewear");
  res.send("2nd middlewear, hello from express");
  next();
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
