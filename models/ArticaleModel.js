const mongoose = require('mongoose');

const ArticaleSchema = new mongoose.Schema(
  {
    userId: { type:mongoose.Schema.Types.ObjectId,require:true,ref:"User" },
    articale:{ type: String}
   
  });


// Export the model
module.exports = mongoose.model('Articale', ArticaleSchema);