// 1. Name through prompt
let userName = prompt("Enter your name:");
alert(`Hello, ${userName}!`);

// 6. Is number is a typeof number
let num = parseFloat(prompt("Enter a number:"));
console.log("The type of the entered value is: " + typeof num);

// 14. Radius and Area of Circle
let radius = parseFloat(prompt("Enter the radius of the circle:"));
let area = Math.PI * Math.pow(radius, 2);
console.log("The area of the circle with radius " + radius + " is " + area.toFixed(2));

// 9. Sum of two numbers
let number1 = parseFloat(prompt("Enter the first number:"));
let number2 = parseFloat(prompt("Enter the second number:"));
let sumResult = number1 + number2;
console.log("The sum of " + number1 + " and " + number2 + " is " + sumResult);

// 11. Remainder of division
let dividend = parseInt(prompt("Enter the dividend:"));
let divisor = parseInt(prompt("Enter the divisor:"));
let remainder = dividend % divisor;
console.log("The remainder of " + dividend + " divided by " + divisor + " is " + remainder);

// 28. Days of the week
let dayNumber = prompt("Enter a number (1-7) for the day of the week:");
switch (dayNumber) {
    case '1':
        console.log("Monday");
        break;
    case '2':
        console.log("Tuesday");
        break;
    case '3':
        console.log("Wednesday");
        break;
    case '4':
        console.log("Thursday");
        break;
    case '5':
        console.log("Friday");
        break;
    case '6':
        console.log("Saturday");
        break;
    case '7':
        console.log("Sunday");
        break;
    default:
        console.log("Invalid input. Please enter a number between 1 and 7.");
}

// 29. Seasons of the year
let monthNumber = prompt("Enter a month number (1-12):");
switch (monthNumber) {
    case '12':
    case '1':
    case '2':
        console.log("Winter");
        break;
    case '3':
    case '4':
    case '5':
        console.log("Spring");
        break;
    case '6':
    case '7':
    case '8':
        console.log("Summer");
        break;
    case '9':
    case '10':
    case '11':
        console.log("Autumn");
        break;
    default:
        console.log("Invalid month number. Please enter a number between 1 and 12.");
}

// 39. Numbers through while (condition)
let count = 1;
let numbersOutput = "";
while (count <= 10) {
    numbersOutput += count + " ";
    count++;
}
console.log(numbersOutput.trim());

// 46. The rectangle area
let length = parseFloat(prompt("Enter the length of the rectangle:"));
let width = parseFloat(prompt("Enter the width of the rectangle:"));
let rectangleArea = length * width;
console.log("The area of the rectangle is " + rectangleArea);

// 49. All pair of numbers that give 10 when summed
let pairsOutput = "";
for (let i = 1; i < 10; i++) {
    let complement = 10 - i;
    pairsOutput += "(" + i + ", " + complement + ") ";
}
console.log("Pairs of numbers that sum to 10: " + pairsOutput.trim());

// 50. Star pattern
for(let i=1; i<=5; i++) {
    console.log("*".repeat(i));
}


check = " ";
if (check.trim() === "") {
    console.log("The string contains only whitespace characters.");
}
else {
    console.log("The string contains non-whitespace characters.");
}


let name = prompt("Enter your name:");
let surname = prompt("Enter your surname:");
alert(`Hello, ${name} ${surname}!`);