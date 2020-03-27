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
        num: 0,
    },
    {
        id: 'gyeonggi',
        idKR: '경기',
        num: 0,
    },
    {
        id: 'incheon',
        idKR: '인천',
        num: 0,
    },
    {
        id: 'gangwon',
        idKR: '강원',
        num: 0,
    },
    {
        id: 'chungnam',
        idKR: '충남',
        num: 0,
    },
    {
        id: 'chungbuk',
        idKR: '충북',
        num: 0,
    },
    {
        id: 'sejong',
        idKR: '세종',
        num: 0,
    },
    {
        id: 'daejeon',
        idKR: '대전',
        num: 0,
    },
    {
        id: 'jeonbuk',
        idKR: '전북',
        num: 0,
    },
    {
        id: 'jeonnam',
        idKR: '전남',
        num: 0,
    },
    {
        id: 'gwangju',
        idKR: '광주',
        num: 0,
    },
    {
        id: 'gyeongbuk',
        idKR: '경북',
        num: 0,
    },
    {
        id: 'gyeongnam',
        idKR: '경남',
        num: 0,
    },
    {
        id: 'daegu',
        idKR: '대구',
        num: 0,
    },
    {
        id: 'ulsan',
        idKR: '울산',
        num: 0,
    },
    {
        id: 'busan',
        idKR: '부산',
        num: 0,
    },
    {
        id: 'jeju',
        idKR: '제주',
        num: 0,
    },
    {
        id: 'quarantine',
        idKR: '검역',
        num: 0,
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

        return () => clearInterval(dataInterval);
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
