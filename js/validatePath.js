const path = require('path');
exports.pathToAbsolute=(route)=> {
    return path.resolve(route);
}