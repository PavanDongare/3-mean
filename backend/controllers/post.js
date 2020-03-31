const Post = require("../models/post");


exports.submitPost = (req,res,next) => {
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
   }); // provided by mongoose
};


exports.getAllPost =(req,res,next)=> {
  console.log(req.query);
  pageSize = +req.query.size; // + makes it integer from url string
  currentPage = +req.query.page; // query is a js object
  const result = Post.find(); // 1st pass
  if(pageSize && currentPage){
      result.skip(pageSize*(currentPage-1))
            .limit(pageSize);}
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
  }).catch(err=>res.status(500).json({ message:'backend crashed',}));
};


exports.deletePost =(req,res,next)=>{
  console.log("delete called "+req.params.id);
  Post.deleteOne({_id:req.params.id,creator:req.userData.userId}).then(
    result=>{
      console.log(result);
      if(result.n>0) res.status(200).json({message:'updated post'});
      else           res.status(401).json({message:'not allowed to update'});
    }
  ).catch(err=>res.status(500).json({ message:'delete failed.'}));;
  //res.status(200).json({message:"post deleted"});
};


exports.updatePost =(req,res,next)=>{
  const post = new Post({   // object created with mongoose
                  _id: req.body.id,
                  title: req.body.title ,
                  content: req.body.content,
                  creator: req.userData.userId
                });
  // one way to allow only creator to update.
  // updateOne {id, condition} condition is -> creator:req.userData.userId
  // success response but doesn't edit
  Post.updateOne({_id:req.params.id,creator:req.userData.userId},post).then(
    result=>{
      if(result.n>0) res.status(200).json({message:'updated post'});
      else           res.status(401).json({message:'not allowed to update'});
    }
  );
};


exports.getSinglePost =(req,res,next)=>{
  Post.findById(req.params.id).then(post=>{
    if(post){
      res.status(200).json(post);
    } else {
      res.status(404).json({message:"POST not found."});
    }
  }).catch(err=>res.status(500).json({ message:'backend fail at post fetch'}));
};

