#!/usr/bin/env node

const mdLinks = require('./index');
const toAbsolute = require('./js/validatePath.js');
const path = require('path');
const [, , ...args] = process.argv;

let pathAbsolute = path.join((path.join(process.cwd(), args[0])));
// isFileOrDirectory.extension(pathAbsolute);

if (args[1] !== undefined) {

    if (args[1] === '--stats' && args[2] === '--validate' || args[1] === '--validate' && args[2] === '--stats') {
        mdLinks.mdLinks(pathAbsolute, {
            validate: true,
            stats: true
        }).then(links => {
            console.log(links);
        });
    } else {
        if (args[1] === '--validate') {
            mdLinks.mdLinks(pathAbsolute, {
                validate: true
            }).then(links => {
                console.log(links);
                // for (let i = 0; i < links.length; i++) {
                //     console.log(`${links[i].file} ${links[i].href} ${links[i].resultStatus} ${links[i].status} ${links[i].text}`)
                // }
            });
        };

        if (args[1] === '--stats') {
            mdLinks.mdLinks(pathAbsolute, {
                stats: true
            }).then(links => {
                console.log(links);
            });
        };
    }
} else {
    mdLinks.mdLinks(pathAbsolute).then(links => {
        for (let i = 0; i < links.length; i++) {
            console.log(`${links[i].file} ${links[i].href} ${links[i].text}`)
        }
    });
}