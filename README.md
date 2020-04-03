Js extension ling
===========
2020-04-02

A js helper library.



Install
=======

```js
npm install js-extension-ling
```




Functions
===========

escapeHtml
----------
2020-04-02

Returns the html escaped version of the given string.

Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.escapeHtml("<h1>ok</h1>")); // &lt;h1&gt;ok&lt;/h1&gt;
```


extend
----------
2020-04-03

Merges the contents of two or more objects together into the first object.

If the first argument is a boolean, the merging applies recursively.

Example:

```js
const jsx = require("js-extension-ling");
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
```




humanSize
----------
2020-04-02

Converts bytes to human friendly size.

Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.humanSize(5000)); // 4.88 KB
```


isArray
----------
2020-04-03

Returns whether the given parameter is an array.

Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.isArray({"name": "boris"})); // false
console.log(jsx.isArray(["boris"])); // true
console.log(jsx.isArray(function(){})); // false
```


isEmptyObject
----------
2020-04-03

Returns whether the given plain object is empty.

Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.isEmptyObject({})); // true
console.log(jsx.isEmptyObject({"do": "123"})); // false
```



isFunction
----------
2020-04-03

Returns whether the given parameter is a function.

Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.isFunction({"name": "boris"})); // false
console.log(jsx.isFunction(["boris"])); // false
console.log(jsx.isFunction(function(){})); // true
```


isPlainObject
----------
2020-04-03

Returns whether the given parameter is a plain object.

Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.isPlainObject({"name": "boris"})); // true
console.log(jsx.isPlainObject(["boris"])); // false
console.log(jsx.isPlainObject(function(){})); // false
```


mimeIsImage
----------
2020-04-02

Returns whether the given mime type is an image.

Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.mimeIsImage("image/jpeg")); // true
console.log(jsx.mimeIsImage("application/javascript")); // false
```



startsWith
----------
2020-04-02

Returns whether a string starts with another one.

Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.startsWith("attention please", "attention")); // true
console.log(jsx.startsWith("attention please", "please")); // false
```



str_contains
----------
2020-04-03

Returns whether a string contains another. This is case sensitive.

Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.str_contains("hello world", "orl")); // true
console.log(jsx.str_contains("hello world", "Orl")); // false
console.log(jsx.str_contains("hello world", "blue")); // false
```









History Log
=============

- 1.7.0 -- 2020-04-03

    - add isEmptyObject function

- 1.6.0 -- 2020-04-03

    - add str_contains function

- 1.5.0 -- 2020-04-03

    - add extend function
    
- 1.4.0 -- 2020-04-03

    - add isPlainObject, isArray, isFunction functions
    
- 1.3.0 -- 2020-04-02

    - add startsWith function
    
- 1.2.0 -- 2020-04-02

    - add escapeHtml function
    
- 1.1.0 -- 2020-04-02

    - add mimeIsImage function
    
- 1.0.0 -- 2020-04-02

    - initial commit 