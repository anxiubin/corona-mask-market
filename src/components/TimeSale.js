import React, {useState, useEffect} from 'react';
import { MdTimer } from "react-icons/md";

function TimeSale() {


//추후 크롤링해서 데이터 가져온 것 state로 관리 (컨텍스트API 활용)
  const mima = {
      price : 14900,
      name : '마마스크 미마 미세먼지 황사 보건용마스크 10개입(KF94)',
      time : 9,
      date : '2020-03-07:13:58:00+0900'
  }

  let itemText = '판매시작'

  const [date, setDate] = useState(new Date());

  const [timer, setTimer] = useState('');

  function getTime() {
    const dday = new Date(mima.date);
    setDate(new Date())
    const distance = dday - date;
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setTimer(`${
        hours < 10 ? `0${hours}` : hours
      }h ${minutes < 10 ? `0${minutes}` : minutes}m ${
        seconds < 10 ? `0${seconds}` : seconds
      }s`)
  }
  


  useEffect(() => {
    const interval = setInterval(() => {
        if(timer === '00h 00m 00s') {
            clearInterval(interval);
          } else if(timer[1] === '-') {
            clearInterval(interval);
          } else {
              getTime()
              console.log(timer[1])
            }
    }, 1000);
    return () => clearInterval(interval);
  }, [date, timer]);

  
  //useEffect & setTimeout 으로 판매시작으로 바뀐 태그의 스타일이랑 itemtext 바꾸는 로직 짜기

  //리렌더링했을때 타이머 오류 고치는 로직 짜기


  return (
    <div>
        <section>
            <div className="timesale-section">
            <h1>
                #타임세일
                </h1>

            <h3 className="timesale-section-text">
                특정 시간에 맞춰 마스크를 구매해보세요!
                </h3>
            </div>
        </section>
        <section className="mask-section">

            {/* 마스크 리스트 배열에 담아서 관리 후 map으로 돌아가며 아이템 생성*/}
            <div className="mask-wrap">
                <div className="mask-img" title ="mask"></div>
                <div className="item-details">
                    <h3 className="item-price">
                        {mima.price}원 
                    </h3>
                    <h3 className="item-name">
                        {mima.name}
                    </h3>
                    <h4 className="item-time">
                        판매 예정 시간 : {mima.time < 12 ? `오전 ${mima.time}시` : `오후 ${mima.time}시`}
                    </h4>
                </div>
            </div>

            {timer !== '00h 00m 00s' ? 
            <h2 className="item-timer">
                <MdTimer /> {timer}
            </h2> :
            <h2 className="item-selling">
                {itemText}
            </h2>
            }

                 
        </section>
    </div>
  );
}
export default TimeSale;

