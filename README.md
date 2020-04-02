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

humanSize
----------
2020-04-02

Converts bytes to human friendly size.

Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.humanSize(5000)); // 4.88 KB
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









History Log
=============

- 1.1.0 -- 2020-04-02

    - add mimeIsImage function
    
- 1.0.0 -- 2020-04-02

    - initial commit 