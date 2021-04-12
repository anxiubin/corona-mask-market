const functions = require("firebase-functions")
const express = require("express")
const axios = require("axios")
const cors = require("cors")
const app = express()

const url =
	"http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson"

const currentPut = async (request) => {
	let response
	try {
		response = await axios.get(url, {
			params: {
				ServiceKey: functions.config().covidapi.key, //Decoding key
				pageNo: 1,
				numOfRows: 10,
				startCreateDt: request.param("startCreateDt"),
				endCreateDt: request.param("endCreateDt"),
			},
		})
	} catch (e) {
		console.log(e)
	}
	return response
}

app.use(cors())

app.get("/api/covid", (req, res) => {
	currentPut(req).then((response) => {
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Headers", "X-Requested-With")
		res.json(response.data.response.body)
	})
})

const api = functions.https.onRequest(app)

module.exports = { api }
