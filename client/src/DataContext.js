import React, { createContext, useContext, useCallback } from "react"
import { useState } from "react"
import { useEffect } from "react"
import produce from "immer"
import axios from "axios"
import getToday from "./utils/getToday"
import getYesterday from "./utils/getYesterday"

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
		url: "https://www.gg.go.kr/bbs/boardView.do?bsIdx=464&bIdx=2296956&menuId=1535",
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
		url: "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=",
	},
]

const DataStateContext = createContext(null)
const LocalDataStateContext = createContext(null)

export function DataProvider({ children }) {
	const [total, setTotal] = useState({
		confirmed: null,
		dead: null,
		deisolated: null,
		createTime: null,
	})

	const [local, setLocal] = useState(cities)

	const todayDate = getToday("today")
	const yesterdayDate = getYesterday("yesterday")

	const handleSetData = useCallback(
		(data) => {
			const { gubunEn, defCnt, deathCnt, isolClearCnt, createDt } = data
			if (gubunEn === "Total") {
				setTotal({
					...total,
					confirmed: defCnt,
					dead: deathCnt,
					deisolated: isolClearCnt,
					createTime: new Date(createDt).toLocaleString(),
				})
			} else {
				local.forEach((city, idx) => {
					setLocal(
						produce((draft) => {
							if (city.id === gubunEn) {
								draft[idx].num = defCnt
							}
						})
					)
				})
			}
		},
		[local, total, setTotal, setLocal]
	)

	const getCovid19Data = useCallback(() => {
		axios
			.get("/api/covid/statistics", {
				params: {
					pageNo: 1,
					numOfRows: 10,
					startCreateDt: yesterdayDate,
					endCreateDt: todayDate,
				},
			})
			.then(function (res) {
				const dataArr = res.data.items.item?.slice(0, 19)

				dataArr.forEach((data) => {
					handleSetData(data)
				})
			})
			.catch(function (error) {
				console.log(error)
			})
	}, [yesterdayDate, todayDate, handleSetData])

	// covid19 api 호출
	useEffect(() => {
		getCovid19Data()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<DataStateContext.Provider value={total}>
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
