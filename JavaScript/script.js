// Элементы на странице
const title = document.getElementById('main-title');
const actionBtn = document.getElementById('btn-action');
const mathBtn = document.getElementById('btn-math');

// 2: Функция с параметром ---
// Принимает число и выводит его квадрат в консоль
function calculateSquare() {
    let input = prompt("Введите число:");
    let number = parseFloat(input);
    const result = number * number;
    console.log(`Квадрат числа ${number} равен: ${result}`);
}

// 3: Изменение содержимого страницы ---
// Функция для смены текста заголовка
function updateHeadingText() {
    title.textContent = "Текст заголовка успешно изменен!";
}

// 1: Обработка события клика ---
// Используем addEventListener для первой кнопки
actionBtn.addEventListener('click', function() {
    console.log("Кнопка нажата"); // Задание 1
    updateHeadingText();          // Вызов функции из задания 3
});

// Обработчик для второй кнопки (2)
mathBtn.addEventListener('click', function() {
    calculateSquare();
});