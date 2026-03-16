// Элемент ввода и ошибки
const phoneInput = document.getElementById("phone");
const errorSpan   = document.getElementById("phoneError");

// 1. Запрещаем ввод недопустимых символов в реальном времени (самое удобное)
phoneInput.addEventListener("input", function () {
  // Оставляем только цифры, +, -, (), пробел
  this.value = this.value.replace(/[^+\d\s()-]/g, "");
});

// 2. При отправке формы — финальная проверка
document.getElementById("formPhone").addEventListener("submit", function (e) {
  e.preventDefault();

  // Очищаем предыдущее сообщение об ошибке
  errorSpan.textContent = "";

  const value = phoneInput.value.trim();

  // Проверяем два условия:
  // 1. Поле не пустое
  // 2. Содержит только разрешённые символы
  if (!value) {
    errorSpan.textContent = "Введите номер телефона";
    return;
  }

  // Регулярка: начинается с опционального +, потом цифры, пробелы, скобки, дефисы
  const allowedPattern = /^\+?[\d\s()-]+$/;

  if (!allowedPattern.test(value)) {
    errorSpan.textContent = "Телефон должен содержать только цифры (и +, -, (), пробелы)";
    return;
  }

  // Всё хорошо → выводим в консоль
  console.log("Задание 5 — корректный телефон:", value);
  alert("Телефон принят: " + value + "\n(данные также в консоли)");
});