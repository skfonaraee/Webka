function checkEmail(e) {
  e.preventDefault();
  const val = document.getElementById("email2").value.trim();
  const err = document.getElementById("email2Error");
  err.textContent = "";

  if (!val.includes("@") || !val.includes(".")) {
    err.textContent = "Введите корректный email";
    return false;
  }

  alert("Email выглядит корректно");
  return false;
}