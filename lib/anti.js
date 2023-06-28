/**
 * Creates a comparator based on another comparator which has the opposite
 * sort order.
 * @param {function} comparator 
 * @returns 
 */
function anti(comparator) {
	return function(valueOne, valueTwo, cellOne, cellTwo) {
		return -1 * comparator(valueOne, valueTwo, cellOne, cellTwo)
	}
}

module.exports = anti