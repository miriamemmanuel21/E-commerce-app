const inventory = {
    1: { stock: 10 },  // Item ID 1
    2: { stock: 5 },   // Item ID 2
    3: { stock: 0 }    // Item ID 3
};

const checkInventory = (itemId, quantity) => {
    return inventory[itemId] && inventory[itemId].stock >= quantity;
};

const updateStock = (items) => {
    items.forEach(item => {
        if (inventory[item.itemId]) {
            inventory[item.itemId].stock -= item.quantity;
            if (inventory[item.itemId].stock <= 0) {
                console.log(`Item ${item.itemId} is out of stock.`);
            }
        }
    });
};

module.exports = { inventory, checkInventory, updateStock };
