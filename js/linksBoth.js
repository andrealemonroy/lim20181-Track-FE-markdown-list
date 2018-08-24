const validate =require('./validate.js');
const stats = require('./stats.js');
exports.both = (path) =>{
    // validate.validate(path);
    stats.stats(path);
}