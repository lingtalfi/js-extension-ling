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

console.log(jsx.str_contains("hello world", "orl")); // true
console.log(jsx.str_contains("hello world", "Orl")); // false
console.log(jsx.str_contains("hello world", "blue")); // false
console.log(jsx.isEmptyObject({})); // true
console.log(jsx.isEmptyObject({"do": "123"})); // false
console.log(jsx.url_merge_params("/my/url", {
    name: "boris",
    age: 42,
    hobbies: ["judo", "karate"],
    fish: {
        small: "john",
        big: "alice",
    },
})); // /my/url?name=boris&age=42&hobbies%5B0%5D=judo&hobbies%5B1%5D=karate&fish%5Bsmall%5D=john&fish%5Bbig%5D=alice

console.log(jsx.url_merge_params("/my/url", {
    name: "boris",
    age: 42,
    hobbies: ["judo", "karate"],
    fish: {
        small: "john",
        big: "alice",
    },
}, false)); // /my/url?name=boris&age=42&hobbies[0]=judo&hobbies[1]=karate&fish[small]=john&fish[big]=alice

console.log(jsx.url_merge_params("/my/url?a=1", {name: "boris"})); // /my/url?a=1&name=boris



console.log(jsx.objectToQueryString({
    name: "boris",
    age: 42,
    hobbies: ["judo", "karate"],
    fish: {
        small: "john",
        big: "alice",
    },
})); // name=boris&age=42&hobbies[0]=judo&hobbies[1]=karate&fish[small]=john&fish[big]=alice

console.log(jsx.objectToQueryString({
    name: "boris",
    age: 42,
    hobbies: ["judo", "karate"],
    fish: {
        small: "john",
        big: "alice",
    },
}, true)); // name=boris&age=42&hobbies%5B0%5D=judo&hobbies%5B1%5D=karate&fish%5Bsmall%5D=john&fish%5Bbig%5D=alice

console.log(jsx.objectToQueryString({name: "boris"})); // name=boris

