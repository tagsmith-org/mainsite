const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/orders', (req, res) => {
    res.json([]);
});

app.get('/api/stats', (req, res) => {
    res.json({ orders: 0 });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
