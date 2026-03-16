const express = require('express');
const app = express();
const PORT = 3000;

// МИДЛВЕР: Обязательно для чтения данных из Postman (Body -> JSON)
app.use(express.json());

// База данных «на коленке» (простой массив в памяти)
let users = [
    { id: 1, name: "Alice", email: "alice@example.com" }
];

// 1. GET запрос — Получить всех пользователей
app.get('/users', (req, res) => {
    console.log("Кто-то запросил список пользователей");
    res.status(200).json(users);
});

// 2. POST запрос — Добавить нового пользователя
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,   // Данные из Postman придут сюда
        email: req.body.email
    };

    if (!newUser.name || !newUser.email) {
        return res.status(400).json({ message: "Ошибка: Имя и email обязательны!" });
    }

    users.push(newUser);
    console.log("Новый пользователь добавлен:", newUser);
    
    // Возвращаем созданный объект и статус 201 (Created)
    res.status(201).json(newUser);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен!`);
    console.log(`Ссылка для GET:  http://localhost:${PORT}/users`);
    console.log(`Ссылка для POST: http://localhost:${PORT}/users`);
});