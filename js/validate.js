const request = require('request');
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




// ------------------------------
// const request = require('request');
// const reqp = require('request-promise');
// exports.validate = (path, result) => {

// 	// console.log(result);
// 	const promise = new Promise((resolve, reject) => {
// 		const linksValidate = [];
// 		try {
// 			let linkExpression = /(?:(ftp|http|https)?:\/\/[^\s]+)/g;
// 			let regexLink = new RegExp(linkExpression);
// 			let description = /(?<=\[).+?(?=\])/gi;
// 			let regexDescription = new RegExp(description);
// 			const obj = result.map(link => {
// 				return link.match(regexLink);
// 			})
// 			const texts = result.map(text => {
// 				return text.match(regexDescription)
// 			})
// 			const definitiveText = [];
// 			const definitiveLinks = [];
// 			texts.map(text => {
// 				definitiveText.push(text[0]);
// 			})

// 			obj.map(link => {
// 				definitiveLinks.push(link[0]);
// 			})

// 			let resultLinks = []; //guardar el status de los links

// 			// console.log(definitiveLinks);
// 			// console.log(definitiveText)
// 			definitiveLinks.map(element => {
// 				// console.log(element)
// 				reqp({
// 						uri: element.replace(')', ''),
// 						resolveWithFullResponse: true
// 					})
// 					.then(response => {
// 						resultLinks.push(response.statusCode);
// 						if (resultLinks.length===definitiveLinks.length) {
// 							// console.log(resultLinks);
// 							let resultadoFinal= [];
// 							for (let i=0; i<result.length; i++){
// 								resultadoFinal.push({path:path,link:definitiveLinks[i].replace(')', ''), text:definitiveText[i], status:resultLinks[i]})
// 							}
// 							console.log(resultadoFinal);
// 						}
// 					})
// 					.catch(err => {
// 						resultLinks.push('fail');
// 						if (resultLinks.length===definitiveLinks.length){
// 						console.log(resultLinks);

// 						} 

// 					})
// 			})
// 			// -----------------------------------

// 			// let link = result.match(regexLink);
// 			// let textDescription = result.match(regexDescription);
// 			// for (let i = 0; i < link.length; i++) {
// 			//     if (link !== null) {
// 			//         reqp({
// 			//                 uri: link[i].replace(')', ''),
// 			//                 resolveWithFullResponse: true
// 			//             })
// 			//             .then(response => {
// 			//                 let statusCode = '';
// 			//                 if (typeof response !== 'undefined') {
// 			//                     statusCode = response.statusCode;
// 			//                     // console.log(statusCode);
// 			//                 } else {
// 			//                     statusCode = 500;
// 			//                 };
// 			//                 if (statusCode === 200) {
// 			//                     const linksOk = {
// 			//                         file: path,
// 			//                         href: link,
// 			//                         text: textDescription,
// 			//                         status: statusCode,
// 			//                         resultStatus: 'ok',
// 			//                     }
// 			//                     // console.log(linksValidate)
// 			//                     linksValidate.push(
// 			//                         linksOk)
// 			//                     resolve(linksValidate)
// 			//                     // resolve(linksValidate)

// 			//                 } else {
// 			//                     let linksNotOk = {
// 			//                         file: path,
// 			//                         href: link,
// 			//                         text: textDescription,
// 			//                         status: statusCode,
// 			//                         resultStatus: 'fail',
// 			//                     }
// 			//                     // console.log(linksNotOk)
// 			//                     linksValidate.push(linksNotOk);
// 			//                     resolve(linksValidate)
// 			//                 }
// 			//             })
// 			//             .catch(err => {

// 			//                 let linksNotOk = {
// 			//                     file: path,
// 			//                     href: link,
// 			//                     text: textDescription,
// 			//                     status: 500,
// 			//                     resultStatus: 'fail',
// 			//                 }
// 			//                 // console.log(linksNotOk);
// 			//                 linksValidate.push(linksNotOk);
// 			//                 resolve(linksValidate)
// 			//             })
// 			//     }
// 			//      else {
// 			//         let linksNotOk = {
// 			//             file: path,
// 			//             href: link,
// 			//             text: 'no es link',
// 			//             status: 500,
// 			//             resultStatus: 'fail',
// 			//         }
// 			//         linksValidate.push(linksNotOk);
// 			//         resolve(linksValidate)
// 			//     }
// 			// }
// 		} catch (error) {
// 			reject(error);
// 		}
// 	})

// 	return promise;
// }