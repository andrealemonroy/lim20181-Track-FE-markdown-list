const validate = require('./validate.js');
const stats = require('./stats.js');
exports.both = (path, resultado) => {
    return new Promise((resolve, reject) => {
        try {
            validate.validate(path, resultado).then(result => {
                let arrayResolve = [];
                let broken = []
                for (let i = 0; i < result.length; i++) {

                    arrayResolve.push(result[i].href);
                    if (result[i].resultStatus === 'fail') {
                        broken.push(result[i].href)
                    }

                }
                let unique = arrayResolve.filter(function (elem, pos) {
                    return arrayResolve.indexOf(elem) == pos;
                });



                console.log(result.length);
                console.log(unique.length);
                console.log(broken.length);

            })
            // stats.stats(resultado).then(result => {
            //     console.log(result);
            // });
        } catch (err) {
            reject(err);
        }
    })
}
// let validateBoth = validate.validate(result);
// let statsBoth = stats.stats(result);
// let countValidate = 0;
// let countBroken = 0;
// for (let i = 0; i < validateBoth; i++) {
//     if (validateBoth[i] !== '#' && validateBoth !== '*') {
//         countValidate++
//     }
//     if (validateBoth[i].filter(validateBoth => validateBoth.resultStatus === 'fail')) {
//         countBroken++
//     }
// }
// console.log('Total: ' + countValidate);
// console.log('Rotos: '+ countBroken);