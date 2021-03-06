//Create Dream model
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

 
//Create new instance
let DreamSchema = new Schema(
    {
        type:{required:true,type:String, enum:['Whatever','Daydream','Lucid','Nightmare','Recurring','Healing','Prophetic','Signal','Epic']},
        dreamDescription:{required:true,type:String},
        dreamer:[{type:mongoose.Schema.Types.ObjectId,ref:"dreamers"}],
        date:{type:Date, default:Date.now},
        meanings:[],
        likes:{user:[]},
        comments:[],
        spotlight:{type:Boolean},
        posted:{type:Boolean}
    }
)

//export model
module.exports = mongoose.model('dreams', DreamSchema);