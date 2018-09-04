const fs = require('fs');
const validate = require('./js/validate.js');
const stats = require('./js/stats.js');
const fileOrDirectory = require('./js/isFile.js');
const getLinks = require('./getLinks.js')
const mdLinks = (path, options) => {

    return new Promise((resolve, reject) => {
        fileOrDirectory.extension(path).then(file => {
            file.map(value => {
                getLinks.getLinks(value).then(resultado => {
                    try {
                        if (typeof options !== 'undefined') {
                            if (options.validate && options.stats) {
                                let brokens = [];

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
                                })


                            } else {
                                if (options.validate) {

                                    validate.validate(value, resultado).then(linkValidate => {

                                            resolve(linkValidate);

                                    })

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
                                        let resultStats = {
                                            total: result.total,
                                            unique: result.unique
                                        };

                                        resolve(resultStats);
                                    })
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
                                if (link != null) {
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
                    catch (error) {
                        reject(error);
                    }
                });
            })
        })
    })
}

module.exports = mdLinks;