import React, {useState, useEffect} from 'react';
import LocalInfections from './LocalInfections';
import { useDataState } from '../DataContext';

import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const COVID_APIKEY = process.env.REACT_APP_COVID19_API_KEY;

function Home() {

    const data = useDataState();
 
    const [trueNum, setTrueNum] = useState(0);
    const [deadNum, setDeadNum] = useState(0);
    const [falseNum, setFalseNum] = useState(0);

    useEffect(() => {
        let diff;
        const counter = () => {
            diff = data.certified - trueNum;

        if(diff > 0) {
            setTrueNum(trueNum => trueNum + Math.ceil(diff / 5));
            }
        }

        let runCounter;

        if(trueNum < data.certified) {
            runCounter = setTimeout(() => {
                counter();
            }, 10);
        }
        return () => clearTimeout(runCounter);
    }, [trueNum, data]);

    //count up for infectionDead
    useEffect(() => {
        const interval = setInterval(() => {
            if(deadNum < data.dead) {
                setDeadNum(num => num + 1);
            }
        }, 1);
        return () => clearInterval(interval);
    }, [deadNum, data]);

    //count up for infectionFalse
    useEffect(() => {
        let diff;
        const counter = () => {
            diff = data.deisolated - falseNum;

        if(diff > 0) {
            setFalseNum(falseNum => falseNum + Math.ceil(diff / 5));
            }
        }

        let runCounter;

        if(falseNum < data.deisolated) {
            runCounter = setTimeout(() => {
                counter();
            }, 10);
        }
        return () => clearTimeout(runCounter);
    }, [falseNum, data]);
 
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
                <div>
                    <div className="updatetime">
                        {data.updateTime} 기준
                    </div>
                    <div className="infection-data">
                        <div className="infection-true">
                            확진
                            <div className="infection-true-num">
                                {trueNum}
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
                </div>
                <div className="map">
                    <LocalInfections />
                </div>
            </section>

        </div>
    );
}

export default Home;