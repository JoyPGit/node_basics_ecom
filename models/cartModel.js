const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    itemid:{
        type:String,
        default:"123qwe"
        //unique:true
    },
    quantity:{
        type:Number,
        default:1
    },
    price:{
        type:Number,
        default:1000
    }  
})

module.exports = mongoose.model('cart',cartSchema)
//carts is the collection name, mongo pluralizes by default
//the cartModel which requires the cart from here acts as the collection on which save, find etc are run.