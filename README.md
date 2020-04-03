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









History Log
=============

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