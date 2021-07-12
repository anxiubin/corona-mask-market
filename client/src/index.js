import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import Router from "./router"
import { DataProvider } from "./DataContext"

import "./styles/styles.css"

const App = () => (
	<BrowserRouter>
		<DataProvider>
			<Router />
		</DataProvider>
	</BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById("root"))
