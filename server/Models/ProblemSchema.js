const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({  
    title:{
        type:String,
        required:true,
    
    },
    description:{
        type:String,

    },
    type:{
        type:String,
        required:true,
    },
    location:{
        type:String
    },
    reportedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    status: { 
        type: String, 
        enum: ["Pending", "In Progress", "Resolved"], 
        default: "Pending" 
      }, // Status of the issue
      images: [String], 
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Official" },
    
});

module.exports = mongoose.model("Problems",problemSchema);