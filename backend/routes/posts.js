

const express = require("express"); // import express
const router =  express.Router(); // create router;
const Post = require("../models/post");
const checkAuth = require("../middleware/check.auth");

//1
router.post("",checkAuth,(req,res,next) => {
  Post.find().then( documents => {
    console.log(documents);
  })
  const post = new Post({   // object created with mongoose
    title: req.body.title ,
    content: req.body.content,
    creator: req.userData.userId
 });
 // testing purpose- check if middleware adds userdata
 // return res.status(200).json(req.userData);
 //console.log(req.userData);

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

// api-2  get all posts // or get post by query size and page
//posts?size=2&page=1  this is right url to test : 1st question mark then onwards &
router.get("",(req,res,next)=> {
  console.log(req.query);
  pageSize = +req.query.size; // + makes it integer from url string
  currentPage = +req.query.page; // query is a js object
  const result = Post.find(); // 1st pass

  if(pageSize && currentPage){
      result.skip(pageSize*(currentPage-1))
            .limit(pageSize);
  }

  let fetchedPosts=null;
  result.then(  documents=> {
    fetchedPosts = documents;
    return Post.count();
  }).then(count=>{
    res.status(200).json({
      message:"get call success",
      posts : fetchedPosts,
      count: count
    })
  });
});

// 3

router.delete("/:id",checkAuth,(req,res,next)=>{
    console.log("delete called "+req.params.id);
    Post.deleteOne({_id:req.params.id,creator:req.userData.userId}).then(
      result=>{
        console.log(result);
        if(result.n>0) res.status(200).json({message:'updated post'});
        else           res.status(401).json({message:'not allowed to update'});
      }
    );
    //res.status(200).json({message:"post deleted"});
})


// 4 update
router.put("/:id",checkAuth,(req,res,next)=>{
    const post = new Post({   // object created with mongoose
                    _id: req.body.id,
                    title: req.body.title ,
                    content: req.body.content
                  });
    // one way to allow only creator to update
    // updateOne {id, condition} condition is -> creator:req.userData.userId
    // success response but doesn't edit
    Post.updateOne({_id:req.params.id,creator:req.userData.userId},post).then(
      result=>{
        if(result.n>0) res.status(200).json({message:'updated post'});
        else           res.status(401).json({message:'not allowed to update'});
      }
    );
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
