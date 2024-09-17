// Import necessary functions and the inventory data
const { createOrder } = require('../controllers/orderController');
const { checkInventory, updateStock } = require('../service/inventory');


// Mock the inventory service functions
jest.mock('../service/inventory');

// Run this code before each test
beforeEach(() => {
    // Set up initial stock values for items
    inventory.forEach(item => {
        if (item.itemId === 1) {
            item.stock = 10; // Reset stock for item 1 to 10
        }
        if (item.itemId === 3) {
            item.stock = 0; // Set item 3 stock to 0
        }
    });

    // Mock the checkInventory function
    checkInventory.mockImplementation((itemId, quantity) => {
        const item = inventory.find(item => item.itemId === itemId);
        return item ? item.stock >= quantity : false; // Return true if stock is enough
    });

    // Mock the updateStock function
    updateStock.mockImplementation((items) => {
        items.forEach(({ itemId, quantity }) => {
            const item = inventory.find(item => item.itemId === itemId);
            if (item) {
                item.stock -= quantity; // Reduce the stock for the item
            }
        });
    });
});

// Test: Create a valid order
test('create a valid order', () => {
    const customerId = 123;
    const items = [{ itemId: 1, quantity: 2 }];
    const order = createOrder(customerId, items);

    // Check if order was created correctly
    expect(order).toHaveProperty('orderId');
    expect(order.customerId).toBe(customerId);
    expect(order.items).toEqual(items);
});

// Test: Fail to create an order due to insufficient stock
test('fail to create an order due to insufficient stock', () => {
    const customerId = 123;
    const items = [{ itemId: 3, quantity: 1 }]; // Item 3 is out of stock
    expect(() => createOrder(customerId, items)).toThrow('Error: Item 3 does not have enough stock.');
});

// Test: Update stock after an order
test('update stock after an order', () => {
    const customerId = 123;
    const items = [{ itemId: 1, quantity: 2 }];
    createOrder(customerId, items);

    // Check that the stock has been reduced
    expect(inventory.find(i => i.itemId === 1).stock).toBe(8); // Stock should be 8 after order
});