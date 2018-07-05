const mongoose = require ('mongoose');
console.log("MONGOOSE INSIDE MODEL :")
console.log(mongoose);
let Schema = mongoose.Schema;

let itemSchema = new Schema({
    itemId:{ 
        type:String,
        //unique:true
    },
    name:{
        first:String,
        last:String,
    },
    description:{
        type:String,
        default:''
    },
    colour:{
        type:String,
    },
    category:{
        type:String,
        default:''
    },
    added:{
        type:Date
    },
    price:{
        type:Number
    }
});

console.log("------inside ecomModel");
// no export statement here, mongoose.model handles that
//mongoose.model('Blog',blogSchema);
module.exports = mongoose.model('Item',itemSchema)

//http://mongoosejs.com/docs/models.html; For the example above, 
//the model Blog is for the blogs collection in the database

