Js extension ling
===========
2020-04-02 -> 2020-04-20

A js helper library.



Install
=======

```js
npm install js-extension-ling
```




Functions summary
===========

* [arrayKeyExists](#arraykeyexists)
* [b64toBlob](#b64toblob)
* [basename](#basename)
* [compareBlobs](#compareblobs)
* [dirname](#dirname)
* [escapeHtml](#escapehtml)
* [extend](#extend)
* [fetchBlob](#fetchblob)
* [fetchJson](#fetchjson)
* [getFileExtension](#getfileextension)
* [getRandomNumber](#getrandomnumber)
* [humanSize](#humansize)
* [inArray](#inarray)
* [isArray](#isarray)
* [isEmptyObject](#isemptyobject)
* [isFunction](#isfunction)
* [isPlainObject](#isplainobject)
* [mimeIsImage](#mimeisimage)
* [objectToQueryString](#objecttoquerystring)
* [post](#post)
* [reindex](#reindex)
* [startsWith](#startswith)
* [str_contains](#str_contains)
* [toBool](#tobool)
* [toFormData](#toformdata)
* [toInt](#toint)
* [uploadFileProgress](#uploadfileprogress)
* [url_merge_params](#url_merge_params)





arrayKeyExists
----------
2020-04-06

Returns whether the given key is part a key of the given object.

Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.arrayKeyExists("name", {"name": "paul"})); // true
console.log(jsx.arrayKeyExists("age", {"name": "paul"})); // false
console.log(jsx.arrayKeyExists(1, ["paul"])); // false
console.log(jsx.arrayKeyExists(1, ["paul", "alice"])); // true
```


b64toBlob
----------
2020-04-06

Returns a blob from a base64 encoded string.

Example: see the **uploadFileProgress** method for a concrete example.




basename
----------
2020-04-03 -> 2020-04-09

Returns the last of the (forward) slash separated components in the given path.

The second argument (returnExtension) is set to true by default. If set to false, it returns the basename
without the last file extension (if any).


Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.basename("/")); // <emptyString>
console.log(jsx.basename("/hello")); // hello
console.log(jsx.basename("/hello/world")); // world
console.log(jsx.basename("/hello/world.com")); // world.com

console.log(jsx.basename("/", false)); // <emptyString>
console.log(jsx.basename("/hello", false)); // hello
console.log(jsx.basename("/hello/world", false)); // world
console.log(jsx.basename("/hello/world.com", false)); // world
console.log(jsx.basename("/hello/world.com.net", false)); // world.com
```


compareBlobs
----------
2020-04-09

Compares whether the two given blobs are identical.
For performances reasons, the size is used by default if the blob size
is more than 1M (set useTrick argument to false to do byte by byte 
comparison).


Example:

```js
const jsx = require("js-extension-ling");

async function go() {
    let url = "/tmp/00076.MTS";
    let url2 = "/tmp/00077.MTS";
    let response = await fetch(url);
    let response2 = await fetch(url2);


    let blob = await response.blob();
    let blob2 = await response2.blob();
    let res = await jsx.compareBlobs(blob, blob2);

    console.log(res); // true if the blobs are the same (i.e. 76 is a copy of 77 in my example), false otherwise
}

go();
```

dirname
----------
2020-04-03

Returns the directory name of the given path.

Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.dirname("/etc/passwd")); // /etc
console.log(jsx.dirname("c:/Temp/x")); // c:/Temp
console.log(jsx.dirname("/dir/test/")); // /dir
console.log(jsx.dirname("top")); // top
console.log(jsx.dirname("autumn/top///")); // autumn/top
```


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




fetchBlob
----------
2020-04-10

Returns a promise resolving to a blob.
Throws an exception if either:
- there is a network error
- the http status is not ok (ie. fetch response.ok=false)
- the blob could not be created correctly

Example:

```js
const jsx = require("js-extension-ling");
async function go() {
    let blob = await jsx.getBlob("https://someurl.com");
    console.log(blob);
}
go();
```


fetchJson
----------
2020-04-10

Returns a promise resolving to a blob.
Throws an exception if either:
- there is a network error
- the http status is not ok (ie. fetch response.ok=false)
- the json data could not be retrieved correctly

Example:

```js
const jsx = require("js-extension-ling");
async function go() {
    let json = await jsx.getJson("https://someurl.com");
    console.log(json);
}
go();
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



getRandomNumber
----------
2020-04-08

Returns a random number between the given min and max (both included).


Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.getRandomNumber(1, 4)); // 3
console.log(jsx.getRandomNumber(1, 4)); // 1
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




inArray
----------
2020-04-06

Returns whether the given string is an element of the given array.

Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.inArray("paul", ["paul", "alice"])); // true
console.log(jsx.inArray("boris", ["paul", "alice"])); // false
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



reindex
----------
2020-04-03

Re-indexes the given array, starting from index 0 and removing undefined items.

Example:

```js
const jsx = require("js-extension-ling");
var testArray = new Array();
testArray[3] = "qwerty";
testArray[7] = "asdfgh";
testArray[13] = "zxcvbn";
console.log(jsx.reindex(testArray)); // [ 'qwerty', 'asdfgh', 'zxcvbn' ]
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


toBool
----------
2020-04-08

Returns the boolean version of the given thing. 

Example:

```js
const jsx = require("js-extension-ling");
console.log(jsx.toBool(false)); // false
console.log(jsx.toBool(true)); // true
console.log(jsx.toBool(1)); // true
console.log(jsx.toBool(0)); // false
console.log(jsx.toBool(200)); // true
console.log(jsx.toBool("anystring")); // true
console.log(jsx.toBool("")); // false
console.log(jsx.toBool("false")); // true
console.log(jsx.toBool("true")); // true
```




toFormData
----------
2020-04-20

Appends all the object properties recursively to a new FormData instance
(or you can provide yours) and returns the form data. 

This only work in a web environment (i.e. FormData object must exist).

Example:

```js
const jsx = require("js-extension-ling");
let data = {
    name: 'John',
    age: 30,
    colors: ['red', 'green', 'blue', {others: ["purple", "orange"]}],
    children: [
        {name: 'Max', age: 3},
        {
            name: 'Madonna', age: 10, car: {
                type: "sonovex",
                color: "black",
            }
        },
    ],
};


let formData = jsx.toFormData(data);
new Response(formData).text().then(console.log); // weird trick to visualize form data
```

Will output something like this:

```http
-----------------------------18415226835494593972830870492
Content-Disposition: form-data; name="name"
John
-----------------------------18415226835494593972830870492
Content-Disposition: form-data; name="age"
30
-----------------------------18415226835494593972830870492
Content-Disposition: form-data; name="colors[0]"
red
-----------------------------18415226835494593972830870492
Content-Disposition: form-data; name="colors[1]"
green
-----------------------------18415226835494593972830870492
Content-Disposition: form-data; name="colors[2]"
blue
-----------------------------18415226835494593972830870492
Content-Disposition: form-data; name="colors[3][others][0]"
purple
-----------------------------18415226835494593972830870492
Content-Disposition: form-data; name="colors[3][others][1]"
orange
-----------------------------18415226835494593972830870492
Content-Disposition: form-data; name="children[0][name]"
Max
-----------------------------18415226835494593972830870492
Content-Disposition: form-data; name="children[0][age]"
3
-----------------------------18415226835494593972830870492
Content-Disposition: form-data; name="children[1][name]"
Madonna
-----------------------------18415226835494593972830870492
Content-Disposition: form-data; name="children[1][age]"
10
-----------------------------18415226835494593972830870492
Content-Disposition: form-data; name="children[1][car][type]"
sonovex
-----------------------------18415226835494593972830870492
Content-Disposition: form-data; name="children[1][car][color]"
black
-----------------------------18415226835494593972830870492--
```




toInt
----------
2020-04-09

Returns the integer version of the given thing. 

Example:

```js
const jsx = require("js-extension-ling");
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
```



uploadFileProgress
----------
2020-04-06 -> 2020-04-07

Uploads a file and tracks the upload progress.

Example (using a context with jquery available):

```js
const jsx = require("js-extension-ling");
$(document).ready(function () {


    var jImage = $('#theimage');
    var jInput = $('#theinput');


    jInput.on("change", async function (e) {

        let data = {
            firstName: "paul",
            file: this.files[0],
        };

        var ajax = await jsx.uploadFileProgress("/test-server.php", data, (e, percent, loaded, total) => {
            console.log("file uploading", percent);
        }, _ajax => {
            // decorate your ajax object here if necessary... below is just fictional use of this decorator function 
              _ajax.overrideMimeType("application/json"); 
             // _ajax.responseType = 'blob'; 
         });


        /**
         * Note: in this case the server responds with a json response, and the file property of the response
         * contains the file binary data encoded in base64 (otherwise it could break the json string).
         */
        let jsonResponse = JSON.parse(ajax.response);
        var blob = jsx.b64toBlob(jsonResponse.file);
        var url = URL.createObjectURL(blob);


        setTimeout(() => {

            console.log(blob);
            console.log(url);

            jImage.attr('src', url);
        }, 2000);


    });
});
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

- 1.24.0 -- 2020-04-20

    - add toFormData function
    
- 1.23.0 -- 2020-04-10

    - update fetchBlob and fetchJson functions, add fetchInit parameter
    
- 1.22.0 -- 2020-04-10

    - add fetchBlob and fetchJson functions
    
- 1.21.0 -- 2020-04-09

    - add compareBlobs function
    
- 1.20.0 -- 2020-04-09

    - add toInt function
    
- 1.19.0 -- 2020-04-09

    - update basename function now accepts returnExtension argument
    
- 1.18.0 -- 2020-04-08

    - add toBool function
    
- 1.17.0 -- 2020-04-08

    - add getRandomNumber function
    
- 1.16.0 -- 2020-04-07

    - update uploadFileProgress function now has decorator argument
    
- 1.15.0 -- 2020-04-06

    - update uploadFileProgress function to work with async/await
    
- 1.14.0 -- 2020-04-06

    - add b64toBlob and uploadFileProgress functions
    
- 1.13.0 -- 2020-04-06

    - add arrayKeyExists and inArray functions
    
- 1.12.0 -- 2020-04-03

    - add basename and dirname functions
    
- 1.11.0 -- 2020-04-03

    - add reindex function
    
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