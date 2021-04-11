const functions = require("firebase-functions")
const express = require("express")
const axios = require("axios")
const cors = require("cors")
const app = express()

require("dotenv").config()

function yyyymmdd(type, date) {
	const today = date ? date : new Date()
	const yesterday = new Date(today)
	yesterday.setDate(yesterday.getDate() - 1)
	const x = type === "today" ? today : yesterday
	var y = x.getFullYear().toString()
	var m = (x.getMonth() + 1).toString()
	var d = x.getDate().toString()
	d.length === 1 && (d = "0" + d)
	m.length === 1 && (m = "0" + m)
	var yyyymmdd = y + m + d
	return yyyymmdd
}

const todayDate = yyyymmdd("today")
const yesterdayDate = yyyymmdd("yesterday")

const url =
	"http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson"

const currentPut = async () => {
	let response
	try {
		response = await axios.get(url, {
			params: {
				ServiceKey: functions.config().covidapi.key, //Decoding key
				pageNo: 1,
				numOfRows: 10,
				startCreateDt: yesterdayDate,
				endCreateDt: todayDate,
			},
		})
	} catch (e) {
		console.log(e)
	}
	return response
}

app.use(cors())

app.get("/api/covid", (req, res) => {
	currentPut().then((response) => {
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Headers", "X-Requested-With")
		res.json(response.data.response.body)
	})
})

const api = functions.https.onRequest(app)

module.exports = { api }
