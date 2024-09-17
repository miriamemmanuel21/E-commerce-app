// Import the Express framework to create routes
const express = require('express');

// Import the functions from the orderController file
//  then 'createOrder' is used to handle order creation
const { createOrder, updateStock } = require('../controllers/orderController');

//  this Creates a new router object using Express
const router = express.Router();

//This  Defines a POST route for creating orders
// So When a POST request is made to '/create', the 'createOrder' function will be called
router.post('/create', createOrder);

// This Exports the router object so it can be used in other parts of the app (e.g., in app.js)
module.exports = router;
