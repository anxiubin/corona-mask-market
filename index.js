const express = require("express")
const axios = require("axios")
const cors = require("cors")
const path = require("path")
const app = express()
const port = process.env.PORT || 5000
const http = require("http")

//heroku sleep 모드 방지
setInterval(function () {
	http.get("https://covid19-kr.herokuapp.com/")
}, 600000)

require("dotenv").config()

const url =
	"http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson"

const getCovidData = async (request) => {
	let response
	try {
		response = await axios.get(url, {
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

app.use(cors())

app.get("/api/covid", (req, res) => {
	getCovidData(req).then((response) => {
		res.json(response.data.response.body)
	})
})

app.listen(port)

app.use(express.static(path.join(__dirname, "client/build")))

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build/index.html"))
})

console.log(`server running at http ${port}`)
