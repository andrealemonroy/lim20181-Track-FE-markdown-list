#!/usr/bin/env node
'use strict';
const program = require('commander');
const links = require('./path.js');
const linksValidate = require('./validate.js');
const linksUniques = require('./stats.js')

// const {
//     filterMarkdownFile
// } = require('./path.js');
program
    .version('0.0.1')
    .command('command <path> [option]', 'lista de links')
    .option('-v, --validate', 'links válidos')
    .option('-s, --stats', 'links únicos')
    .action(function (path, option) {
        if (option.validate){
            linksValidate.validate(path);
        }
    });
program.parse(process.argv);