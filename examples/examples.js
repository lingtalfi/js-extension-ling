const jsx = require("../index.js");


var func = function () {
};

console.log(jsx.humanSize(5000)); // 4.88 KB
console.log(jsx.mimeIsImage("image/jpeg")); // true
console.log(jsx.mimeIsImage("application/javascript")); // false
console.log(jsx.escapeHtml("<h1>ok</h1>")); // &lt;h1&gt;ok&lt;/h1&gt;
console.log(jsx.startsWith("attention please", "attention")); // true
console.log(jsx.startsWith("attention please", "please")); // false

console.log(jsx.isPlainObject({"name": "boris"})); // true
console.log(jsx.isPlainObject(["boris"])); // false
console.log(jsx.isPlainObject(func)); // false
console.log(jsx.isArray({"name": "boris"})); // false
console.log(jsx.isArray(["boris"])); // true
console.log(jsx.isArray(func)); // false
console.log(jsx.isFunction({"name": "boris"})); // false
console.log(jsx.isFunction(["boris"])); // false
console.log(jsx.isFunction(func)); // true

// Example objects
var object1 = {
    apple: 0,
    banana: {weight: 52, price: 100},
    cherry: 97
};
var object2 = {
    banana: {price: 200},
    durian: 100
};
var object3 = {
    apple: 'yum',
    pie: 3.214,
    applePie: true
};

// Create a new object by combining two or more objects
console.log(jsx.extend(object1, object2, object3));
/**
 {
  apple: 'yum',
  banana: { price: 200 },
  cherry: 97,
  durian: 100,
  pie: 3.214,
  applePie: true
}
 */
console.log(jsx.extend(true, object1, object2, object3));
/**
 {
  apple: 'yum',
  banana: { weight: 52, price: 200 },
  cherry: 97,
  durian: 100,
  pie: 3.214,
  applePie: true
}
 */