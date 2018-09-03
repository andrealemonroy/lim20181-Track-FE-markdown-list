const reqp = require('request-promise');
exports.validate = (path, result) => {
	const linksValidate = [];
	const promise = new Promise((resolve, reject) => {

		result.map(item => {
			try {
				let linkExpression = /(?:(ftp|http|https)?:\/\/[^\s]+)/g;
				let regexLink = new RegExp(linkExpression);
				let link = item.match(regexLink);
				let description = /(?<=\[).+?(?=\])/gi;
				let regexDescription = new RegExp(description);
				let textDescription = item.match(regexDescription);
				if (link !== null) {
					let hrefLink = link[0].replace(')', '');
					let textWithoutArray = textDescription[0];
					reqp({
							uri: hrefLink,
							resolveWithFullResponse: true
						})
						.then(response => {

							let linksOk = {
								file: path,
								href: hrefLink,
								text: textWithoutArray,
								status: response.statusCode,
								resultStatus: 'ok',
							}
	
							linksValidate.push(linksOk);
							if (linksValidate.length === result.length) {
								resolve(linksValidate)
							}

						})
						.catch(err => {
							let linksNotOk = {
								file: path,
								href: hrefLink,
								text: textWithoutArray,
								status: 500,
								resultStatus: 'fail',
							}
	
							linksValidate.push(linksNotOk);
							if (linksValidate.length === result.length) {
								resolve(linksValidate)
							}

						})
				}
			} catch (error) {
				reject(error);
			}
		});


	})

	return promise;
}

