const mongoose = require('mongoose');
console.log("MONGOOSE INSIDE MODEL :")
console.log(mongoose);

const Schema = mongoose.Schema;

let userSchema = new Schema({
    userId: {
        type: String,
        //unique:true
    },
    name: {
        type: String
    },
    cart: [],
})//,{collection:'ecomusers'});

module.exports = mongoose.model('ecomusers', userSchema)
