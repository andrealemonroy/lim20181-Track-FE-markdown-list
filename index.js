#!/usr/bin/env node

'use strict';
const program = require('commander');
const links = require('./path.js');
const linksValidate = require('./validate.js');
const linksUniques = require('./stats.js');
const isFileOrDirectory = require('./isFile.js');
const toAbsolute = require('./validatePath.js');


// const {
//     filterMarkdownFile
// } = require('./path.js');
program
    .version('0.0.1')
    .command('command <path> [option]', 'lista de links')
    .option('-v, --validate', 'links válidos')
    .option('-s, --stats', 'links únicos')
    .action((path, option) => {
        let pathAbsolute=toAbsolute.pathToAbsolute(path);
        isFileOrDirectory.extension(pathAbsolute);
        if (option.validate) {
            linksValidate.validate(path);
        }
        if (option.stats) {
            linksUniques.stats(path);
        }
    });
program.parse(process.argv);
