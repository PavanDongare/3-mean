const jwt = require("jsonwebtoken");


// assigned a fun
module.exports = (req,res,next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,"");
    next(); 
  }
  catch {
  res.status(200).json({message:"auth fail"});
  }
}
