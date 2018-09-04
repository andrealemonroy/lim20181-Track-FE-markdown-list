const getLinks = require('./getLinks.js')
exports.getLinksAsObject = (path) => {

	return new Promise((resolve, reject) => {
		getLinks.getLinks(path).then(resultado => {
			let objectLinks = [];
			resultado.map(item => {
				let linkExpression = /(?:(ftp|http|https)?:\/\/[^\s]+)/g;
				let regexLink = new RegExp(linkExpression);
				let link = item.match(regexLink);
				let description = /(?<=\[).+?(?=\])/gi;
				let regexDescription = new RegExp(description);
				let textDescription = item.match(regexDescription);
				if (link != null) {
					let hrefLink = link[0].replace(')', '');
					let textWithoutArray = textDescription[0];
					let objectLink = {
						file: path,
						href: hrefLink,
						text: textWithoutArray
					}
					objectLinks.push(objectLink);
				}
			});
			resolve(objectLinks);
		})
	})
}