// 1 Add students to array
let students = [];
students.push("Karim", "Lara", "Manon");
console.log(`1 Task. \n Students: ${students}`);

// 2 First and last elements
let fruits = ["apple", "banana", "orange"];
console.log(`\n2 Task. \n First fruit: ${fruits[0]}`);
console.log(` Last fruit: ${fruits[fruits.length - 1]}`);

// 3 Replace element at index 1
let nums = [10, 20, 30, 40];
nums[1] = 25;
console.log(`\n3 Task. \n Replaced numbers: ${nums}`);

// 4 Add number to the beginning
let numbers = [2, 3, 4];
numbers.unshift(1);
console.log(`\n4 Task. \n Length: ${numbers.length}`);
console.log(` Numbers: ${numbers}`);

// 5 Delete element at index 2
let arr = [1, 2, 3, 4, 5];
arr.splice(2, 1);
console.log(`\n5 Task. \n Modified array: ${arr}`);

// 6 Sum of array elements w/ for
let sumArr = [1, 2, 3, 4];
let sum = 0;
for (let i = 0; i < sumArr.length; i++) {
    sum += sumArr[i];
}
console.log(`\n6 Task. \n Sum: ${sum}`);

// 7 Max element in array
let nums2 = [5, 12, 7, 20, 3];
let max = nums2[0];
for (let i = 1; i < nums2.length; i++) {
    if (nums2[i] > max) max = nums2[i];
}
console.log(`\n7 Task. \n Max: ${max}`);

// 8 Check for "JS"
let arrStr = ["HTML", "CSS", "JS"];
let found = false;
for (let i = 0; i < arrStr.length; i++) {
    if (arrStr[i] === "JS") found = true;
}
console.log(`\n8 Task. \n Found: ${found}`);

// 9 Copy array and modify w/ for 
let a = [1, 2, 3];
let b = [];
for (let i = 0; i < a.length; i++) b.push(a[i]);
b[0] = 99;
console.log(`\n9 Task. \n Array a: ${a}, Array b: ${b}`);

// 10 Insert the number 99 using splice
let arr3 = [0, 1, 2];
arr3.splice(1, 0, 99);
console.log(`\n10 Task. \n Modified array: ${arr3}`);

// 11 Two dimensional array access
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log(`\n11 Task. \n Element at row 1, column 2: ${matrix[1][2]}`);

// 12 Sum of two dimensional array
let matrix2 = [
    [1, 2],
    [3, 4],
    [5, 6]
];
let totalSum = 0;
for (let i = 0; i < matrix2.length; i++) {
    for (let j = 0; j < matrix2[i].length; j++) {
        totalSum += matrix2[i][j];
    }
}
console.log(`\n12 Task. \n Total sum: ${totalSum}`);

// 13 transpose a matrix
function transpose(matrix) {
    let result = [];

    for (let i = 0; i < matrix[0].length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix.length; j++) {
            result[i][j] = matrix[j][i];
        }
    }
    return result;
}

let m = [
    [1, 2, 3],
    [4, 5, 6]
];

console.log(`\n13 Task. \n Transposed matrix: ${transpose(m)}`);
// [[1,4],[2,5],[3,6]]

// 14 for and while loops
let arr2 = [10, 20, 30];

// for
for (let i = 0; i < arr2.length; i++) {
    console.log(`\n14 Task. \n a) Value at index ${i}: ${arr2[i]}`);
}

// while
let i = 0;
while (i < arr2.length) {
    console.log(`\n14 Task. \n b) Value at index ${i}: ${arr2[i]}`);
    i++;
}

// 15 different loop types

// for
for (let i = 0; i < 3; i++) {
    console.log(`\n15 Task. \n i = ${i}`);
}

// do...while
let j = 0;
do {
    console.log(`\n15 Task. \n j = ${j}`);
    j++;
} while (j < 3);

// 16 break on first negative number
let numbers2 = [3, 5, -2, 8, -1];   
for (let i = 0; i < numbers2.length; i++) {
    if (numbers2[i] < 0) {
        console.log(`\n16 Task. \n First negative number: ${numbers2[i]}`);
        break;
    }
}

// 17 continue to skip even numbers
let nums3 = [1, 2, 3, 4, 5, 6];
console.log(`\n17 Task. \nOdd numbers:`);
for (let i = 0; i < nums3.length; i++) {
    if (nums3[i] % 2 === 0) continue;
    console.log(nums3[i]);
}

// 18 function to find average of array
function average(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}
let nums4 = [10, 20, 30, 40];
console.log(`\n18 Task. \n Average: ${average(nums4)}`);

// 19 func to sum array elements
function sumArray(arr) {
    let total = 0;  
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}
let nums5 = [1, 2, 3, 4, 5];
console.log(`\n19 Task. \n Sum: ${sumArray(nums5)}`);   

// 20 merge two arrays
function mergeArrays(arr1, arr2) {
    let merged = [];
    for (let i = 0; i < arr1.length; i++) {
        merged.push(arr1[i]);
    }
    for (let j = 0; j < arr2.length; j++) {
        merged.push(arr2[j]);
    }
    return merged;
}
let array1 = [62, 0, 3];
let array2 = [9, 5, 21];
console.log(`\n20 Task. \n Merged array: ${mergeArrays(array1, array2)}`);

// 21 sum of arr elements

let nummm = [];
let summ = 0;

for (let i = 0; i < 5; i++) {
    let input = prompt("\n Enter number:");
    let n = Number(input);

    if (isNaN(n)) {
        alert("\n This is not a number! Please try again.");
        i--; // повторить шаг
    } else {
        nummm.push(n);
        summ += n;
    }
}

alert("\nSum of numbers: " + summ);

// 22 confirm + prompt

let proceed = confirm("\n Do you want to enter numbers?");
if (proceed) {
    let numbers = [];
    let total = 0;  
    while (true) {
        let input = prompt("\n Enter a number (or Cancel to finish):");
        if (input === null) break;
        let num = Number(input);
        if (isNaN(num)) {
            alert("\n This is not a number! Please try again.");
            continue;
        }
        numbers.push(num);
        total += num;
    }
    alert("\n You entered: " + numbers.join(", ") + "\n Sum: " + total);
} else {
    alert("\n Operation cancelled.");
}   
