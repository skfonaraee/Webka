function checkAge() {
  const val = Number(document.getElementById("age").value);
  const err = document.getElementById("ageError");
  err.textContent = "";

  if (isNaN(val) || val < 18 || val > 60) {
    err.textContent = "Возраст должен быть от 18 до 60";
  } else {
    alert("Возраст корректен: " + val);
  }
}