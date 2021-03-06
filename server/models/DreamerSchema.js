//Create User model
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


//Create new instance
let DreamerSchema = new Schema(
    {
        name:{required:true,type:String},
        email:{required:true,type:String},
        password:{required:true,type:String},
        role:{required:true,type:String},
        date:{type:Date, default:Date.now},
        dreams:[{type:mongoose.Schema.Types.ObjectId,ref:"dreams"}]
    }
)

//export model
module.exports = mongoose.model('dreamers', DreamerSchema);