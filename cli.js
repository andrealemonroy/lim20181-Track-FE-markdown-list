#!/usr/bin/env node

const mdLinks = require('./index');
const path = require('path');
const [, , ...args] = process.argv;

let pathAbsolute = path.join((path.join(process.cwd(), args[0])));

if (args[1] !== undefined) {

	if (args[1] === '--stats' && args[2] === '--validate' || args[1] === '--validate' && args[2] === '--stats') {
		mdLinks(pathAbsolute, {
			validate: true,
			stats: true
		}).then(links => {
			console.log(`Total: ${links.total}`);
			console.log(`Únicos: ${links.unique}`);
			console.log(`Rotos: ${links.brokens}`);
		});
	} else {
		if (args[1] === '--validate') {
			mdLinks(pathAbsolute, {
				validate: true
			}).then(links => {
				links.forEach(link => {
					console.log(`${link.file} ${link.href} ${link.resultStatus} ${link.status} ${link.text}`)
				});
			});
		};

		if (args[1] === '--stats') {
			mdLinks(pathAbsolute, {
				stats: true
			}).then(links => {
				console.log(`Total: ${links.total}`);
				console.log(`Únicos: ${links.unique}`);
			});
		};
	}
} else {
	mdLinks(pathAbsolute).then(links => {
		// console.log(links)
		links.forEach(link => {
			console.log(`${link.file} ${link.href} ${link.text}`)
		});
	})
}