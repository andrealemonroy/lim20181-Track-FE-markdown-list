const links = require('./path.js');
let aux = [];
let i = 0;
let superResult = [];
exports.stats = (result) => {
    /*links.filterMarkdownFile(path).then(result => {
        let arr = new Set (result)
        console.log(arr.size);
    //   return result.indexOf(elem) == pos;
    })

    links.filterMarkdownFile(path).then(result => {
        let countData = 0
        for (let i = 0; i < result.length; i++) {
        if (result[i] !== '*' && result[i] !== '#') {
            countData++;
        };
    }
        console.log(countData+ 'total');
    });*/

    return new Promise((resolve, reject) => {
        let arrayResolve = [];

        try {
            for (let i = 0; i < result.length; i++) {
                let linkExpression = /(?:(ftp|http|https)?:\/\/[^\s]+)/g;
                let regexLink = new RegExp(linkExpression);
                let link = result[i].match(regexLink);

                if (link !== null) {
                    arrayResolve.push(link[0].replace(')', ''));
                }

                resolve(arrayResolve)
            }
        }
        catch(error){
            reject(error);
        }
    });
}

// const uniques = (item) => {

//     if (item != aux[i]) {
//         aux.push(item)
//     } else {
//         i++;
//         uniques(superResult[i]);
//     }

//     //console.log('Total: ' + countData + ' links');

// }