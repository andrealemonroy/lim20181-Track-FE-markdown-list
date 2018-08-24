const links = require('./path.js');
let aux = [];
let i = 0;
let superResult = [];
exports.stats = (path) => {
    links.filterMarkdownFile(path).then(result => {
        const apra = result.filter(function(elem, pos) {
            return result.indexOf(elem) == pos;
        });

        console.log(apra.length);
    });
}

const uniques = (item) => {

    if (item != aux[i]) {
        aux.push(item)
    } else {
        i++;
        uniques(superResult[i]);
    }

    //console.log('Total: ' + countData + ' links');

}