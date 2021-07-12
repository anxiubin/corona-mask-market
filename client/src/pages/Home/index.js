import React, { useState, useEffect } from "react"
import LocalInfections from "./LocalInfections"
import KoreaMap from "./KoreaMap"
import { useDataState } from "../../DataContext"

function Home() {
	const data = useDataState()

	const [trueNum, setTrueNum] = useState(0)
	const [deadNum, setDeadNum] = useState(0)
	const [falseNum, setFalseNum] = useState(0)

	//count up for infectionTrue
	useEffect(() => {
		let diff
		const counter = () => {
			diff = data.confirmed - trueNum

			if (diff > 0) {
				setTrueNum((trueNum) => trueNum + Math.ceil(diff / 5))
			}
		}

		let runCounter

		if (trueNum < data.confirmed) {
			runCounter = setTimeout(() => {
				counter()
			}, 10)
		}
		return () => clearTimeout(runCounter)
	}, [trueNum, data])

	//count up for infectionDead
	useEffect(() => {
		let diff
		const counter = () => {
			diff = data.dead - deadNum

			if (diff > 0) {
				setDeadNum((num) => num + Math.ceil(diff / 5))
			}
		}

		let runCounter

		if (deadNum < data.dead) {
			runCounter = setTimeout(() => {
				counter()
			}, 10)
		}
		return () => clearTimeout(runCounter)
	}, [deadNum, data])

	//count up for infectionFalse
	useEffect(() => {
		let diff
		const counter = () => {
			diff = data.deisolated - falseNum

			if (diff > 0) {
				setFalseNum((falseNum) => falseNum + Math.ceil(diff / 5))
			}
		}

		let runCounter

		if (falseNum < data.deisolated) {
			runCounter = setTimeout(() => {
				counter()
			}, 10)
		}
		return () => clearTimeout(runCounter)
	}, [falseNum, data])

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
