let comparatorDefault = require('./comparator-default')
let comparatorNumberish = require('./comparator-numberish')
let comparatorSku = require('./comparator-sku')

function anti(comparator) {
	return function(valueOne, valueTwo, cellOne, cellTwo) {
		return -1 * comparator(valueOne, valueTwo, cellOne, cellTwo)
	}
}

class Tablesort {
	constructor(tableElement, options = {}) {
		this.tableElement = tableElement
		this.options = Object.assign({}, options)
		
		this.options.comparators = Object.assign({
			default: comparatorDefault
			, numberish: comparatorNumberish
			, sku: comparatorSku
		}, this.options.comparators)
		
		let headers = tableElement.querySelectorAll('th:not(.no-sort)')
		for(let header of headers) {
			header.addEventListener('click', this.headerClick.bind(this))
		}
	}
	
	headerClick(evt) {
		let header = evt.currentTarget
		let position = Array.from(header.parentNode.children).indexOf(header)
		let reverse = header.getAttribute('aria-sort') == 'forward' ? true : false
		this.tableElement.querySelectorAll('th').forEach(cell => cell.removeAttribute('aria-sort'))
		header.setAttribute('aria-sort', reverse ? 'reverse' : 'forward')
		

		let comparatorName = header.getAttribute('data-comparator') || 'default'
		let comparator = this.options.comparators[comparatorName] || this.options.comparators.default
		if(reverse) {
			comparator = anti(comparator)
		}

		this.sort(position, comparator)
	}
	
	sort(position, comparator = this.options.comparators.default) {
		let tbody = this.tableElement.querySelector('tbody')
		let rows = Array.from(tbody.querySelectorAll('tr'))
		rows.sort((one, two) => {
			let cellOne = one.children[position]
			let cellTwo = two.children[position]

			return comparator(cellOne.innerText, cellTwo.innerText, cellOne, cellTwo)
		})
		for(let row of rows) {
			tbody.appendChild(row)
		}
	}
	


}

module.exports = Tablesort