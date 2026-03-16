// index.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// 1. Подключение к базе данных
mongoose.connect('mongodb://127.0.0.1:27017/shop_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB подключена'))
.catch(err => console.error('Ошибка подключения к MongoDB:', err));

// 2. Схема для товара
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    category: String
});

const Product = mongoose.model('Product', productSchema);

// 3. Маршрут POST /add-product
app.post('/add-product', async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const product = new Product({ name, price, category });
        await product.save();
        res.status(201).json({ message: 'Товар добавлен', product });
    } catch (err) {
        res.status(400).json({ message: 'Ошибка при добавлении товара', error: err.message });
    }
});

// 4. Маршрут GET /products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при получении товаров', error: err.message });
    }
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});