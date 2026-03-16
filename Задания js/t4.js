function checkPasswordsMatch(e) {
  e.preventDefault();
  const a = document.getElementById("passA").value;
  const b = document.getElementById("passB").value;
  const err = document.getElementById("matchError");
  err.textContent = "";

  if (a !== b) {
    err.textContent = "Пароли не совпадают";
    return false;
  }

  if (!a) {
    err.textContent = "Введите пароль";
    return false;
  }

  alert("Пароли совпадают");
  return false;
}