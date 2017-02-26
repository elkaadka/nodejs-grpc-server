/*
This is a basic example of how grpc and protocol buffer works
this code defined a simple grpc server (see product.proto)
In this example, we use a Product class defined in product.proto
This server takes in a product and then calculates the toal price (multiply by quantity)
and then returns a price class that contains the total price
*/
"use strict";

//first we load the protocol buffer package we ar going to use
var productProto = __dirname + '/product.proto';
var grpc = require('grpc');
//here we ask grpc to laod the file and then load the package named : "Product" (see product.proto)
var product = grpc.load(productProto).Product;

//Defining the "calculate" function that calculates the total price..'
function calculate(call, callback) {
    let product = call.request;
    //A client sent a request to this service
    console.log('received product request');
    console.log(product);
    //we calculate the price and send it
    callback(null, {price: (product.unitPrice.price *  product.quantity)});
}

var server = new grpc.Server();
//Binding product.proto service (calculatePrice) to ours (calculate)
server.addProtoService(product.Calculator.service, {calculatePrice: calculate});
//Listening to all reuests on port 3000
server.bind('localhost:3000', grpc.ServerCredentials.createInsecure());
server.start();
