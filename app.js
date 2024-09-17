require("dotenv").config();
const express = require("express");
// const connection = require('./db'); // Import the MySQL connection
const orderRoute = require("./routes/orderRoute");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/order", orderRoute);



// app.get('/products', (req, res) => {
//     const sql = 'SELECT * FROM products';

//     connection.query(sql, (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to fetch products' });
//         }
//         res.json(results);
//     });
// });

// app.post('/products', (req, res) => {
//     const { name, price } = req.body;
//     const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';

//     connection.query(sql, [name, price], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to insert product' });
//         }
//         res.status(201).json({ message: 'Product created', productId: results.insertId });
//     });
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
