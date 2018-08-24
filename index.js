#!/usr/bin/env node

'use strict';
const program = require('commander');
const links = require('./js/path.js');
const linksValidate = require('./js/validate.js');
const linksUniques = require('./js/stats.js');
const isFileOrDirectory = require('./js/isFile.js');
const toAbsolute = require('./js/validatePath.js');
const linksBoth = require('./js/linksBoth.js');

program
    .version('0.0.1')
    .command('command <path> [option]', 'lista de links')
    .option('-v, --validate', 'links válidos')
    .option('-s, --stats', 'links únicos')
    // .option('-sv, --validate --stats', 'links totales, únicos y rotos')
    .action((path, option) => {
        let pathAbsolute=toAbsolute.pathToAbsolute(path);
        isFileOrDirectory.extension(pathAbsolute, option);
        // links.filterMarkdownFile(pathAbsolute).then(function(result){
        //     for (let i=0; i<result.length; i++){
        //         if (result[i] !== '*' && result[i] !== '#'){
        //             console.log(result[i]);
        //         }
        //     }
        // });
        if (option.validate && option.stats){
            linksBoth.both()
        }
        else if (option.validate) {
            linksValidate.validate(pathAbsolute);
        }
        else if (option.stats) {
            linksUniques.stats(pathAbsolute);
        }
        // if (option.sv){
        //     linksBoth.both(pathAbsolute);
        // }
    });
program.parse(process.argv);

