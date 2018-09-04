const fs = require('fs');
const validate = require('./js/validate.js');
const stats = require('./js/stats.js');
const fileOrDirectory = require('./js/isFile.js')
const mdLinks  = (path, options) => {

    return new Promise((resolve, reject) => {
        fileOrDirectory.extension(path).then(file => {
            file.map(value => {


                // return mdLinks.mdLinks(value, options)});


                try {

                    fs.readFile(value, 'utf8', function (err, content) {
                        // console.log(value);
                        const expression = /(?:__|[*#])|\[(.*?)\]\(.*?\)/gm;
                        const regex = new RegExp(expression);
                        let linkExpression = /(?:(ftp|http|https)?:\/\/[^\s]+)/g;
                        let regexLink = new RegExp(linkExpression);

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
                                if (options.validate && options.stats) {
                                    var brokens = [];

                                    validate.validate(value, resultado).then(resultValidate => {

                                        for (const item in resultValidate) {
                                            if (resultValidate.hasOwnProperty(item)) {
                                                const element = resultValidate[item];
                                                if (element.resultStatus == 'fail') {
                                                    brokens.push(element.href);
                                                }
                                            }
                                        }

                                        stats.stats(resultValidate).then((result) => {

                                            let resultStats = {
                                                total: result.total,
                                                unique: result.unique,
                                                brokens: brokens.length
                                            };

                                            resolve(resultStats);
                                        })
                                            .catch(console.error);
                                    })
                                        .catch(console.error);


                                } else {
                                    if (options.validate) {

                                        validate.validate(value, resultado).then(result => {
                                            resolve(result);
                                        })
                                            .catch(console.error);

                                    } else if (options.stats) {

                                        let arrayResolve = [];

                                        for (let i = 0; i < resultado.length; i++) {
                                            let linkExpression = /(?:(ftp|http|https)?:\/\/[^\s]+)/g;
                                            let regexLink = new RegExp(linkExpression);
                                            let link = resultado[i].match(regexLink);

                                            if (link !== null) {
                                                let itemResolve = {
                                                    href: link[0].replace(')', '')
                                                }
                                                arrayResolve.push(itemResolve);
                                            }
                                        }

                                        stats.stats(arrayResolve).then((result) => {
                                            /*console.log(`Total: ${result.total}`);
                                            console.log(`Únicos: ${result.unique}`);*/

                                            let resultStats = {
                                                total: result.total,
                                                unique: result.unique
                                            };

                                            resolve(resultStats);
                                        })
                                            .catch(console.error);
                                    }
                                }
                            }
                            else {
                                let objectLinks = [];

                                resultado.map(item => {
                                    let linkExpression = /(?:(ftp|http|https)?:\/\/[^\s]+)/g;
                                    let regexLink = new RegExp(linkExpression);
                                    let link = item.match(regexLink);
                                    let description = /(?<=\[).+?(?=\])/gi;
                                    let regexDescription = new RegExp(description);
                                    let textDescription = item.match(regexDescription);
                                    console.log(link);
                                    if (link!=null){
                                        let hrefLink = link[0].replace(')', '');
                                        let textWithoutArray = textDescription[0];
                                        let objectLink = {
                                            file: value,
                                            href: hrefLink,
                                            text: textWithoutArray
                                        }
    
                                        objectLinks.push(objectLink);
                                    }
                                    

                                });

                                resolve(objectLinks);
                            }
                        }
                    })
                } catch (error) {
                    reject(error);
                }
            });

        })
    })
}

module.exports = mdLinks;