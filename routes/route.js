const mongoose = require('mongoose');

const express = require('express');

const ecomController = require('./../controllers/controller');
console.log("ecomController : " + JSON.stringify(ecomController));

//const exMiddle = require ('./../middlewares/exMiddle');
const ecomConfig = require('./../config/config');

let setRouter = (app) => {

    let baseUrl = ecomConfig.apiVersion + '/items';  //api/v1/items

    app.get(baseUrl + '/', ecomController.getAllItems);
    //app.get(baseUrl+'/all',exMiddle.exampleMiddleWare,blogController.getAllBlog);
    app.get(baseUrl+'/view/:itemId',ecomController.viewByItemId);
    //app.get(baseUrl+'/view/:itemId',exMiddle.exampleMiddleWare,ecomController.viewByItemId);
    app.get(baseUrl + '/view/category/:category', ecomController.viewByCategory);
    app.post(baseUrl + '/:itemId/delete', ecomController.deleteItem);
    app.post(baseUrl + '/createitem', ecomController.createItem);
    /**
     * @api {post} /api/v1/items/create Create Item
     * @apiVersion 0.0.1
     * @apiGroup create
     * 
     * @apiParam {String} name  send a body parameter
     * @apiParam {String} description  send a body parameter
     * @apiParam {String} colour  send a body parameter
     * @apiParam {String} category  send a body parameter
     * @apiParam {Date} date send a body parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
     * error: "false",
     * message:"item created successfully"
     * status:"200"
     * data:{
     *   itemId: itemId, 
         name: "string",
         description:"string",
         color:"string",
         category: "string",
         added:"date"
     * }
     * }
     */
    app.post(baseUrl + '/addtocartitem', ecomController.addToCartItem),
    app.post(baseUrl + '/addtocart', ecomController.addToCart),
    app.post(baseUrl + '/createuser', ecomController.createUser),
    app.get(baseUrl + '/getallusers', ecomController.getAllUsers),
    app.post(baseUrl + '/getuser', ecomController.getUser),
    app.get(baseUrl + '/index.html')
}

console.log("inside route");

module.exports = { setRouter: setRouter }
//or module.exports.setRouter = setRouter;