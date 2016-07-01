const fs = require('fs');

/**
 * Dummy function to get file size
 * @param file
 * @param cb
 */
var asyncFetchFileSize = function (file, cb) {
    console.log("Get file size: " + file);
    fs.stat(file, (err, stats) => cb(stats.size));
};

/**
 * Original function
 * @param files
 * @param cb
 */
this.getFileSize = function (files, cb) {
    var minV = -1;
    var minN = null;
    var c = 0;
    files.forEach(function (name) {
        if (name.match(/\.js$/, name)) {
            asyncFetchFileSize(name, function (size) {
                if (!minN || size < minV) {
                    minV = size;
                    minN = name;
                }
                if (++c == files.length) cb(minN);
            });
        } else if (++c == files.length) cb(minN);
    });
    if (!files.length) cb(null);
};

/**
 * Provide to the callback function the lowest by size JS file
 *
 * @param files File array to iterate on
 * @param cb The callback function
 */
this.getLowestJSFile = function (files, cb) {

    /**
     * Filter the file list with JS files
     */
    var jsFiles = files.filter((element, index, array) => {
        return element.match(/\.js$/, element);
    });

    /**
     * If no relevant files exit
     */
    if (!jsFiles.length) {
        return cb(null);
    }

    /**
     * Create an array with all filename and file size
     * Then perform a reduce to get the lowest one to call the callback on
     */
    Promise.all(
        jsFiles.map(file => new Promise((resolve, reject) => {
            asyncFetchFileSize(file, (size) => {
                resolve({file, size})
            })
        })))
        .then(files => {
            cb(files.reduce((acc, file) => file.size < acc.size ? file : acc, {file: null, size: Infinity}).file);
        });
};

/**
 * Execute to test
 */
this.getLowestJSFile(['test2.js', 'test3.html', 'test1/app/models/application.js', 'test1/app/models/opportunity.js'], fileName => {
    console.log('Result: ' + fileName)
});

