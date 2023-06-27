const numberishOnly = require('./numberish-only')

function comparator(valueOne, valueTwo, cellOne, cellTwo) {
	let [one, two] = [valueOne, valueTwo].map(numberishOnly).map(parseFloat)
	if(Number.isNaN(one) && Number.isNaN(two)) {
		return 0
	}
	if(Number.isNaN(one)) {
		return -1
	}
	if(Number.isNaN(two)) {
		return 1
	}
	if(one < two) {
		return -1
	}
	if(one > two) {
		return 1
	}
	return 0
}
module.exports = comparator