const links = require('./path.js');
const request = require('request');
exports.validate = (path) => {
    links.filterMarkdownFile(path, function (result) {
        for (let i = 0; i < result.length; i++) {
            if (result[i] != '*' && result[i] != '#') {
                let linkExpression = /(https?:\/\/[^\s]+)/g;
                let regexLink = new RegExp(linkExpression);
                let link = result[i].match(regexLink);
                
                request(link.toString().replace(')',''), function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                    console.log(link.toString().replace(')','')+'válido')
                  }
                  else{yyy
                      console.log(link.toString().replace(')','')+'no')
                  }
                })
            }
        }
    })
}