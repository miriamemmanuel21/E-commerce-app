// Array representing the inventory, where each item has an itemId and the available stock
const inventory = [
  { itemId: 1, stock: 10 }, // Item with ID 1 has 10 units in stock
  { itemId: 2, stock: 9 },  // Item with ID 2 has 9 units in stock (can be updated as needed)
  { itemId: 3, stock: 0 },  // Item with ID 3 has 0 units in stock (out of stock)
];

// Export the inventory array so it can be used in other files
module.exports = { inventory };
