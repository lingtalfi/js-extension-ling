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




getFileExtension
----------
2020-04-03

Returns the file extension of the given path.


Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.getFileExtension("index.html")); // html
console.log(jsx.getFileExtension("index.coffee.md")); // md
console.log(jsx.getFileExtension("index.")); // <emptyString>
console.log(jsx.getFileExtension("index")); // <emptyString>
console.log(jsx.getFileExtension(".index")); // index
console.log(jsx.getFileExtension(".index.md")); // md
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



objectToQueryString
----------
2020-04-03

Builds and returns the query string from the given parameter object (nesting is supported).

The optional encodeParams boolean parameter defaults to false, and allows you to encode
the result as an uri component (encodeURIComponent).


Example:

```js
const jsx = require("js-extension-ling");
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
```



post
----------
2020-04-03

An asynchronous wrapper around fetch that posts data so that you can access them via $_POST, $_FILES (and $_GET) in a php server.

It accepts two arguments:

- url
- payload


The payload argument can be many things:

- a js FormData
- a plain object (aka map) containing key/value pairs (will be passed via POST).
- a mixed object containing the following properties (all 3 must be declared, even if empty):
     - post: the map to send to $_POST
     - get: the map to send to $_GET
     - files: the map to send to $_FILES, it's a map of name => File (js object)



Example:

```js
const jsx = require("js-extension-ling");




async function callService(params) {
    var response = await jsx.post("/some-service.php", params).catch(data => {
        console.log( "An error occurred with the request.", data); // throw an error...
    });

    if (true === response.ok) {
        return await response.json();
    } else {
        console.log("The server status code was " + response.status); // throw an error...
    }

}
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





url_merge_params
----------
2020-04-03

Combines the given url with the given url params and returns the result (nesting of params is supported).
The third argument encodeParams defaults to true, and defines whether to encode the components using the encodeURIComponent js function.



Example:

```js
const jsx = require("js-extension-ling");
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


```









History Log
=============

- 1.10.0 -- 2020-04-03

    - add getFileExtension function, fix post wrong inner references
    
- 1.9.0 -- 2020-04-03

    - add post function
    
- 1.8.0 -- 2020-04-03

    - add objectToQueryString and url_merge_params functions
    
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