const links = require('./path.js');
const request = require('request');
exports.validate = (path) => {
    links.filterMarkdownFile(path).then(result => {
            for (let i = 0; i < result.length; i++) {
                if (result[i] !== '*' && result[i] !== '#') {
                    let linkExpression = /(?:(ftp|http|https)?:\/\/[^\s]+)/g;
                    let regexLink = new RegExp(linkExpression);
                    let link = result[i].match(regexLink);
                    if (link !== null) {
                        request(link.toString().replace(')', ''), function (error, response) {
                            if (!error && response.statusCode === 200) {
                                console.log(path + ' ' + link.toString() + 'ok'+response.statusCode)
                            } else {
                                console.log(path + ' ' + link.toString() + 'no')
                            }
                        })
                    } else {
                        console.log(result[i] + 'no es link')
                    }
                }
            }
        })

}