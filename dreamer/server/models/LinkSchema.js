// Link Model

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Create new model/schema for Tips,Tricks, & Tellings
let LinkSchema = new Schema(
    {
        title:{required:true,type:String},
        link:{required:true,type:String},
        author:{required:true, type:String}
    }
)

//export model
module.exports = mongoose.model('links', LinkSchema);