const { createProxyMiddleware } = require("http-proxy-middleware")
const port = process.env.PORT || "http://localhost:5000"

module.exports = function (app) {
	app.use(
		"/api/covid",
		createProxyMiddleware({
			target: port,
			changeOrigin: true,
		})
	)
}
