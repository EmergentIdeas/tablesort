const numberishOnly = require('./numberish-only')
// const charactersOnly = require('./characters-only')
const firstCharactersOnly = require('./first-characters-only')

function trim(val) {
	return val.trim()
}

function comparator(valueOne, valueTwo, cellOne, cellTwo) {
	let [one, two] = [valueOne, valueTwo].map(trim).map(firstCharactersOnly).map(trim)
	if(!one && two) {
		return -1
	}
	if(one && !two) {
		return 1
	}
	
	let diff = one.toLowerCase().localeCompare(two.toLowerCase())
	if(diff != 0) {
		return diff
	}
	
	[one, two] = [valueOne, valueTwo].map(numberishOnly).map(trim).map(parseFloat)
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