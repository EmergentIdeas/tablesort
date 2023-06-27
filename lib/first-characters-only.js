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