const jwt = require("jsonwebtoken");


// assigned a fun
module.exports = (req,res,next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,"secret_this_should_be_longer");
    // add field to req
    req.userData = { email: decodedToken.email , userId : decodedToken.userId }
    next();
  }
  catch(error) {
  res.status(401).json({message:"unauthorized"});
  }
}
