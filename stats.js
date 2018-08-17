const links = require('./path.js');
exports.stats = (path) => {
    links.filterMarkdownFile(path, function (result) {
        console.log('algo');
        for (let i = 0; i < result.length; i++) {
            if (result[i] != '*' && result[i] != '#') {
                for (let j = i++; j < result.length; j++) {
                    let linkExpression = /(https?:\/\/[^\s]+)/g;
                    let regexLink = new RegExp(linkExpression);
                    let link = result[i].match(regexLink);
                    if (i == j) {
                        console.log(link + 'son iguales');
                    }
                }
            };
        }
    })
}