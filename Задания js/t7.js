function validateFinalForm(e) {
  e.preventDefault();

  // очистка ошибок
  document.querySelectorAll("span[id$='Err']").forEach(el => el.textContent = "");

  let ok = true;

  // 1. Имя
  const name = document.getElementById("fname").value.trim();
  if (!name) {
    document.getElementById("fnameErr").textContent = "Заполните имя";
    ok = false;
  }

  // 2. Email (простая проверка)
  const email = document.getElementById("femail").value.trim();
  if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("femailErr").textContent = "Некорректный email";
    ok = false;
  }

  // 3. Телефон — только цифры
  const phone = document.getElementById("fphone").value.trim();
  if (phone && !/^\+?\d[\d\s()-]*$/.test(phone)) {
    document.getElementById("fphoneErr").textContent = "Только цифры";
    ok = false;
  }

  if (ok) {
    document.getElementById("success").style.display = "block";
    // здесь обычно отправляют форму на сервер через fetch / axios
  }

  return false;
}