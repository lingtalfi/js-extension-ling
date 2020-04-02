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
        }
        ,
        mimeIsImage: function (mime) {
            if (!mime.match(/^image\//)) {
                return false;
            }
            return true;
        }
    }
;

module.exports = jsx;