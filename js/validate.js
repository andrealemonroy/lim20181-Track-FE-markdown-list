const request = require('request');
const reqp = require('request-promise');
exports.validate = (path, result) => {
    const linksValidate = [];
    // console.log(result);
    const promise = new Promise((resolve, reject) => {
        try{
            for (let i = 0; i < result.length; i++) {
                let linkExpression = /(?:(ftp|http|https)?:\/\/[^\s]+)/g;
                let regexLink = new RegExp(linkExpression);
                let link = result[i].match(regexLink);
                let description = /(?:__|[*#])/
                let regexDescription = new RegExp(description);
                let textDescription = result[i].match(regexDescription);
                if (link !== null) {
                    reqp({ uri: link[0].replace(')', ''), resolveWithFullResponse: true})
                        .then(response => {
                            let statusCode = '';
                            if (typeof response !== 'undefined') {
                                statusCode = response.statusCode;
                            } else {
                                statusCode = 500;
                            }console.log(statusCode);
                            if (statusCode === 200) {
                                let linksOk = {
                                    file: path,
                                    href: link,
                                    text: textDescription,
                                    status: statusCode,
                                    resultStatus: 'ok',
                                }
                                console.log(linksOk)
                                linksValidate.push(linksOk);


                            } else {
                                let linksNotOk = {
                                    file: path,
                                    href: link,
                                    text: textDescription,
                                    status: statusCode,
                                    resultStatus: 'fail',
                                }
                                console.log(linksNotOk)
                                linksValidate.push(linksNotOk);
                            
                            }
                            resolve(linksValidate)
                        })
                        .catch(err => {

                            let linksNotOk = {
                                file: path,
                                href: link,
                                text: textDescription,
                                status: 500,
                                resultStatus: 'fail',
                            }
                            console.log(linksNotOk);
                            linksValidate.push(linksNotOk);
                            resolve(linksValidate)
                        })
                } else {
                    let linksNotOk = {
                        file: path,
                        href: link,
                        text: 'no es link',
                        status: 500,
                        resultStatus: 'fail',
                    }
                    linksValidate.push(linksNotOk);
                    resolve(linksValidate)
                }
            }
        }
        catch(error){
            reject(error);
        }
    })

    return promise;
}