const fs = require('fs');

// exports.filterMarkdownFile = (path, callback) => {
//     fs.readFile(path, 'utf8', function (err, content) {
//         const link = /(?:(ftp|http|https)?:\/\/[^\s]+)/g
//         const expression = /(?:__|[*#])|\[(.*?)\]\(.*?\)/gm;
//         const regex = new RegExp(expression);
//         const linkRegex = new RegExp(link);

//         if (typeof content !== 'undefined'){
//             callback(content.match(regex));
//         }
//     })
// }

exports.filterMarkdownFile = (path) => {
 
    return new Promise((resolve, reject) => {

        fs.readFile(path, 'utf8', function (err, content) {

            const link = /(?:(ftp|http|https)?:\/\/[^\s]+)/g
            const expression = /(?:__|[*#])|\[(.*?)\]\(.*?\)/gm;
            const regex = new RegExp(expression);
            const linkRegex = new RegExp(link);
    
            if (typeof content !== 'undefined'){
                resolve(content.match(regex));
            }
        })
    });

}