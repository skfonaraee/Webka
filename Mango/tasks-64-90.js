// 64–90 — все функции + тестовые вызовы
// (можно сохранить как tasks-64-90.js и запускать node tasks-64-90.js)

console.log("=== 64–90 ЗАДАЧИ С ПРИМЕРАМИ ВЫПОЛНЕНИЯ ===\n");

// 64. debounce
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

console.log("64. debounce (посмотри в консоль через 300 мс)");
const debouncedLog = debounce((msg) => console.log("debounced:", msg), 300);
debouncedLog("первый");
debouncedLog("второй");
debouncedLog("третий");   // только это должно вывестись

// 65. throttle (простая версия)
function throttle(fn, limit) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= limit) {
      last = now;
      fn(...args);
    }
  };
}

console.log("\n65. throttle (будет вывод каждые ~500 мс)");
const throttledLog = throttle((n) => console.log("throttled:", n), 500);
for (let i = 1; i <= 12; i++) {
  throttledLog(i);
}

// 66. deepCopy (простой вариант через JSON)
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

console.log("\n66. deepCopy");
const original = { a: 1, b: { c: [2,3] } };
const copy = deepCopy(original);
copy.b.c.push(4);
console.log("оригинал после изменения копии:", original);   // не изменился

// 67. deepEqual
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) return false;
  
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  
  for (let key of keysA) {
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}

console.log("\n67. deepEqual");
console.log(deepEqual({a:1, b:{c:2}}, {a:1, b:{c:2}}));     // true
console.log(deepEqual({a:1}, {a:1, b:2}));                  // false

// 68. myBind
Function.prototype.myBind = function (ctx, ...boundArgs) {
  const fn = this;
  return function (...args) {
    return fn.apply(ctx, [...boundArgs, ...args]);
  };
};

console.log("\n68. myBind");
const person = { name: "Аня" };
function sayHello(greeting) {
  console.log(`${greeting}, меня зовут ${this.name}`);
}
const boundHello = sayHello.myBind(person, "Привет");
boundHello();   // Привет, меня зовут Аня

// 69. myCall
Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx || globalThis;
  const key = Symbol();
  ctx[key] = this;
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};

console.log("\n69. myCall");
function greet(msg) {
  console.log(`${msg}, ${this.name}`);
}
greet.myCall({ name: "Дима" }, "Здравствуй");   // Здравствуй, Дима

// 71. Stack
class Stack {
  constructor() { this.data = []; }
  push(v) { this.data.push(v); }
  pop() { return this.data.pop(); }
  peek() { return this.data[this.data.length-1]; }
  isEmpty() { return this.data.length === 0; }
}

console.log("\n71. Stack");
const stack = new Stack();
stack.push(10); stack.push(20); stack.push(30);
console.log("peek:", stack.peek());     // 30
console.log("pop:", stack.pop());       // 30
console.log("pop:", stack.pop());       // 20

// 72. Queue
class Queue {
  constructor() { this.data = []; }
  enqueue(v) { this.data.push(v); }
  dequeue() { return this.data.shift(); }
  front() { return this.data[0]; }
  isEmpty() { return this.data.length === 0; }
}

console.log("\n72. Queue");
const q = new Queue();
q.enqueue("A"); q.enqueue("B"); q.enqueue("C");
console.log("front:", q.front());     // A
console.log("dequeue:", q.dequeue()); // A

// 73. LinkedList (самая простая версия)
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  add(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      return;
    }
    let current = this.head;
    while (current.next) current = current.next;
    current.next = node;
  }
  print() {
    let current = this.head;
    const vals = [];
    while (current) {
      vals.push(current.val);
      current = current.next;
    }
    console.log(vals.join(" → "));
  }
}

console.log("\n73. LinkedList");
const list = new LinkedList();
list.add(1); list.add(4); list.add(7); list.add(2);
console.log("список:");
list.print();   // 1 → 4 → 7 → 2

// 74. binarySearch
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

console.log("\n74. binarySearch");
const sorted = [1,3,5,7,9,11,13];
console.log("индекс 7:", binarySearch(sorted, 7));   // 3
console.log("индекс 8:", binarySearch(sorted, 8));   // -1

// 75. bubbleSort
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log("\n75. bubbleSort");
let arr = [64, 34, 25, 12, 22, 11, 90];
console.log("до:", arr.join(", "));
bubbleSort(arr);
console.log("после:", arr.join(", "));

// 84. memoize
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

console.log("\n84. memoize (факториал)");
const memoFact = memoize((n) => {
  console.log(`вычисляю fact(${n})`);
  if (n <= 1) return 1;
  return n * memoFact(n - 1);
});
console.log(memoFact(6));
console.log(memoFact(6));   // уже из кэша, без вычисления

// 85. curry
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
}

console.log("\n85. curry");
const sum3 = (a, b, c) => a + b + c;
const curriedSum = curry(sum3);
console.log(curriedSum(1)(2)(3));        // 6
console.log(curriedSum(10, 20)(5));      // 35

// 86. parseQueryString
function parseQueryString(str) {
  const obj = {};
  if (!str || str === "?") return obj;
  str = str.replace(/^\?/, "");
  str.split("&").forEach(pair => {
    const [k, v = ""] = pair.split("=");
    obj[decodeURIComponent(k)] = decodeURIComponent(v);
  });
  return obj;
}

console.log("\n86. parseQueryString");
console.log(parseQueryString("?name=Кара&age=25&city=Астана"));

// 87. flatten
function flatten(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}

console.log("\n87. flatten");
console.log(flatten([1, [2, [3, 4], 5], [6, [7]]]));   // [1,2,3,4,5,6,7]

console.log("\n=== конец тестов 64–90 ===");