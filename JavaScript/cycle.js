// 1 Num check
let n = prompt("Enter a number:");
if (n > 0) {
    alert("The number is positive");
} else if (n < 0) {
    alert("The number is negative");
} else {
    alert("The number is zero");
}

// 2 Age group
let age = prompt("Enter your age:");
if (age < 7) {
    alert("You are a child");
} else if (age >= 7 && age <= 17) {
    alert("You are a pupil");
} else if (age >= 18 && age <= 22) {
    alert("You are a student");
} else if (age > 22) {
    alert("You are an adult");
} else {
    alert("Invalid age entered");
}

// 3 Even or odd
let number = prompt("Enter a number to check if it's even or odd:");
if (number % 2 === 0) {
    alert("The number is even");
} else {
    alert("The number is odd");
}

// 4 Grade check
let grade = prompt("Enter your grade (1-5):");
switch (grade) {
    case '1':
        alert("Very poor");
        break;
    case '2':
        alert("Unacceptable");
        break;
    case '3':
        alert("Satisfactory");
        break;
    case '4':
        alert("Good");
        break;
    case '5':
        alert("Excellent");
        break;
    default:
        alert("Invalid grade entered");
        break; 
}

// 5 A and B minimum
let A = prompt("Enter value for A:");
let B = prompt("Enter value for B:");
if (A < B) {
    alert("Minimum is A: " + A);
} else if (B < A) {
    alert("Minimum is B: " + B);
} else {
    alert("A and B are equal: " + A);
}

// 6 Cycle from 1 to 10  
for (let i = 1; i <= 10; i++) {
    alert(i);
}

// 7 sum from 1 to n
let num = prompt("Enter a positive integer n:");
let sum = 0;
for (let i = 1; i <= num; i++) {
    sum += i;
}
alert("The sum from 1 to " + num + " is: " + sum);

// 8 Even numbers from 1 to 50
for (let i = 1; i <= 50; i++) {
    if (i % 2 === 0) {
        alert(i);
    }
}

// 9 Multiplication table for 5
for (let i = 1; i <= 10; i++) {
    let j = 5 * i;
    alert("5 x " + i + " = " + j);
}

// 10 Countdown from 10 to 1
for (let i = 10; i >= 1; i--) {
    alert(i);
}
alert("Yoohoo!");

// 11 massive skip

// 12 Factorial calculation
let nFactorial = prompt("Enter a positive integer to calculate its factorial:");
let factorial = 1;
for (let i = 1; i <= nFactorial; i++) {
    factorial *= i;
}
alert("The factorial of " + nFactorial + " is: " + factorial);

// 13 Prime numbers from 1 to 100
for (let num = 2; num <= 100; num++) {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            isPrime = false;
            break;
        }
    }
    if (isPrime) {
        alert(num);
    }
}

// 14 massive skip

// 15 Stairs pattern
let steps = prompt("Enter the number of steps:");
let pattern = "";
for (let i = 1; i <= steps; i++) {
    pattern += "*";
    alert(pattern);
}

// 16 Fibonacci sequence up to n
let nFibo = prompt("Enter n for Fibonacci sequence up to n:");
let a = 0, b = 1;
alert(a);
alert(b);
while (true) {
    let next = a + b;
    if (next > nFibo) break;
    alert(next);
    a = b;
    b = next;
}

// 17 Sum of digits
let numForSum = prompt("Enter a positive integer to calculate the sum of its digits:");
let sumOfDigits = 0;
for (let digit of numForSum) {
    sumOfDigits += parseInt(digit);
}
alert("The sum of the digits in " + numForSum + " is: " + sumOfDigits);