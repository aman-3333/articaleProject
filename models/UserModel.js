const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
   email:{type:String,unique:true,require:true},
   password:{type:String,require:true},
   username:{type:String,require:true},
   age:{type:Number,require:true},
   token:{type:String}
  });


// Export the model
module.exports = mongoose.model('User', UserSchema);