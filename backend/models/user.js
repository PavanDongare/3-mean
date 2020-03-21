const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")


const userSchema = mongoose.Schema({
  email : { type: String , required : true, unique : true }, // unique is not validator
  content: { type: String , required : true },

});


userSchema.plugin(uniqueValidator);

module.exports =   mongoose.model("Post",userSchema);
