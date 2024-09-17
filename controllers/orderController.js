const { checkInventory, updateStock } = require('../service/inventory');
// Import the `checkInventory` and `updateStock` functions from the inventory service.
// These will be used to validate stock levels and update stock after an order is placed.

const orders = require('../models/orderModel');
// Import the `orders` array or model from the orderModel.
// This will hold the order records, either in memory or database.

const generateOrderId = () => {
  return 'ORD' + Date.now();
};
//  This function helps  to generate a unique order ID by concatenating "ORD" with the current timestamp.

const createOrder = (req, res) => {
  const customerId = req.body.customerId;
  const items = req.body.items;
  //It then extracts the customerId and items from the request body, which the client sends.

  //It  then checks if the customerId is provided
  if (!customerId) {
    return res.status(400).json({
      status: "error",
      message: "Customer ID is required."
    });
  }
  // If customerId is missing, it will return an error response with status 400 (Bad Request).

  //This checks if items are valid
  for (let count = 0; count< items.length; count++) {
    const item = items[count];
    const itemId = item.itemId;
    const quantity = item.quantity;
    // while it loops  through each item in the `items` array and extract `itemId` and `quantity`.

    if (!itemId) {
      return res.status(400).json({
        status: "error",
        message: "Each item must have an itemId."
      });
    }
    // If any item is missing its itemId,it  returns an error response.

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid quantity for item " + itemId + ". Quantity must be greater than 0.",
        itemId: itemId
      });
    }
    // If quantity is missing or is less than or equal to zero,it  returns an error with details about the  item.

    //This checks if the item is available in stock
    if (!checkInventory(itemId, quantity)) {
      return res.status(400).json({
        status: "error",
        message: "Item " + itemId + " does not have enough stock.",
        itemId: itemId
      });
    }
    /**You use the checkInventory function to validate if enough stock is available.
    * If not,it should a  return an error response with the relevant item information.
     */
  }

  // If all items are valid,this creates a new order
  const order = {
    orderId: generateOrderId(),
    customerId: customerId,
    items: items
  };
  /**If all checks pass,this creates a new order object with the generated order ID, customer ID, and list of items.
  *Add the new order to the list of orders
   */
  orders.push(order);
  // Add the newly created order to the `orders` array (or it could be adding to a database).

  //This updates the stock for the ordered items
  updateStock(items);
  //This call updateStock to adjust the inventory quantities based on the items ordered.

  //This then sends a success response
  return res.status(201).json({
    status: "success",
    message: "Order created successfully.",
    order: order
  });
  //This returns a success response (HTTP 201 Created) with the order details.
};

module.exports = { createOrder };
// Export the createOrder function so it can be used in other parts of the application.
