var jsx = {

    arrayKeyExists: function (key, object) {
        return (key in object);
    },


    //https://gist.github.com/jdnichollsc/78a6eb093731cf3e8dfd536dbe4befb3
    b64toBlob: function (b64Data, contentType, sliceSize) {
        contentType = contentType || 'image/png';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    },


    basename: function (path, returnExtension = true) {
        let basename = path.split(/[\\/]/).pop();
        if (false === returnExtension) {
            if (false === this.str_contains(basename, ".")) {
                return basename;
            }
            let p = basename.split('.');
            p.pop();
            return p.join(".");
        }
        return basename;
    },


    compareBlobs: async function (blob1, blob2, useTrick = true) {
        if (blob1.size !== blob2.size) {
            return false;
        }

        /**
         * I use the trick below for performances sake.
         * From my test, comparing a 172M file to itself without the trick took about 8 seconds,
         * which was unacceptable for my needs.
         * So with this trick, the comparison is almost instant.
         *
         *
         * If the size is more than 1M (more than 1 million bytes), then
         * it's likely than no difference in size means no difference in the blob,
         * unless you create some kind of blocks of data that have exactly the same size, in which case this function
         * might not be appropriate for your needs.
         *
         * My original case is a file uploader, I just want to see if the user has uploaded a different file or not.
         *
         *
         *
         */
        if (true === useTrick) {
            if (blob1.size > 1024 * 1024) {
                return true;
            }
        }


        let buffer = await blob1.arrayBuffer();
        let buffer2 = await blob2.arrayBuffer();
        return this._compareBuffers(buffer, buffer2);
    },

    // https://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects
    compareObjects: function (x, y) {

        if (x === null || x === undefined || y === null || y === undefined) {
            return x === y;
        }
        // after this just checking type of one would be enough
        if (x.constructor !== y.constructor) {
            return false;
        }
        // if they are functions, they should exactly refer to same one (because of closures)
        if (x instanceof Function) {
            return x === y;
        }
        // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
        if (x instanceof RegExp) {
            return x === y;
        }
        if (x === y || x.valueOf() === y.valueOf()) {
            return true;
        }
        if (Array.isArray(x) && x.length !== y.length) {
            return false;
        }

        // if they are dates, they must had equal valueOf
        if (x instanceof Date) {
            return false;
        }

        // if they are strictly equal, they both need to be object at least
        if (!(x instanceof Object)) {
            return false;
        }
        if (!(y instanceof Object)) {
            return false;
        }

        // recursive object equality check
        var p = Object.keys(x);
        return Object.keys(y).every((i) => {
                return p.indexOf(i) !== -1;
            }) &&
            p.every((i) => {
                return this.compareObjects(x[i], y[i]);
            });
    },


    cssId: function (prefix = 'jsx') {
        return prefix + '-' + this.getRandomNumber(0, 1000000);
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


    fetchBlob: async function (url, fetchInit = {}) {
        let response = await fetch(url, fetchInit);
        if (false === response.ok) {
            throw new Error(`Unexpected response with status ${response.status}: ${response.statusText}.`);
        }
        return await response.blob();
    },
    fetchJson: async function (url, fetchInit = {}) {
        let response = await fetch(url, fetchInit);
        if (false === response.ok) {
            throw new Error(`Unexpected response with status ${response.status}: ${response.statusText}.`);
        }
        return await response.json();
    },

    getFileExtension: function (path) {
        if (false === this.str_contains(path, ".")) {
            return "";
        }
        return path.split('.').pop();
    },


    getRandomNumber: function (min, max) {
        return Math.floor(Math.random() * max) + min;
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

    inArray: function (needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (needle === haystack[i]) {
                return true;
            }
        }
        return false;
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


    removeEntryByIndex: function (array, index) {
        array.splice(index, 1);
    },

    startsWith: function (haystack, needle) {
        return haystack.substring(0, needle.length) === needle;
    },


    str_contains: function (haystack, needle) {
        return haystack.indexOf(needle) !== -1;
    },


    toBool: function (thing) {
        return !!thing;
    },

    /**
     * Note: this function requires a environment with the FormData object
     * available (i.e. a web browser) to work properly.
     */
    toFormData: function (obj, fd = null) {

        if (null === fd) {
            fd = new FormData();
        }

        // https://stackoverflow.com/questions/22783108/convert-js-object-to-form-data
        let toFormData = (f => f(f))(h => f => f(x => h(h)(f)(x)))(f => fd => pk => d => {
            if (d instanceof Object) {
                Object.keys(d).forEach(k => {
                    const v = d[k]
                    if (pk) k = `${pk}[${k}]`
                    if (v instanceof Object && !(v instanceof Date) && !(v instanceof File)) {
                        return f(fd)(k)(v)
                    } else {
                        fd.append(k, v)
                    }
                })
            }
            return fd
        })(fd)();

        return toFormData(obj);
    },

    toInt: function (thing) {
        if (true === thing) {
            return 1;
        }
        if (false === thing) {
            return 0;
        }
        let res = parseInt(thing);
        if (isNaN(res)) {
            return 0;
        }
        return res;
    },

    /**
     * Note: at the time of writing (2020-04-06), the growing fetch api doesn't have a support
     * for upload progress monitoring yet (at least not that I know of), so this method uses
     * the older XMLHttpRequest api.
     */
    uploadFileProgress: async function (url, data, onProgress, decorator) {


        return new Promise((resolve, reject) => {


            let formdata;

            if (data instanceof FormData) {
                formdata = data;
            } else {
                formdata = new FormData();
                for (let i in data) {
                    formdata.append(i, data[i]);
                }
            }


            var ajax = new XMLHttpRequest();
            // ajax.overrideMimeType("application/json");

            if (this.isFunction(decorator)) {
                decorator(ajax);
            }

            ajax.upload.addEventListener("progress", function (e) {
                var percent = Math.round((e.loaded / e.total) * 100, 2);
                onProgress(e, percent, e.loaded, e.total);
            }, false);


            ajax.addEventListener("load", function (e) {
                e.stopPropagation();
                e.preventDefault();
            }, false);
            ajax.addEventListener("error", function (e) {
                e.stopPropagation();
                e.preventDefault();
                if ("onError" in options) {
                    reject(e);
                }
            }, false);
            ajax.addEventListener("abort", function (e) {
                e.stopPropagation();
                e.preventDefault();
                if ("onAbort" in options) {
                    reject(e);
                }
            }, false);


            ajax.open("POST", url);
            ajax.onreadystatechange = function () {
                if (ajax.readyState === 4) {
                    resolve(ajax);
                }
            };
            ajax.send(formdata);

        });
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
    // adapted from https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
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

    _compareBuffers: function (buf1, buf2) {
        if (buf1 === buf2) {
            return true;
        }
        if (buf1.byteLength !== buf2.byteLength) {
            return false;
        }
        const d1 = new DataView(buf1), d2 = new DataView(buf2);
        var i = buf1.byteLength;
        while (i--) {
            if (d1.getUint8(i) !== d2.getUint8(i)) {
                return false;
            }
        }
        return true;
    },
};


module.exports = jsx;