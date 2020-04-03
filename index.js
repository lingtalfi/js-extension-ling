var jsx = {

    // https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
    escapeHtml: function (text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function (m) {
            return map[m];
        });
    },
    // https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
    humanSize: function (bytes, decimals) {
        if (0 === bytes) {
            return "0 Bytes";
        }
        var c = 1024, d = decimals || 2, e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
            f = Math.floor(Math.log(bytes) / Math.log(c));
        return parseFloat((bytes / Math.pow(c, f)).toFixed(d)) + " " + e[f]
    },


    isArray: function (thing) {
        return '[object Array]' === Object.prototype.toString.call(thing);
    },

    isPlainObject: function (thing) {
        return '[object Object]' === Object.prototype.toString.call(thing);
    },

    isFunction: function (thing) {
        return '[object Function]' === Object.prototype.toString.call(thing);
    },

    mimeIsImage: function (mime) {
        if (!mime.match(/^image\//)) {
            return false;
        }
        return true;
    },
    startsWith: function (haystack, needle) {
        return haystack.substring(0, needle.length) === needle;
    },
    _testTypes: function () {
        // https://ultimatecourses.com/blog/understanding-javascript-types-and-reliable-type-checking

        // last tested in node (v8) and firefox 2020-04-03

        // check from times to times to see if implementation has changed.
        console.log(Object.prototype.toString.call([])); // [object Array]
        console.log(Object.prototype.toString.call({})); // [object Object]
        console.log(Object.prototype.toString.call('')); // [object String]
        console.log(Object.prototype.toString.call(new Date())); // [object Date]
        console.log(Object.prototype.toString.call(1)); // [object Number]
        console.log(Object.prototype.toString.call(function () {
        })); // [object Function]
        console.log(Object.prototype.toString.call(/test/i)); // [object RegExp]
        console.log(Object.prototype.toString.call(true)); // [object Boolean]
        console.log(Object.prototype.toString.call(null)); // [object Null]
        console.log(Object.prototype.toString.call()); // [object Undefined]
    },
};


module.exports = jsx;