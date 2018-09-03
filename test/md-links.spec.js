const mdLinks = require('../index');
const path = require('path');

test('mdLinks --validate debería retornar links como objetos y su propiedades', async (done) => {
    await mdLinks.mdLinks(path.join(process.cwd(), './holi.md'), {
        validate: true
    }).then((result) => {
        expect(result).toEqual([{ "file": "C:\\Users\\ANDREA\\Documents\\JavaScript\\marckdown\\lim20181-Track-FE-markdown-list\\holi.md", "href": "https://semver.org/", "resultStatus": "ok", "status": 200, "text": "Semver" }, { "file": "C:\\Users\\ANDREA\\Documents\\JavaScript\\marckdown\\lim20181-Track-FE-markdown-list\\holi.md", "href": "https://github.com/markedjs/marked", "resultStatus": "ok", "status": 200, "text": "marked" }, { "file": "C:\\Users\\ANDREA\\Documents\\JavaScript\\marckdown\\lim20181-Track-FE-markdown-list\\holi.md", "href": "https://carlosazaustre.com/manejando-la-asincronia-en-javascript/", "resultStatus": "ok", "status": 200, "text": "Asíncronía en js" }, { "file": "C:\\Users\\ANDREA\\Documents\\JavaScript\\marckdown\\lim20181-Track-FE-markdown-list\\holi.md", "href": "https://carlosazaustre.com/manejando-la-asincronia-en-javascript/", "resultStatus": "ok", "status": 200, "text": "Asíncronía en js" }]
        )
        // expect(result).toEqual([{ "file": "C:\\Users\\ANDREA\\Documents\\JavaScript\\marckdown\\lim20181-Track-FE-markdown-list\\holi.md", "href": "https://semver.org/", "resultStatus": "ok", "status": 200, "text": "Semver" }, { "file": "C:\\Users\\ANDREA\\Documents\\JavaScript\\marckdown\\lim20181-Track-FE-markdown-list\\holi.md", "href": "https://github.com/markedjs/marked", "resultStatus": "ok", "status": 200, "text": "marked" }, { "file": "C:\\Users\\ANDREA\\Documents\\JavaScript\\marckdown\\lim20181-Track-FE-markdown-list\\holi.md", "href": "https://carlosazaustre.com/manejando-la-asincronia-en-javascript/", "resultStatus": "ok", "status": 200, "text": "Asíncronía en js" }, { "file": "C:\\Users\\ANDREA\\Documents\\JavaScript\\marckdown\\lim20181-Track-FE-markdown-list\\holi.md", "href": "https://carlosazaustre.com/manejando-la-asincronia-en-javascript/", "resultStatus": "ok", "status": 200, "text": "Asíncronía en js" }]
        // )
        done();
    })

}, 8000)

test('mdLinks --stats debería retornar links totales y únicos', async (done) => {
    await mdLinks.mdLinks(path.join(process.cwd(), './holi.md'), {
        stats: true
    }).then((result) => {
        expect(result).toEqual({ total: 4, unique: 3 }
        )
        done();
    })

}, 6000)

test('mdLinks --stats debería retornar links totales únicos y rotos', async (done) => {
    await mdLinks.mdLinks(path.join(process.cwd(), './holi.md'), {
        stats: true,
        validate: true
    }).then((result) => {
        expect(result).toEqual({ total: 4, unique: 3, brokens: 0 }
        )
        done();
    })

}, 9000)

