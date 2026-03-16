function validateForm1(e) {
  e.preventDefault();
  
  // сбрасываем предыдущие ошибки
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("passError").textContent = "";

  let name  = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let pass  = document.getElementById("password").value;

  let ok = true;

  if (!name) {
    document.getElementById("nameError").textContent = "Заполните поле";
    ok = false;
  }
  if (!email) {
    document.getElementById("emailError").textContent = "Заполните поле";
    ok = false;
  }
  if (!pass) {
    document.getElementById("passError").textContent = "Заполните поле";
    ok = false;
  }

  if (ok) {
    alert("Все поля заполнены!");
  }

  return false; // не отправляем форму
}