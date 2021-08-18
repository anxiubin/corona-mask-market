import React, { useState, useEffect, useCallback } from "react"
import LocalInfections from "./LocalInfections"
import KoreaMap from "./KoreaMap"
import { useDataState } from "../../DataContext"

function Home() {
	const data = useDataState()

	const [trueNum, setTrueNum] = useState(0)
	const [deadNum, setDeadNum] = useState(0)
	const [falseNum, setFalseNum] = useState(0)

	let runTrueNumCounter, runDeadNumCounter, runFalseNumCounter

	const handleCountUp = (type, num, timer, setter) => {
		let diff
		const counter = () => {
			diff = data[type] - num
			if (diff > 0) {
				setter((num) => num + Math.ceil(diff / 5))
			}
		}

		if (num < data[type]) {
			timer = setTimeout(() => {
				counter()
			}, 10)
		}
	}
	//count up for infectionTrue
	useEffect(() => {
		handleCountUp("confirmed", trueNum, runTrueNumCounter, setTrueNum)
		return () => clearTimeout(runTrueNumCounter)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trueNum, data, runTrueNumCounter])

	//count up for infectionDead
	useEffect(() => {
		handleCountUp("dead", deadNum, runDeadNumCounter, setDeadNum)
		return () => clearTimeout(runDeadNumCounter)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deadNum, data, runDeadNumCounter])

	//count up for infectionFalse
	useEffect(() => {
		handleCountUp("deisolated", falseNum, runFalseNumCounter, setFalseNum)
		return () => clearTimeout(runFalseNumCounter)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [falseNum, data, runFalseNumCounter])

	return (
		<div>
			<section>
				<div className="home-img-section">
					<h1>#코로나 마스크 마켓</h1>
				</div>
			</section>
			<section className="infection-wrap">
				<div>
					<div className="createTime">{data.createTime} 기준</div>
					<div className="infection-data">
						<div className="infection-true">
							확진
							<div className="infection-true-num">{trueNum}</div>
						</div>
						<div className="infection-dead">
							사망
							<div className="infection-dead-num">{deadNum}</div>
						</div>
						<div className="infection-false">
							격리해제
							<div className="infection-false-num">{falseNum}</div>
						</div>
					</div>
				</div>
				<div className="map">
					<KoreaMap />
					<LocalInfections />
				</div>
			</section>
		</div>
	)
}

export default Home
