const fs = require('fs');
const validate = require('./js/validate.js');
const stats = require('./js/stats.js');
const fileOrDirectory = require('./js/isFile.js');
const getLinks = require('./getLinks.js');
const getLinksAsObject = require('./getLinksAsObject.js')
const mdLinks = (path, options) => {

	return new Promise((resolve, reject) => {
		fileOrDirectory.extension(path).then(file => {
			file.map(value => {
				getLinks.getLinks(value).then(resultado => {
					try {
						if (typeof options !== 'undefined') {
							if (options.validate && options.stats) {
								let brokens = [];

								validate.validate(value, resultado).then(resultValidate => {
									resultValidate.forEach(item => {
										if (item.resultStatus == 'fail') {
											brokens.push(item.href);
										}
									})

									stats.stats(resultValidate).then((result) => {

										let resultStats = {
											total: result.total,
											unique: result.unique,
											brokens: brokens.length
										};

										resolve(resultStats);
									})
								})


							} else {
								if (options.validate) {

									validate.validate(value, resultado).then(linkValidate => {

										resolve(linkValidate);

									})

								} else if (options.stats) {

									let arrayResolve = [];

									resultado.forEach(links => {
										let linkExpression = /(?:(ftp|http|https)?:\/\/[^\s]+)/g;
										let regexLink = new RegExp(linkExpression);
										let link = links.match(regexLink);

										if (link !== null) {
											let itemResolve = {
												href: link[0].replace(')', '')
											}
											arrayResolve.push(itemResolve);
										}

									})

									stats.stats(arrayResolve).then((result) => {
										let resultStats = {
											total: result.total,
											unique: result.unique
										};

										resolve(resultStats);
									})
								}
							}
						}
						else {
							getLinksAsObject.getLinksAsObject(path).then(result => {
								resolve(result);
							})
						}
					}
					catch (error) {
						reject(error);
					}
				});
			})
		})
	})

}

module.exports = mdLinks;