
//importing the module for use
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const ecomConfig = require('./config/config'); //port, db and version used
console.log(JSON.stringify(ecomConfig));

const route = require('./routes/route.js');
console.log("route in index.js : " + route);
//outputs in terminal -- console.log(ecomConfig);

//const middle = require('./middlewares/middleware.js');
//const globalErrorMiddleware = require('./middlewares/appErrorHandler');
//creating an instance of express
const app = express();


//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


//path for model of db
let modelsPath = './models';
//let itemModelPath = './models'

fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        require(modelsPath + '/' + file);
        console.log(file);
    }
});


//bootstrap route using routes folder
let routes = require('./routes/route');//why this way?
//setting rotes using setRouter of blogRoute.js/////////////////////////////
routes.setRouter(app);

//calling global error handler
//app.use(exMiddle.exampleMiddleWare);
//app.use(globalErrorMiddleware.globalNotFoundHandler);


//const blogSchema = require('./models/blogModel')//
//blogSchema = blogSchemaRoute.blogSchema;

app.listen(ecomConfig.port, function () {
    console.log('E-commerce app listening on port 3100!');
    //creating mongodb connection
});

//db created
let db = mongoose.connect(ecomConfig.db.uri)//('mongodb://localhost:27017')


mongoose.connection.on('error', function (err) {
    console.log("database connection error");
    console.log(err);
});

mongoose.connection.on('open', (err) => {
    if (err) {
        console.log("database connection error");
        console.log(err);
    }
    else {
        console.log("db conn success");
    }
});