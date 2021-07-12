const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const port = process.env.PORT || 5000
const http = require("http")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/api/covid", require("./routes/covid"))

//heroku sleep 모드 방지
setInterval(function () {
	http.get("http://covid19-kr.herokuapp.com/")
}, 600000)

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"))

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
	})
}

app.listen(port, () => {
	console.log(`Server Listening on ${port}`)
})
