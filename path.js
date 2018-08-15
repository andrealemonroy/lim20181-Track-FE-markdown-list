const fs = require('fs');
exports.filterMarkdownFile = (path, callback) => {
    fs.readFile(path, 'utf8', function (err, content) {
        const expression = /(?:__|[*#])|\[(.*?)\]\(.*?\)/gm;
        const regex = new RegExp(expression);
        callback(content.match(regex));
    })
    console.log(path);
}
console.log('hola!')