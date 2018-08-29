const mdLinks = require('../index')

test('mdLinks --validate debería retornar links como objetos y su propiedades', (done) => {
    return mdLinks(path.join(process.cwd(), './README.md'), {
        validate: true
    }).then((result) => {
        expect(result).toEqual(C:\Users\PC\Documents\MarckDown\lim20181-Track-FE-markdown-list\holi.md https://semver.org/ ok 200 Semver
            C:\Users\PC\Documents\MarckDown\lim20181-Track-FE-markdown-list\holi.md https://carlosazaustre.com/manejando-la-asincronia-en-javascript/ ok 200 Asíncronía en js
            C:\Users\PC\Documents\MarckDown\lim20181-Track-FE-markdown-list\holi.md https://carlosazaustre.com/manejando-la-asincronia-en-javascript/ ok 200 Asíncronía en js
            C:\Users\PC\Documents\MarckDown\lim20181-Track-FE-markdown-list\holi.md https://github.com/markedjs/marked ok 200 marked)
            // done()
            //   expect(data).toBe('peanut butter');
        )
    })
})

