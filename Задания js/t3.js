function checkPassword(e) {
  e.preventDefault();
  const pass = document.getElementById("pass3").value;
  const err = document.getElementById("pass3Error");
  err.textContent = "";

  if (pass.length < 6) {
    err.textContent = "Пароль должен быть не менее 6 символов";
    return false;
  }

  alert("Пароль подходит");
  return false;
}