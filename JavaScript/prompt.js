// Задание 1: Поиск по ID
const title = document.getElementById('main-title');
title.textContent = "DOM works!";

// Задание 2: Поиск по классу (первый элемент)
const firstCard = document.querySelector('.card');
firstCard.style.backgroundColor = '#f0f0f0';

// Задание 3: Поиск всех элементов
const allCards = document.querySelectorAll('.card');
console.log(`Count of cards: ${allCards.length}`);

// Задание 4: Изменение текста
const paragraph = document.getElementById('description');
paragraph.textContent = "This paragraph was changed through JavaScript!";

// Задание 5: Использование innerHTML 
const contentBox = document.getElementById('content-box');
contentBox.innerHTML = "<strong>Important!</strong> All content inside has been updated.";

// Задание 6: Изменение атрибута
const image = document.getElementById('my-img');
image.setAttribute('src', 'https://via.placeholder.com/150'); // Заменяем на заглушку

// Задание 7: Получение атрибута
const link = document.getElementById('my-link');
console.log(`Значение href ссылки: ${link.getAttribute('href')}`);

// Задание 8: Добавление CSS-класса
const secondCard = allCards[1]; // Берем вторую карточку
secondCard.classList.add('active');

// Задание 9: Удаление CSS-класса
secondCard.classList.remove('active');

// Задание 10: Переключение класса (toggle)
const toggleBtn = document.getElementById('btn-toggle');
toggleBtn.addEventListener('click', () => {
    firstCard.classList.toggle('highlight');
});

// Задание 11: Изменение inline-стиля
title.style.color = "darkblue";
title.style.fontSize = "40px";

// Задание 12 & 13: Событие click и изменение текста
const mainBtn = document.getElementById('btn-main');
mainBtn.addEventListener('click', function() {
    console.log("Main button clicked!"); // Задание 12
    title.textContent = "Title changed by button!"; // Задание 13

    // Задание 14: Изменение нескольких элементов (фон всех карточек)
    allCards.forEach(card => {
        card.style.backgroundColor = "lightgreen";
    });
});

// Задание 15: Мини-интерактив
const interactiveBtn = document.getElementById('btn-interactive');
interactiveBtn.addEventListener('click', function() {
    // 1. Меняет текст
    this.textContent = "Interacted!";
    
    // 2. Добавляет/убирает класс у параграфа
    paragraph.classList.toggle('active');
    
    // 3. Изменяет стиль
    paragraph.style.color = paragraph.classList.contains('active') ? "red" : "black";
});