const validate = require('./validate.js');
const stats = require('./stats.js');
exports.both = (result) => {
    let validateBoth = validate.validate(result);
    let statsBoth = stats.stats(result);
    let countValidate = 0;
    let countBroken = 0;
    for (let i = 0; i < validateBoth; i++) {
        if (validateBoth[i] !== '#' && validateBoth !== '*') {
            countValidate++
        }
        if (validateBoth[i].filter(validateBoth => validateBoth.resultStatus === 'fail')) {
            countBroken++
        }
    }
    console.log('Total: ' + countValidate);
    console.log('Rotos: '+ countBroken);
}