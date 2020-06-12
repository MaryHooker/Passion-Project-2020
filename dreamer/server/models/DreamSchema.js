//Create Dream model
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


//Create new instance
let DreamSchema = new Schema(
    {
        type:{required:true,type:String},
        dreamDescription:{required:true,type:String},
        dreamer:[{type:mongoose.Schema.Types.ObjectId,ref:"dreamers"}],
        date:{type:Date, default:Date.now}
    }
)

//export model
module.exports = mongoose.model('dreams', DreamSchema);