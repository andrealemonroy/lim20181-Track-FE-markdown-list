const fs = require('fs');
const links = require('./path.js');
var path = require('path');
exports.extension = (route, callback) => {
    const extMd = ".md";
    let pathToString= path.toString()
    // console.log(pathToString)
    let extName = path.extname(route);
    // console.log(typeof(path));
    console.log(extName);
    fs.stat(route, (err, stats) => {
        if (stats.isDirectory()) {
            console.log('es carpeta');
        }
        if (stats.isFile() && extMd.match(extName)) {
            console.log('es archivo');
            // lee archivos
            fs.readFile(route, 'utf8', (err, data) => {
                if (err) throw err;
                // console.log(data);
            });
        }
        else{
            console.log('no es archivo MarckDown');
        };
    });
}