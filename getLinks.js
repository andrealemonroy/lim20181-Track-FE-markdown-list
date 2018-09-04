const fs = require('fs');

exports.getLinks = (path) => {
    return new Promise ((resolve, reject) =>{
        fs.readFile(path, 'utf8', (err, content) => {
            const expression = /(?:__|[*#])|\[(.*?)\]\(.*?\)/gm;
            const regex = new RegExp(expression);
            let linkExpression = /(?:(ftp|http|https)?:\/\/[^\s]+)/g;
            let regexLink = new RegExp(linkExpression);
    
            if (typeof content !== 'undefined') {
                let links = content.match(regex);
                let resultFinal = [];
                links.forEach(link=>{
                    if (link !== '*' && link !== '#') {
                        resultFinal.push(link);
                        resolve(resultFinal);
                    }
                })
            }
        })
    })
}