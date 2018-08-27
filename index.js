const fs = require('fs');
const validate = require('./js/validate.js');
const stats = require('./js/stats.js');
const both = require('./js/linksBoth.js')
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

exports.mdLinks = (path, options) => {

        return new Promise((resolve, reject) => {
                try {
                    fs.readFile(path, 'utf8', function (err, content) {

                        const expression = /(?:__|[*#])|\[(.*?)\]\(.*?\)/gm;
                        const regex = new RegExp(expression);

                        if (typeof content !== 'undefined') {
                            let resultado = content.match(regex);
                            let resultFinal = [];
                            for (let i = 0; i < resultado.length; i++) {
                                if (resultado[i] !== '*' && resultado[i] !== '#') {
                                    resultFinal.push(resultado[i]);
                                }
                            }
                            resultado = resultFinal;
                            if (typeof options !== 'undefined') {
                                if (options.validate) {
                                    validate.validate(path,resultado).then(result => {
                                        console.log(result);
                                    })
                                    .catch(console.error)
                                }
                                if (options.stats) {
                                    stats.stats(resultado).then((result) => {
                                        let unique = result.filter(function(elem, pos) {
                                            return result.indexOf(elem) == pos;
                                        });

                                        console.log(`Total: ${result.length}`);
                                        console.log(`Únicos: ${unique.length}`);
                                    })
                                    .catch(console.error)
                                }
                                if (options.validate && options.stats) {
                                    resultado = both.both(resultado);
                                }
                            }
                            resolve(resultado);
                        }
                    })
                }
                catch(error){
                    reject(error);
                }
            });

        }