const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
//const response = require('./../libs/responseLib');

//const BlogModel = mongoose.model("Blog");
const itemModel = require('../models/itemModel');
const userModel = require('../models/userModel');
const cartModel = require('../models/cartModel');

console.log("ecomModel : " + itemModel);

//ecom functions
let getAllItems = (req, res) => {
    console.log(req.user);
    itemModel.find().select('-__v -__id').lean()
        /*Sets the lean option. Documents returned from queries with the lean option
         enabled are plain javascript objects, not Mongoose Documents. They have no save method, 
         getters/setters or other Mongoose magic applied*/
        .exec((err, result) => {
            if (err) {
                console.log(err);
                //let apiResponse = response.generate
                res.send(err);
            }
            else if (result == undefined || result == null || result == '') {
                console.log('No item found')
            }
            else {
                res.send(result)
                //console.log("result in Controller:" + result);
            }
        })
}

let viewByItemId = (req, res) => { //for route params use req.params.(key) for body use req.body.(key)
    itemModel.findOne({ 'itemId': req.params.itemId }, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else if (result == undefined || result == '' || result == null) {
            console.log("No Item Found");
            res.send('No Item found');
        } else {
            res.send(result)
        }
    })
}

let viewByCategory = (req, res) => {
    itemModel.findOne({ 'category': req.params.category }, (err, result) => {

        if (err) {
            console.log(err);
            res.send(err);
        } else if (result == undefined || result == '' || result == null) {
            console.log("No item Found");
            res.send('No item found');
        } else {
            res.send(result)
        }
    })
}

let createItem = (req, res) => {
    var now = Date.now();
    let itemId = shortid.generate();
    //blogid from req.body can be used, but for secrecy it's not used,shortid provides shorter ids

    let newItem = new itemModel({

        itemId: itemId, //this. wasn't used
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        category: req.body.category,
        added: now
    })

    /* using new creates a new record which is saved */
    newItem.save((err, result) => { //mongoose function save
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(result)
            res.send("item created successfully")
        }
    })
}

let deleteItem = (req, res) => {
    let options = req.body;
    console.log(options);
    itemModel.remove({ 'itemId': req.params.itemId }).exec((err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else if (result == undefined || result == '' || result == null) {
            console.log("No items Found");
            res.send('No items found');
        } else {
            res.send(result)
        }
    })
}

let createUser = (req, res) => {
    let userId = shortid.generate();
    let newUser = new userModel({

        userId: userId, //this. wasn't used
        name: req.body.name,
        cart: ''
    })


    newUser.save((err, result) => { //mongoose function save
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(result)
        }
    })

}

let getAllUsers = (req, res) => {
    console.log(req.user);
    userModel.find().select('-__v -__id').lean()
        /*Sets the lean option. Documents returned from queries with the lean option
         enabled are plain javascript objects, not Mongoose Documents. They have no save method, 
         getters/setters or other Mongoose magic applied*/
        .exec((err, result) => {
            if (err) {
                console.log("inside getallusers" + err);
                //let apiResponse = response.generate
                res.send(err);
            }
            else if (result == undefined || result == null || result == '') {
                console.log('No user found')
            }
            else {
                res.send(result)
                console.log("using console.log outputs to cmd" + JSON.stringify(result));
            }
        })
}

let getUser = (req, res) => {/*
    userModel.findOne({userId:'req.body.userid'},(err,result)=>{
        if (err) {
            console.log(err);
            res.send(err);
        } else if (result == undefined || result == '' || result == null) {
            console.log("No user Found");
            res.send('No user found');
        } else {
            res.send(result);
            console.log("user with userId " +result.userId + " found")
        } 
    })*/
    userModel.find({ "userId": "req.body.userid" }).lean().exec((err, result) => {//new,multi
        if (err) {
            console.log("error inside getuser" + err);
            res.status(500).send(err);
        } else if (!result) {
            res.status(404).send();
            console.log("no users found");
        } else if (result) {
            console.log("result of mongodb" + JSON.stringify(result));
        }
    })
}

let addToCartItem = (req, res) => {
    let itemId = req.body.itemId;
    //console.log();
    /*this failed miserably, i dont knwo why, the userModel couldn't be searched */
    userModel.find({ "userId": "req.body.userid" }).exec(function (err, result) {//new,multi
        if (err) {
            console.log("error inside addtocart" + err);
            res.status(500).send(err);
        } else if (!result) {
            res.status(404).send();
            console.log("no users found");
        } else if (result) {
            console.log("result of mongodb" + JSON.stringify(result));
            let obj = {
                itemId: itemId,
            }
            //result.cart.push(obj);
        }
        //console.log("No item Found");
        //res.send('No item found');
    })
}

let addToCart = (req,res)=>{
    let cartModel1 = new cartModel({
        itemid: req.body.itemid //this. wasn't used
    })

    /*cartmodel is the collection into which new records are inserted.
    the records are created using new and then pushed into the collection.
    using let makes the cartModel1 variable re-usable */
    cartModel1.save((err, result) => { //mongoose function save
        if (err) {
            console.log("cartmodel1 save error : " +err);
            res.send(err);
        } else if (result) {
            //using IIFE which will automatically show the cart when any item is saved succesfully
            let seecart = (function(){ 
                cartModel.find().lean().exec((err,result)=>{
                    //result = o/p from cartmodel search 
                    if (err) {
                        console.log("seecart error : "+err);
                        //res.send(err);
                    } else {
                        //res.send(result); //
                        //res.send("item added successfully")
                        console.log("seecart successful" + JSON.stringify(result));
                    }  
                })
            })();
            //res.send(result); ///if sent more than once res.send() returns header error
            //res.send("item added successfully")
            console.log("the added item is " + JSON.stringify(result));
        }
    })

    console.log("cartModel1, which is a new cartModel has been defined for a user :"+ JSON.stringify(cartModel1)
     + "having length  " + typeof(cartModel1));
    //res.send(cartModel);
}


console.log("inside controller")

module.exports = {
    getAllItems: getAllItems,
    viewByItemId: viewByItemId,
    viewByCategory: viewByCategory,
    deleteItem: deleteItem,
    createItem: createItem,
    createUser: createUser,
    getAllUsers: getAllUsers,
    getUser: getUser,
    addToCartItem: addToCartItem,
    addToCart :addToCart
}