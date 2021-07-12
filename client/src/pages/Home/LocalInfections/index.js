import React from "react"
import { useLocalDataState } from "../../../DataContext"

function LocalInfections() {
	const localData = useLocalDataState()

	const onClick = (url) => {
		window.open(`${url}`)
	}

	return (
		<>
			{localData.map((city) => (
				<div
					className={`city-common ${city.id}`}
					key={city.id}
					onClick={() => onClick(city.url)}
					title="새창"
				>
					<div className="cityname">{city.idKR}</div>
					<div className="num">{city.num}</div>
				</div>
			))}
		</>
	)
}

export default LocalInfections
