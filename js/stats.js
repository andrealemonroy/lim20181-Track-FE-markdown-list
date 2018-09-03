let aux = [];
let i = 0;
let superResult = [];
exports.stats = (result) => {

    return new Promise((resolve, reject) => {
        let arrayResolve = [];

        try {
            for (let i = 0; i < result.length; i++) {
                arrayResolve.push(result[i].href);
            }

            let unique = arrayResolve.filter(function (elem, pos) {
                return arrayResolve.indexOf(elem) == pos;
            });

            let counters = {
                total: result.length,
                unique: unique.length
            };



            resolve(counters)
        } catch (error) {
            reject(error);
        }
    });
}
