# Tablesort

A very simple way to let users sort an html table by clicking the headers. 
Does not impose anything in the way of styling.

## Install

```
npm install @dankolz/tablesort
```

## Basic usage

Use any html table markup, so long as the header row uses `th` elements. If you want a column
to be ignored, add a `no-sort` class to the `th` element.

```
const Tablesort = require('@dankolz/tablesort')
let table = new Tablesort(document.querySelector('#tableid'))
```

At this point, a user clicking on one of the headers will cause that column to sort.
Very basic styling to draw carats and make the th elements look like they're clickable
is available in `less/tablesort.less`.

## More advanced sorting

By default sorting is case insensitive lexicographic. This is wrong for most things.

To specify what kind of sorting should be used for a column, add a `data-comparator` attribute
like:

```
<th data-comparator="numberish"> GDP </th>
```

Three kinds of sorts are available out of the box: default, numberish, and sku. `sku` assumes letters
followed by numbers, were everything starting with the same letters are grouped together. `numberish`
assumes it's money or percent or real numbers or something where it's safe to ignore anything except
numerals, minus, and the period, and convert that to a number for comparison.

## Additional kinds of sorting

Adding more kinds of sorting is dead simple. When a Tablesort object is created, configure it with additional
comparators. Comparators are like those normally passed to Array.sort, and you can use anything like
that you've already written. The first two arguments are the first cell text value and second cell
text value, respectively.

However, if you want to write comparators which need to know something about the markup in the cell
(not just the innerText value) or wants to check out other cells in the row, Tablesort also passes
the cell elements as the third and fourth arguments

```
new Tablesort(document.querySelector('#tableid'), {
	comparators: {
		hasLink: comparatorHasLink
	}
})

/**
 * Makes a cell with a link come before a cell without.
 */
function comparatorHasLink(valueOne, valueTwo, cellOne, cellTwo) {
	let hasLinkOne = cellOne.innerHTML.indexOf('<a') > -1
	let hasLinkTwo = cellTwo.innerHTML.indexOf('<a') > -1
	
	if(hasLinkOne && hasLinkTwo) {
		return 0
	}

	return hasLinkOne ? -1 : 1
}

```


Then you create markup where you have a table header like:

```
<tr>
	<th>...</th>
	<th data-comparator="hasLink">web address</th>
</tr>
```

## Utils

To create a comparator which is the opposite of an existing comparator, you can use:

```
const anti = require('@dankolz/tablesort/lib/anti)
let newComparator = anti(oldComparator)
```