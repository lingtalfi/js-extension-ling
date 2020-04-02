const jsx = require("../index.js");



console.log(jsx.humanSize(5000)); // 4.88 KB
console.log(jsx.mimeIsImage("image/jpeg")); // true
console.log(jsx.mimeIsImage("application/javascript")); // false
console.log(jsx.escapeHtml("<h1>ok</h1>")); // &lt;h1&gt;ok&lt;/h1&gt;
console.log(jsx.startsWith("attention please", "attention")); // true
console.log(jsx.startsWith("attention please", "please")); // false

