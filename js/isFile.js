exports.extension = (route) => {
	return recursive(route);
}
const fs = require('fs');
const path = require('path');
const util = require('util');
const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);
const mdLinks = require('../index.js')

async function recursive(route) {
	const extMd = ".md";
	let extName = path.extname(route);
	let files = [];
	let stats = await stat(route);
	if (stats.isDirectory()) {
		let dirList = await readdir(route);
		for (const file of dirList) {
			let reFile = path.join(route, file);
			let newFiles = await recursive(reFile);
			files.push(...newFiles);
		}
	} else if (stats.isFile() && extMd === extName) {
		files.push(route);
	}
	return files;
};
