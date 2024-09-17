// This is our inventory where we keep track of the available stock for each item
const inventory = {
  1: 10,  // Item with ID 1 has 10 units available
  2: 0,   // Item with ID 2 has 0 units available (out of stock)
  3: 5    // Item with ID 3 has 5 units available
};

/**
 * Function to check if there's enough stock for an item
 * @param {number} itemId - The ID of the item
 * @param {number} quantity - The amount of the item that is needed
 * @returns {boolean} - Returns true if there's enough stock, otherwise false
 */
const checkInventory = (itemId, quantity) => {
  // Check if the item has enough stock (is the quantity available greater than or equal to what's needed?)
  return inventory[itemId] >= quantity;
};

/**
 * Function to update the stock after an order is placed
 * @param {Array} items - A list (array) of items from the order
 */
const updateStock = (items) => {
  // Loop through each item in the order
  items.forEach(item => {
    // If the item exists in the inventory
    if (inventory[item.itemId] !== undefined) {
      // Reduce the item's stock by the quantity ordered
      inventory[item.itemId] -= item.quantity;
    }
  });
};

// Export these functions so other files can use them
module.exports = { checkInventory, updateStock };
