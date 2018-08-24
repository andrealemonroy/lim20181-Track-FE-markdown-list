const validate = require('../lim20181-Track-FE-markdown-list/js/validate');
const stats = require('../lim20181-Track-FE-markdown-list/js/stats');
const links = require('../lim20181-Track-FE-markdown-list/js/path');
const isFileOrDirectory = require('./js/isFile.js');
const toAbsolute = require('./js/validatePath.js');
const [, , ...args] = process.argv;

let pathAbsolute=toAbsolute.pathToAbsolute(args[0]);
isFileOrDirectory.extension(pathAbsolute);
links.filterMarkdownFile(pathAbsolute);

if (args[1] !== undefined) {
    if (args[1] === '--validate') {
        validate.validate(args[0]);
    };
    if (args[1] === '--stats') {
        stats.stats(args[0]);
    }
}
// console.log(args[1])