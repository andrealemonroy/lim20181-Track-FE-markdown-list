const mdLinks = require('../lim20181-Track-FE-markdown-list/index');
const toAbsolute = require('./js/validatePath.js');
const [, , ...args] = process.argv;

let pathAbsolute=toAbsolute.pathToAbsolute(args[0]);
// isFileOrDirectory.extension(pathAbsolute);

if (args[1] !== undefined) {
    
    if (args[1] === '--stats' && args[2] === '--validate'||args[1]==='--validate' && args[2]==='--stats'){
        mdLinks.mdLinks(pathAbsolute, {validate:true, stats:true}).then(links => {
            console.log(`Total: ${links.total}`);
            console.log(`Únicos: ${links.unique}`);
            console.log(`Rotos: ${links.brokens}`);
        });
    }
    else {
        if (args[1] === '--validate') {
            mdLinks.mdLinks(pathAbsolute, {validate:true}).then(links => {
                for (let i = 0; i < links.length; i++) {
                    console.log(`${links[i].file} ${links[i].href} ${links[i].resultStatus} ${links[i].status} ${links[i].text}`)
                }
            });
        };
        
        if (args[1] === '--stats') {
            mdLinks.mdLinks(pathAbsolute, {stats:true}).then(links => {
                console.log(`Total: ${links.total}`);
                console.log(`Únicos: ${links.unique}`);
            });
        };
    }
}
else{
    mdLinks.mdLinks(pathAbsolute).then(links => {
        for (let i = 0; i < links.length; i++) {
            console.log(`${links[i].file} ${links[i].href} ${links[i].text}`)
        }
    });
}