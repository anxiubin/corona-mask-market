import React, {useState, useEffect} from 'react';
import LocalInfections from './LocalInfections';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const COVID_APIKEY = process.env.REACT_APP_COVID19_API_KEY;

function Home() {
    
    //추후 크롤링해서 데이터 가져온 것 state로 관리 (컨텍스트API 활용)

    useEffect( () => {
        console.log('useEffect start');
        getCovid19Data().then(response => {
            console.log('state code', response);
        }).catch(e => console.log(e));
    },[]);

    

  const infectionTrue = 6593;
  const infectionDead = 43;
  const infectionFalse = 108;

  const [trueNum, setTrueNum] = useState(0);
  const [deadNum, setDeadNum] = useState(0);
  const [falseNum, setFalseNum] = useState(0);



  //count up for infectionTrue
  useEffect(() => {
    const interval = setInterval(() => {
        if(trueNum < infectionTrue) {
            setTrueNum(num => num + infectionTrue / 100);
        }
    }, 10);
    return () => clearInterval(interval);
  }, [trueNum]);

  //count up for infectionDead
  useEffect(() => {
    const interval = setInterval(() => {
        if(deadNum < infectionDead) {
            setDeadNum(num => num + 1);
        }
    }, 10);
    return () => clearInterval(interval);
  }, [deadNum]);

  //count up for infectionFalse
  useEffect(() => {
    const interval = setInterval(() => {
        if(falseNum < infectionFalse) {
            setFalseNum(num => num + 1);
        }
    }, 10);
    return () => clearInterval(interval);
  }, [falseNum]);


  return (
    <div>
        <section>
           <div className="home-img-section">
               <h1>
                   #코로나 마스크 마켓
               </h1>
           </div>
        </section>
        <section className="infection-wrap">
            <div className="infection-data">
                <div className="infection-true">
                    확진
                    <div className="infection-true-num">
                        {Math.round(trueNum)}
                    </div>
                </div>
                <div className="infection-dead">
                    사망
                    <div className="infection-dead-num">
                        {deadNum}
                    </div>
                </div>
                <div className="infection-false">
                    격리해제
                    <div className="infection-false-num">
                        {falseNum}
                    </div>
                </div>
            </div>
            <div className="map">
                <LocalInfections />
            </div>
        </section>

    </div>
  );
}

function getCovid19Data() {
    return axios({
        method: "GET",
        url: "https://cors-anywhere.herokuapp.com/https://api.dropper.tech/covid19/status/korea?locale=synthesize",
        headers: {
            'APIKey': COVID_APIKEY,
        },
    });    
}

// function printCovid19Data() {

// }

export default Home;