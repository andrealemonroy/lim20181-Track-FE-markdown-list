const mdLinks = require('../lim20181-Track-FE-markdown-list/index');
const toAbsolute = require('./js/validatePath.js');
const [, , ...args] = process.argv;

let pathAbsolute=toAbsolute.pathToAbsolute(args[0]);
// isFileOrDirectory.extension(pathAbsolute);

if (args[1] !== undefined) {
    if (args[1] === '--validate') {
       mdLinks.mdLinks(pathAbsolute, {validate:true}).then(links => {
        console.log(links)
      });
    };
    if (args[1] === '--stats') {
        mdLinks.mdLinks(pathAbsolute, {stats:true}).then(links => {
            //console.log(links)
          });;
    }
    if (args[1] === '--stats' && args[2] === '--validate'||args[1]==='--validate' && args[2]==='--stats'){
        /*mdLinks.mdLinks(pathAbsolute, {validate:true, stats:true}).then(links => {
            //console.log(links)
          });*/
    }
}
else{
    mdLinks.mdLinks(pathAbsolute).then(links => {
        console.log(links)
      });
}