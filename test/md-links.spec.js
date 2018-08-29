const mdLinks = require('../index.js')
const path = require('path')

test('mdLinks --validate debería retornar links como objetos y su propiedades', (done) => {
    mdLinks.mdLinks(path.join(process.cwd(), './holi.md'), {
        validate: true
    }).then((result) => {
        // console.log(result);
        expect(result).toEqual([{"file": "C:\\Users\\PC\\Documents\\MarckDown\\lim20181-Track-FE-markdown-list\\holi.md", "href": "https://semver.org/", "resultStatus": "ok", "status": 200, "text": "Semver"}, {"file": "C:\\Users\\PC\\Documents\\MarckDown\\lim20181-Track-FE-markdown-list\\holi.md", "href": "https://github.com/markedjs/marked", "resultStatus": "ok", "status": 200, "text": "marked"}, {"file": "C:\\Users\\PC\\Documents\\MarckDown\\lim20181-Track-FE-markdown-list\\holi.md", "href":
        "https://carlosazaustre.com/manejando-la-asincronia-en-javascript/", "resultStatus": "ok", "status": 200, "text": "Asíncronía en js"}, {"file": "C:\\Users\\PC\\Documents\\MarckDown\\lim20181-Track-FE-markdown-list\\holi.md", "href": "https://carlosazaustre.com/manejando-la-asincronia-en-javascript/", "resultStatus": "ok", "status": 200, "text": "Asíncronía en js"}])
        done()
    })
})

test('mdLinks --stats debería retornar links totales y únicos', (done) => {
    mdLinks.mdLinks(path.join(process.cwd(), './holi.md'), {
        stats: true
    }).then((result) => {
        // console.log(result);
        expect(result).toEqual({ total: 4, unique: 3 }
        )
        done()
    })
})

test('mdLinks --stats debería retornar links totales únicos y rotos', (done) => {
    mdLinks.mdLinks(path.join(process.cwd(), './holi.md'), {
        stats: true,
        validate: true
    }).then((result) => {
        // console.log(result);
        expect(result).toEqual({ total: 4, unique: 3, brokens: 0 }
        )
        done()
    })
})

