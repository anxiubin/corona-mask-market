function getYesterday() {
	const yesterday = new Date()
	yesterday.setDate(yesterday.getDate() - 1)
	let y = yesterday.getFullYear().toString()
	let m = (yesterday.getMonth() + 1).toString()
	let d = yesterday.getDate().toString()
	d.length === 1 && (d = "0" + d)
	m.length === 1 && (m = "0" + m)
	let yyyymmdd = y + m + d
	return yyyymmdd
}

export default getYesterday
