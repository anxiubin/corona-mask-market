const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
	app.use(
		"/covid_api",
		createProxyMiddleware({
			target: "http://openapi.data.go.kr/openapi/service/rest/Covid19",
			changeOrigin: true,
			pathRewrite: { "^/covid_api/": "/" },
		})
	)
}
