// 1. Variables and data types
let userName = "Kara";
let userAge = 18;
let isStudent = true;

alert(typeof userName);
alert(typeof userAge);
alert(typeof isStudent);


// 2. prompt / alert / confirm
let nameFromUser = prompt("Enter your name:");
let ageOfUser = prompt("Enter your age:");

alert("Hello, " + nameFromUser + "! You are " + ageOfUser + " years old.");

let isCorrectAge = confirm("Did you enter the correct age?");


// 3. if / else
if (isCorrectAge === true) {
    alert("Age confirmed");
} else {
    alert("Please reload the page and enter the data again");
}

// Проверка совершеннолетия
if (ageOfUser < 18) {
    alert("You are still a minor, kiddo!");
} else {
    alert("You are an adult");
}


// 4. Arithmetic operators
let currentYear = 2026;
let birthYear = currentYear - ageOfUser;

alert("Your birth year: " + birthYear);


// Additional arithmetic operations
let a = 79;
let b = 326;

alert("Sum: " + (a + b));
alert("Difference: " + (a - b));
alert("Multiplication: " + (a * b));
alert("Division: " + (a / b));
alert("Remainder of division: " + (a % b));