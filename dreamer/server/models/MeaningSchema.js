//Create Meaning model
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


//Create new instance
let MeaningSchema = new Schema(
    {
        letter:{required:true,type:String},
        word:{required:true, type:String},
        meaning:{required:true,type:String},
        date:{type:Date, default:Date.now}
    }
)

//export model
module.exports = mongoose.model('meanings', MeaningSchema);