// 1–30. ЛЁГКИЕ ЗАДАЧИ

console.log("Hello World");                        // 1

let name = "Kara";
console.log(name);                                 // 2

let a = 7, b = 4;
console.log(a + b);                                // 3
console.log(a - b);                                // 4
console.log(a * b);                                // 5
console.log(a / b);                                // 6
console.log(a % b);                                // 7

let num = 8;
console.log(num % 2 === 0 ? "чётное" : "нечётное"); // 8

let x = 15, y = 23;
console.log(Math.max(x, y));                       // 9

let p = 5, q = 12, r = 8;
console.log(Math.min(p, Math.min(q, r)));          // 10

let strNum = "45";
console.log(Number(strNum));                       // 11

let text = "Привет, как дела?";
console.log(text.length);                          // 12
console.log(text[text.length - 1]);                // 13
console.log(text.toUpperCase());                   // 14
console.log(text.includes("как"));                 // 15

let hello = "Привет";
let world = " мир!";
console.log(hello + world);                        // 16

let numbers = [10, 20, 30, 40, 50];
console.log(numbers[0]);                           // 18
numbers.push(60);                                  // 19
console.log(numbers);
numbers.pop();                                     // 20
console.log(numbers);

for (let i = 0; i < numbers.length; i++) {         // 21
  console.log(numbers[i]);
}

numbers.forEach(n => console.log(n));              // 22

function square(n) { return n * n; }
console.log(square(7));                            // 23

function sumTwo(a, b) { return a + b; }
console.log(sumTwo(6, 8));                         // 24

for (let i = 1; i <= 20; i++) console.log(i);      // 25

let total = 0;
for (let i = 1; i <= 10; i++) total += i;
console.log(total);                                // 26

console.log(10 === 10);                            // 27

console.log(Math.floor(Math.random() * 10) + 1);   // 28

console.log(typeof "строка");                      // 29

const arrowSquare = n => n * n;
console.log(arrowSquare(9));                       // 30

// 31–60. СРЕДНИЕ ЗАДАЧИ

let arr = [4, 11, 7, 2, 9, 5];
console.log(arr.reduce((a, b) => a + b, 0));       // 31

console.log(arr.reduce((a, b) => a + b, 0) / arr.length); // 32

console.log(Math.max(...arr));                     // 33
console.log(Math.min(...arr));                     // 34

let word = "javascript";
console.log(word.split("").reverse().join(""));    // 35

function isPalindrome(str) {
  const s = str.toLowerCase().replace(/[^a-zа-я0-9]/g, "");
  return s === s.split("").reverse().join("");
}
console.log(isPalindrome("А роза упала на лапу Азора")); // 36
console.log(isPalindrome("hello"));                    // 36

let withDups = [1, 2, 2, 3, 4, 4, 5];
console.log([...new Set(withDups)]);                   // 37

let unsorted = [64, 34, 25, 12, 22, 11, 90];
console.log([...unsorted].sort((a, b) => a - b));      // 38
console.log([...unsorted].sort((a, b) => b - a));      // 39

function countVowels(str) {
  const vowels = /[аеёиоуыэюяaeiouy]/gi;
  return (str.match(vowels) || []).length;
}
console.log(countVowels("Привет, как дела?"));         // 40

console.log("Сколько слов тут есть".split(/\s+/).length); // 41

let sentence = "это тестовая строка";
console.log(sentence.replace(/\s+/g, "-"));            // 42

function factorial(n) {
  if (n < 0) return "отрицательное число";
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(6));                             // 43

function fib(n) {
  if (n < 0) return "отрицательное";
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
console.log(fib(8));                                   // 44 (итеративно — лучше)

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
console.log(isPrime(17));                              // 45

let mixed = [1, -2, 3, -4, 5, 0];
console.log(mixed.filter(n => n % 2 === 0));           // 46
console.log(mixed.map(n => n * 2));                    // 47
console.log(arr.reduce((a, b) => a + b, 0));           // 48
console.log(arr.every(n => n > 0));                    // 49
console.log(mixed.some(n => n < 0));                   // 50

let arr1 = [1, 2, 3, 4];
let arr2 = [3, 4, 5, 6];
console.log(arr1.filter(x => arr2.includes(x)));       // 51
console.log(arr1.filter(x => !arr2.includes(x)));      // 52

let obj = { a: 1, b: 2 };
let copy = { ...obj };                                 // 53
console.log(copy);

let objA = { x: 10, y: 20 };
let objB = { y: 30, z: 40 };
console.log({ ...objA, ...objB });                     // 54

let { x: xFromObj, z } = { ...objA, ...objB };
console.log(xFromObj, z);                              // 55

let spreadExample = [1, 2, 3];
console.log([...spreadExample, 4, 5]);                 // 56

function printAll(...args) {
  console.log(args);
}
printAll(1, "hi", true);                               // 57

function calculator(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b !== 0 ? a / b : "Деление на 0";
    default:  return "Неизвестная операция";
  }
}
console.log(calculator(10, 4, "*"));                   // 58

setTimeout(() => console.log("Через 2 секунды"), 2000); // 59

// let id = setInterval(() => console.log("тик"), 1000);
// setTimeout(() => clearInterval(id), 5000);          // 60 (раскомментировать при тесте)

// 61–90. СЛОЖНЫЕ ЗАДАЧИ (базовые реализации)

function myMap(arr, fn) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(fn(arr[i], i, arr));
  }
  return res;
}
console.log(myMap([1,2,3], n => n * 10));              // 61

function myFilter(arr, fn) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) res.push(arr[i]);
  }
  return res;
}
console.log(myFilter([-3, -1, 0, 2, 4], n => n > 0));  // 62

function myReduce(arr, fn, initial) {
  let acc = initial;
  for (let i = 0; i < arr.length; i++) {
    acc = fn(acc, arr[i], i, arr);
  }
  return acc;
}
console.log(myReduce([1,2,3,4], (a,b)=>a+b, 0));       // 63

