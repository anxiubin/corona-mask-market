import React, { createContext , useContext } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import { useState } from 'react';
import { useEffect } from 'react';
import produce from 'immer';

dotenv.config();

const COVID_APIKEY = process.env.REACT_APP_COVID19_API_KEY;

const cities = [
    {
        id: 'seoul',
        idKR: '서울',
        idToast: 'KR-SU',
        num: 0,
        url: 'http://www.seoul.go.kr/coronaV/coronaStatus.do'
    },
    {
        id: 'gyeonggi',
        idKR: '경기',
        idToast: 'KR-GG',
        num: 0,
        url: 'https://www.gg.go.kr/bbs/boardView.do?bsIdx=464&bIdx=2296956&menuId=1535'
    },
    {
        id: 'incheon',
        idKR: '인천',
        idToast: 'KR-IC',
        num: 0,
        url: 'https://www.incheon.go.kr/'
    },
    {
        id: 'gangwon',
        idKR: '강원',
        idToast: 'KR-GW',
        num: 0,
        url: 'http://www.provin.gangwon.kr/'
    },
    {
        id: 'chungnam',
        idKR: '충남',
        idToast: 'KR-SC',
        num: 0,
        url: 'http://www.chungnam.go.kr/coronaStatus.do'
    },
    {
        id: 'chungbuk',
        idKR: '충북',
        idToast: 'KR-NC',
        num: 0,
        url: 'http://www.chungbuk.go.kr/'
    },
    {
        id: 'sejong',
        idKR: '세종',
        idToast: 'KR-SE',
        num: 0,
        url: 'https://www.sejong.go.kr/life/sub05_0704.do'
    },
    {
        id: 'daejeon',
        idKR: '대전',
        idToast: 'KR-DJ',
        num: 0,
        url: 'https://www.daejeon.go.kr/corona19/index.do'
    },
    {
        id: 'jeonbuk',
        idKR: '전북',
        idToast: 'KR-NJ',
        num: 0,
        url: 'http://www.jeonbuk.go.kr/'
    },
    {
        id: 'jeonnam',
        idKR: '전남',
        idToast: 'KR-SJ',
        num: 0,
        url: 'https://www.jeonnam.go.kr/coronaMainPage.do'
    },
    {
        id: 'gwangju',
        idKR: '광주',
        idToast: 'KR-GJ',
        num: 0,
        url: 'https://www.gwangju.go.kr/'
    },
    {
        id: 'gyeongbuk',
        idKR: '경북',
        idToast: 'KR-NG',
        num: 0,
        url: 'http://www.gb.go.kr/Main/index.html'
    },
    {
        id: 'gyeongnam',
        idKR: '경남',
        idToast: 'KR-SG',
        num: 0,
        url: 'http://www.gyeongnam.go.kr/corona.html'
    },
    {
        id: 'daegu',
        idKR: '대구',
        idToast: 'KR-DG',
        num: 0,
        url: 'http://www.daegu.go.kr/'
    },
    {
        id: 'ulsan',
        idKR: '울산',
        idToast: 'KR-US',
        num: 0,
        url: 'http://www.ulsan.go.kr/corona.jsp'
    },
    {
        id: 'busan',
        idKR: '부산',
        idToast: 'KR-BS',
        num: 0,
        url: 'http://www.busan.go.kr/corona19/index'
    },
    {
        id: 'jeju',
        idKR: '제주',
        idToast: 'KR-JJ',
        num: 0,
        url: 'https://jeju.go.kr/covid19.jsp'
    },
    {
        id: 'quarantine',
        idKR: '검역',
        num: 0,
        url: 'http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun='
    },
];

const getCovid19Data = (city) => {
    return axios({
        method: "GET",
        url: `https://cors-anywhere.herokuapp.com/https://api.dropper.tech/covid19/status/korea?locale=${city}`,
        //CORS 이슈 프록시 서버를 통해 해결
        headers: {
            'APIKey': COVID_APIKEY,
        },
    });    
};

const DataStateContext = createContext(null);
const LocalDataStateContext = createContext(null);

//context API provider사용할 수 있는 컴포넌트 
export function DataProvider({children}){

    const [state, setState] = useState({
        certified: undefined,
        dead: undefined,
        deisolated: undefined,
        updateTime: undefined,
    });

    const [local, setLocal] = useState(cities);

    //전국 확진자
    useEffect(() => {
        if(state.certified === undefined) {
            getCovid19Data('synthesize').then(response => {
                if(response.data.status.code === 200) {
                    const updateTime = new Date(response.data.data[0].announced_timestamp * 1000);
                    const dateString = updateTime.toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    console.log('result', response.data);
                    console.log('time', dateString );

                    setState({
                        ...state,
                        certified: response.data.data[0].certified,
                        dead: response.data.data[0].dead,
                        deisolated: response.data.data[0].deisolated,
                        updateTime: dateString,
                    });
                } else {
                    console.log('There is an error');
                }
            }).catch(e => console.error(e));
        }
    },[]);

    useEffect(() => {
        //마운트 된 이후 6시간 단위 업데이트
        const dataInterval = setInterval(() => {
            getCovid19Data().then(response => {
                if(response.data.status.code === 200) {
                    console.log('result2', response.data.data[0]);
                    setState({
                        ...state,
                        certified: response.data.data[0].certified,
                        dead: response.data.data[0].dead,
                        deisolated: response.data.data[0].deisolated,
                    });
                } else {
                    console.log('There is an error');
                }
            }).catch(e => console.error(e));
        }, 21600000);

        return () => {
            clearInterval(dataInterval);
            console.log('unmount');
        }
    },[]);


    //도시 별 확진자
    useEffect(() => {
        if(local[0].num === 0) {
            local.forEach((city, i) => {
                getCovid19Data(city.id).then(response => {    
                    if(response.data.status.code === 200) {
                        setLocal(
                            produce(draft => {
                                draft[i].num = response.data.data[0].certified;
                            })
                        ); //Immer 사용
                    } else {
                        console.log('There is an error');
                    }
                }).catch(e => console.error(e));
            })               
        }
    },[]);

    useEffect(() => {
        //마운트 된 이후 6시간 단위 업데이트
        const dataInterval = setInterval(() => {
            local.forEach((city, i) => {
                getCovid19Data(city.id).then(response => {    
                    if(response.data.status.code === 200) {
                        setLocal(
                            produce(draft => {
                                draft[i].num = response.data.data[0].certified;
                            })
                        ); //Immer 사용
                    } else {
                        console.log('There is an error');
                    }
                }).catch(e => console.error(e));
            }) 
        }, 21600000);
            
        return () => clearInterval(dataInterval);
    },[]);

    return (
        <DataStateContext.Provider value={state}>
            <LocalDataStateContext.Provider value={local}>
                {children}
            </LocalDataStateContext.Provider>
        </DataStateContext.Provider>
    );
}

//custom HOOK
export function useDataState() {
    const context = useContext(DataStateContext);
    if(!context) {
      throw new Error('Cannot find DataStateContext')
    }
      return useContext(DataStateContext);
  }

export function useLocalDataState() {
    const context = useContext(LocalDataStateContext);
    if(!context) {
      throw new Error('Cannot find LocalDataStateContext')
    }
      return useContext(LocalDataStateContext);
  }
