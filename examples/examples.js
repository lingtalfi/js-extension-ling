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

console.log(jsx.getFileExtension("index.html")); // html
console.log(jsx.getFileExtension("index.coffee.md")); // md
console.log(jsx.getFileExtension("index.")); // <emptyString>
console.log(jsx.getFileExtension("index")); // <emptyString>
console.log(jsx.getFileExtension(".index")); // index
console.log(jsx.getFileExtension(".index.md")); // md


var testArray = new Array();
testArray[3] = "qwerty";
testArray[7] = "asdfgh";
testArray[13] = "zxcvbn";
console.log(jsx.reindex(testArray)); // [ 'qwerty', 'asdfgh', 'zxcvbn' ]
console.log(jsx.basename("/")); // <emptyString>
console.log(jsx.basename("/hello")); // hello
console.log(jsx.basename("/hello/world")); // world
console.log(jsx.basename("/hello/world.com")); // world.com
console.log(jsx.basename("/hello/world.com.net")); // world.com.net

console.log(jsx.basename("/", false)); // <emptyString>
console.log(jsx.basename("/hello", false)); // hello
console.log(jsx.basename("/hello/world", false)); // world
console.log(jsx.basename("/hello/world.com", false)); // world
console.log(jsx.basename("/hello/world.com.net", false)); // world.com



console.log(jsx.dirname("/etc/passwd")); // /etc
console.log(jsx.dirname("c:/Temp/x")); // c:/Temp
console.log(jsx.dirname("/dir/test/")); // /dir
console.log(jsx.dirname("top")); // top
console.log(jsx.dirname("autumn/top///")); // autumn/top


console.log(jsx.arrayKeyExists("name", {"name": "paul"})); // true
console.log(jsx.arrayKeyExists("age", {"name": "paul"})); // false
console.log(jsx.arrayKeyExists(1, ["paul"])); // false
console.log(jsx.arrayKeyExists(1, ["paul", "alice"])); // true
console.log(jsx.inArray("paul", ["paul", "alice"])); // true
console.log(jsx.inArray("boris", ["paul", "alice"])); // false
console.log(jsx.getRandomNumber(1, 4)); // 3
console.log(jsx.getRandomNumber(1, 4)); // 1

console.log(jsx.toBool(false)); // false
console.log(jsx.toBool(true)); // true
console.log(jsx.toBool(1)); // true
console.log(jsx.toBool(0)); // false
console.log(jsx.toBool(200)); // true
console.log(jsx.toBool("anystring")); // true
console.log(jsx.toBool("")); // false
console.log(jsx.toBool("false")); // true
console.log(jsx.toBool("true")); // true


console.log(jsx.toInt("")); // 0
console.log(jsx.toInt("123")); // 123
console.log(jsx.toInt("123W")); // 123
console.log(jsx.toInt("W123")); // 0
console.log(jsx.toInt(".123")); // 0
console.log(jsx.toInt("test")); // 0
console.log(jsx.toInt(false)); // 0
console.log(jsx.toInt(true)); // 1
console.log(jsx.toInt([])); // 0
console.log(jsx.toInt(["dd"])); // 0
console.log(jsx.toInt({})); // 0
console.log(jsx.toInt({a: 11})); // 0

testArray = ["one", "two", "three"];
delete testArray[1];
console.log(testArray); // [ 'one', <1 empty item>, 'three' ]

testArray = ["one", "two", "three"];
jsx.removeEntryByIndex(testArray, 1);
console.log(testArray); // [ 'one', 'three' ]


console.log(jsx.cssId()); // jsx-794194



console.log(jsx.compareObjects({},{})); // true
console.log(jsx.compareObjects({a:1,b:2},{a:1,b:2})); // true
console.log(jsx.compareObjects({a:1,b:2},{b:2,a:1})); // true
console.log(jsx.compareObjects({a:1,b:2},{a:1,b:3})); // false
console.log(jsx.compareObjects({a:1,b:2},{a:1})); // false

