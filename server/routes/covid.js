const express = require("express")
const axios = require("axios")
const router = express.Router()
require("dotenv").config()

const covid_url =
	"http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson"

const getCovidData = async (request) => {
	let response
	try {
		response = await axios.get(covid_url, {
			params: {
				ServiceKey: process.env.REACT_APP_COVID19_API_KEY, //Decoding key
				pageNo: request.params.pageNo,
				numOfRows: request.params.numOfRows,
				startCreateDt: request.startCreateDt,
				endCreateDt: request.params.endCreateDt,
			},
		})
	} catch (e) {
		console.log(e)
	}
	return response
}

router.get("/statistics", (req, res) => {
	getCovidData(req).then((response) => {
		res.json(response.data.response.body)
	})
})

module.exports = router
