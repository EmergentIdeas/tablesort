function comparator(valueOne, valueTwo, cellOne, cellTwo) {
	valueOne = valueOne.trim()
	valueTwo = valueTwo.trim()
	if(valueOne == '' && valueTwo == '') {
		return 0
	}
	if(valueOne == '') {
		return -1
	}
	if(valueTwo == '') {
		return 1
	}
	return valueOne.toLowerCase().localeCompare(valueTwo.toLowerCase())
}

module.exports = comparator