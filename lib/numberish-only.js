function numberishOnly(val) {
	if (val) {
		if(typeof val !== 'string') {
			val = val.toString()
		}
		return val.replace(/[^0123456789.]/g, '')
	}
	return ''
}

module.exports = numberishOnly