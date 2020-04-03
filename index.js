var jsx = {


    basename: function (path) {
        return path.split(/[\\/]/).pop();
    },

    // adapted from https://locutus.io/php/filesystem/dirname/
    dirname: function (path) {
        var ret = path.replace(/\\/g, '/').replace(/\/[^/]*\/?$/, '');
        if ('/' === ret.charAt(ret.length - 1)) {
            ret = ret.substr(0, ret.length - 1);
        }
        return ret;
    },

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


    // adapted from https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
    extend: function () {


        // Variables
        var extended = {};
        var deep = false;
        var i = 0;
        var length = arguments.length;

        // Check if a deep merge
        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0];
            i++;
        }

        // Merge the object into the extended object
        var merge = obj => {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    // If deep merge and property is an object, merge properties
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = this.extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        // Loop through each object and conduct a merge
        for (; i < length; i++) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;
    },


    getFileExtension: function (path) {
        if (false === this.str_contains(path, ".")) {
            return "";
        }
        return path.split('.').pop();
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


    // https://code.jquery.com/jquery-3.4.1.js
    isEmptyObject: function (obj) {
        var name;
        for (name in obj) {
            return false;
        }
        return true;
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
    objectToQueryString: function (obj, encodeParams) {
        return this._serialize(obj, encodeParams);
    },

    /**
     * An asynchronous wrapper around fetch that posts data so that you can access them via $_POST, $_FILES (and $_GET) in a php server.
     *
     * The payload argument can be many things:
     *
     * - a js FormData
     * - a plain object (aka map) containing key/value pairs (will be passed via POST).
     * - a mixed object containing the following properties (all 3 must be declared, even if empty):
     *      - post: the map to send to $_POST
     *      - get: the map to send to $_GET
     *      - files: the map to send to $_FILES, it's a map of name => File (js object)
     *
     *
     *
     * @param url
     * @param payload
     * @returns {Promise<Response>}
     */
    async post(url, payload) {


        var body = null;
        if (payload instanceof FormData) {
            body = payload;
        } else if (this.isPlainObject(payload)) {

            if (
                true === payload.hasOwnProperty("post") &&
                true === payload.hasOwnProperty("get") &&
                true === payload.hasOwnProperty("files")
            ) {

                var post = payload.post;
                var get = payload.get;
                var files = payload.files;

                if (false === this.isEmptyObject(get)) {
                    url = this.url_merge_params(url, get);
                }

                body = new FormData();
                for (let i in post) {
                    body.append(i, post[i]);
                }
                for (let i in files) {
                    body.append(i, files[i]);
                }

            } else {
                body = new FormData();
                for (let i in payload) {
                    body.append(i, payload[i]);
                }
            }
        } else {
            console.error(payload);
            throw new Error("Unknown payload case.");
        }


        return await fetch(url, {
            method: "POST",
            body: body,
        });
    },


    // https://stackoverflow.com/questions/4759745/javascript-reindexing-an-array
    reindex: function (array) {
        return array.filter(function (item) {
            return item !== undefined
        });
    },

    startsWith: function (haystack, needle) {
        return haystack.substring(0, needle.length) === needle;
    },


    str_contains: function (haystack, needle) {
        return haystack.indexOf(needle) !== -1;
    },

    url_merge_params: function (url, params, encodeParams = true) {
        var q = this.objectToQueryString(params, encodeParams);

        if (false === this.str_contains(url, "?")) {
            url += '?';
        } else {
            url += '&';
        }
        url += q;
        return url;
    },


    //----------------------------------------
    // PRIVATE
    //----------------------------------------
    // adaoted from https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
    _serialize: function (obj, useEncoder, prefix) {
        var str = [],
            p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];

                if (v !== null && typeof v === "object") {
                    str.push(this._serialize(v, useEncoder, k));
                } else {
                    if (true === useEncoder) {
                        str.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
                    } else {
                        str.push(k + "=" + v);
                    }
                }
            }
        }
        return str.join("&");
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