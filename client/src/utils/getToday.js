function getToday() {
	const today = new Date()
	let y = today.getFullYear().toString()
	let m = (today.getMonth() + 1).toString()
	let d = today.getDate().toString()
	d.length === 1 && (d = "0" + d)
	m.length === 1 && (m = "0" + m)
	let yyyymmdd = y + m + d
	return yyyymmdd
}

export default getToday
