const mdLinks = require('../index')

test('mdLinks --validate debería retornar links como objetos y su propiedades', (done) => {
    return mdLinks(path.join(process.cwd(),'./README.md'), {
        validate: true
    }).then((result) => {
        expect(result).toEqual({ file: 'C:\\Users\\PC\\Documents\\MarckDown\\lim20181-Track-FE-markdown-list\\holi.md',
        href: [ 'https://semver.org/)' ],
        text: null,
        status: 200,
        resultStatus: 'ok' },
      [ { file: 'C:\\Users\\PC\\Documents\\MarckDown\\lim20181-Track-FE-markdown-list\\holi.md',
          href: [ 'https://semver.org/)' ],
          text: null,
          status: 200,
          resultStatus: 'ok' } ]
      { file: 'C:\\Users\\PC\\Documents\\MarckDown\\lim20181-Track-FE-markdown-list\\holi.md',
        href:
         [ 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/)' ],
        text: null,
        status: 200,
        resultStatus: 'ok' }
      { file: 'C:\\Users\\PC\\Documents\\MarckDown\\lim20181-Track-FE-markdown-list\\holi.md',
        href:
         [ 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/)' ],
        text: null,
        status: 200,
        resultStatus: 'ok' }
      { file: 'C:\\Users\\PC\\Documents\\MarckDown\\lim20181-Track-FE-markdown-list\\holi.md',
        href: [ 'https://github.com/markedjs/marked)' ],
        text: null,
        status: 200,
        resultStatus: 'ok' });
        done()
        //   expect(data).toBe('peanut butter');
    });
})