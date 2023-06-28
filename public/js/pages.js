(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.require = require
const Tablesort = require('../lib/tablesort')

let table = new Tablesort(document.querySelector('#example'))

// let tri = require('tripartite')


// load templates like
//require('../views/test1.tri')

// and use like:
/*
let d = document.createElement('div')
d.innerHTML = tri.getTemplate('views/test1')({
	key1: 'value'
	, key2: 'value'
})
document.body.append(d)
*/






},{"../lib/tablesort":8}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{"./numberish-only":7}],5:[function(require,module,exports){
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
},{"./first-characters-only":6,"./numberish-only":7}],6:[function(require,module,exports){
function firstCharactersOnly(val) {
	if (val) {
		if(typeof val !== 'string') {
			val = val.toString()
		}
		let match = val.match(/^[a-zA-Z]+/)
		if(!match) {
			return ''
		}
		return match[0]
	}
	return ''
}

module.exports = firstCharactersOnly
},{}],7:[function(require,module,exports){
function numberishOnly(val) {
	if (val) {
		if(typeof val !== 'string') {
			val = val.toString()
		}
		return val.replace(/[^0123456789\-.]/g, '')
	}
	return ''
}

module.exports = numberishOnly
},{}],8:[function(require,module,exports){
let comparatorDefault = require('./comparator-default')
let comparatorNumberish = require('./comparator-numberish')
let comparatorSku = require('./comparator-sku')

const anti = require('./anti')

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
},{"./anti":2,"./comparator-default":3,"./comparator-numberish":4,"./comparator-sku":5}]},{},[1])
//# sourceMappingURL=pages.js.map
