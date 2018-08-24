const fs = require('fs');
const path = require('path');
const file = require('./path.js');
const validateJS = require('./validate.js');
exports.extension = (route) => {
    recursive(route);
}

const recursive = (route) => {
    const extMd = ".md";
    let extName = path.extname(route);
    fs.stat(route, (err, stats) => {
        if (stats && stats.isDirectory()) {
            fs.readdir(route, (err, files) => {
                files.forEach(file => {
                    let reFile = path.join(route, file);
                    if (file !== '.git') {
                        recursive(reFile);
                    }
                });
            })
            console.log('es carpeta');
        }
        else if (stats.isFile() && (extMd==extName)) {
            console.log('es archivo');
            // lee archivos
            console.log(route);
            // validateJS.validate(route);
        } else {
            console.log('no es archivo MarckDown');
        };
    });
}