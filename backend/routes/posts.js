

const express = require("express"); // import express
const router =  express.Router(); // create router;
const Post = require("../models/post");

//1
router.post("", (req,res,next) => {
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

// 2  get all posts // or get post by query size and page
//posts?size=2&page=1  this is right url to test

router.get("",(req,res,next)=> {
  console.log(req.query);

  pageSize = +req.query.size; // + makes it integer from url string
  currentPage = +req.query.page; // query is a js object

  const result = Post.find(); // 1st pass

  if(pageSize && currentPage){
      result.skip(pageSize*(currentPage-1))
            .limit(pageSize);
  }

  result.then(  documents=> {
  console.log(documents);
  res.status(200).json( {
    message: " get successful",
    posts: documents
  })
    })
})

// 3

router.delete("/:id",(req,res,next)=>{
    console.log("delete called "+req.params.id);
    Post.deleteOne({_id:req.params.id}).then(result=>{
      console.log("result"+result);
    });
    res.status(200).json({message:"post deleted"});
})


// 4
router.put("/:id",(req,res,next)=>{
    const post = new Post({   // object created with mongoose
  _id: req.body.id,
  title: req.body.title ,
  content: req.body.content
    });

    console.log(post);
    Post.updateOne({_id:req.params.id},post).then(result=>{
  res.status(200).json({message:'updated post'});
    });
})

// 5 API get post by ID
router.get("/:id",(req,res,next)=>{
    Post.findById(req.params.id).then(post=>{
      if(post){
        res.status(200).json(post);
      } else {
        res.status(404).json({message:"POST not found."});
      }
    })
})

module.exports = router;
