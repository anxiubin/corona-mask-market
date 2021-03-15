import React, { createContext, useContext } from "react"
import axios from "axios"
import dotenv from "dotenv"
import { useState } from "react"
import { useEffect } from "react"
import produce from "immer"

dotenv.config()

const COVID_APIKEY = process.env.REACT_APP_COVID19_API_KEY
const cities = [
	{
		id: "Seoul",
		idKR: "서울",
		idToast: "KR-SU",
		num: 0,
		todayNum: 0,
		url: "http://www.seoul.go.kr/coronaV/coronaStatus.do",
	},
	{
		id: "Gyeonggi-do",
		idKR: "경기",
		idToast: "KR-GG",
		num: 0,
		todayNum: 0,
		url:
			"https://www.gg.go.kr/bbs/boardView.do?bsIdx=464&bIdx=2296956&menuId=1535",
	},
	{
		id: "Incheon",
		idKR: "인천",
		idToast: "KR-IC",
		num: 0,
		todayNum: 0,
		url: "https://www.incheon.go.kr/",
	},
	{
		id: "Gangwon-do",
		idKR: "강원",
		idToast: "KR-GW",
		num: 0,
		todayNum: 0,
		url: "http://www.provin.gangwon.kr/",
	},
	{
		id: "Chungcheongnam-do",
		idKR: "충남",
		idToast: "KR-SC",
		num: 0,
		todayNum: 0,
		url: "http://www.chungnam.go.kr/coronaStatus.do",
	},
	{
		id: "Chungcheongbuk-do",
		idKR: "충북",
		idToast: "KR-NC",
		num: 0,
		todayNum: 0,
		url: "http://www.chungbuk.go.kr/",
	},
	{
		id: "Sejong",
		idKR: "세종",
		idToast: "KR-SE",
		num: 0,
		todayNum: 0,
		url: "https://www.sejong.go.kr/life/sub05_0704.do",
	},
	{
		id: "Daejeon",
		idKR: "대전",
		idToast: "KR-DJ",
		num: 0,
		todayNum: 0,
		url: "https://www.daejeon.go.kr/corona19/index.do",
	},
	{
		id: "Jeollabuk-do",
		idKR: "전북",
		idToast: "KR-NJ",
		num: 0,
		todayNum: 0,
		url: "http://www.jeonbuk.go.kr/",
	},
	{
		id: "Jeollanam-do",
		idKR: "전남",
		idToast: "KR-SJ",
		num: 0,
		todayNum: 0,
		url: "https://www.jeonnam.go.kr/coronaMainPage.do",
	},
	{
		id: "Gwangju",
		idKR: "광주",
		idToast: "KR-GJ",
		num: 0,
		todayNum: 0,
		url: "https://www.gwangju.go.kr/",
	},
	{
		id: "Gyeongsangbuk-do",
		idKR: "경북",
		idToast: "KR-NG",
		num: 0,
		todayNum: 0,
		url: "http://www.gb.go.kr/Main/index.html",
	},
	{
		id: "Gyeongsangnam-do",
		idKR: "경남",
		idToast: "KR-SG",
		num: 0,
		todayNum: 0,
		url: "http://www.gyeongnam.go.kr/corona.html",
	},
	{
		id: "Daegu",
		idKR: "대구",
		idToast: "KR-DG",
		num: 0,
		todayNum: 0,
		url: "http://www.daegu.go.kr/",
	},
	{
		id: "Ulsan",
		idKR: "울산",
		idToast: "KR-US",
		num: 0,
		todayNum: 0,
		url: "http://www.ulsan.go.kr/corona.jsp",
	},
	{
		id: "Busan",
		idKR: "부산",
		idToast: "KR-BS",
		num: 0,
		todayNum: 0,
		url: "http://www.busan.go.kr/corona19/index",
	},
	{
		id: "Jeju",
		idKR: "제주",
		idToast: "KR-JJ",
		num: 0,
		todayNum: 0,
		url: "https://jeju.go.kr/covid19.jsp",
	},
	{
		id: "Lazaretto",
		idKR: "검역",
		num: 0,
		todayNum: 0,
		url:
			"http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=",
	},
]

const DataStateContext = createContext(null)
const LocalDataStateContext = createContext(null)

//context API provider사용할 수 있는 컴포넌트
export function DataProvider({ children }) {
	const [state, setState] = useState({
		confirmed: undefined,
		dead: undefined,
		deisolated: undefined,
		updateTime: undefined,
	})

	const [local, setLocal] = useState(cities)

	//전국 확진자
	// useEffect(() => {
	// 	if (state.confirmed === undefined) {
	// 		getCovid19Data("synthesize")
	// 			.then((response) => {
	// 				if (response.data.status.code === 200) {
	// 					const updateTime = new Date(
	// 						response.data.data[0].announced_timestamp * 1000
	// 					)
	// 					const dateString = updateTime.toLocaleString("ko-KR", {
	// 						year: "numeric",
	// 						month: "long",
	// 						day: "numeric",
	// 					})

	// 					console.log("result", response.data)
	// 					console.log("time", dateString)

	// 					setState({
	// 						...state,
	// 						confirmed: response.data.data[0].confirmed,
	// 						dead: response.data.data[0].dead,
	// 						deisolated: response.data.data[0].deisolated,
	// 						updateTime: dateString,
	// 					})
	// 				} else {
	// 					console.log("There is an error")
	// 				}
	// 			})
	// 			.catch((e) => console.error(e))
	// 	}
	// }, [])

	// covid19 api 호출
	useEffect(() => {
		var xhr = new XMLHttpRequest()
		var url = "/getCovid19SidoInfStateJson"
		var queryParams =
			"?" + encodeURIComponent("ServiceKey") + "=" + COVID_APIKEY
		queryParams +=
			"&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1")
		queryParams +=
			"&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10")
		queryParams +=
			"&" +
			encodeURIComponent("startCreateDt") +
			"=" +
			encodeURIComponent("20210315")
		queryParams +=
			"&" +
			encodeURIComponent("endCreateDt") +
			"=" +
			encodeURIComponent("20210315")
		xhr.open("GET", url + queryParams)
		xhr.onreadystatechange = function () {
			if (this.readyState === 4) {
				var xml = this.responseXML
				var regionsData = xml.getElementsByTagName("gubunEn")
				var confirmedData = xml.getElementsByTagName("defCnt")
				var deathData = xml.getElementsByTagName("deathCnt")
				var deisolatedData = xml.getElementsByTagName("isolClearCnt")
				var updateTimeData = xml.getElementsByTagName("createDt")

				if (local[0].num === 0) {
					for (var i = 0; i < regionsData.length; i++) {
						var region = regionsData[i].childNodes[0].nodeValue
						var confirmed = confirmedData[i].childNodes[0].nodeValue
						var dead = deathData[i].childNodes[0].nodeValue
						var deisolated = deisolatedData[i].childNodes[0].nodeValue
						var updateTime = updateTimeData[i].childNodes[0].nodeValue

						// eslint-disable-next-line no-loop-func
						local.forEach((city, index) => {
							if (city.id === region)
								setLocal(
									produce((draft) => {
										draft[index].num = confirmed
									})
								)
						})
					}
					if (region === "Total") {
						setState({
							...state,
							confirmed,
							dead,
							deisolated,
							updateTime,
						})
					}
				}
			}
		}

		xhr.send("")
	}, [])

	return (
		<DataStateContext.Provider value={state}>
			<LocalDataStateContext.Provider value={local}>
				{children}
			</LocalDataStateContext.Provider>
		</DataStateContext.Provider>
	)
}

//custom HOOK
export function useDataState() {
	const context = useContext(DataStateContext)
	if (!context) {
		throw new Error("Cannot find DataStateContext")
	}
	return useContext(DataStateContext)
}

export function useLocalDataState() {
	const context = useContext(LocalDataStateContext)
	if (!context) {
		throw new Error("Cannot find LocalDataStateContext")
	}
	return useContext(LocalDataStateContext)
}
