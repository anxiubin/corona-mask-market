import React from 'react';
import {Spring} from 'react-spring/renderprops'
import LocalInfections from './LocalInfections';

function Home() {

    //추후 크롤링해서 데이터 가져온 것 state로 관리 (컨텍스트API 활용)

  const infectionTrue = 6593;
  const infectionDead = 43;
  const infectionFalse = 108;

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
                        <Spring
                        from={{ number: 0 }}
                        to={{ number: infectionTrue }}>
                        {props => <div>{Math.round(props.number)}</div>}
                        </Spring>
                    </div>
                </div>
                <div className="infection-dead">
                    사망
                    <div className="infection-dead-num">
                        <Spring
                        from={{ number: 0 }}
                        to={{ number: infectionDead }}>
                        {props => <div>{Math.round(props.number)}</div>}
                        </Spring>
                    </div>
                </div>
                <div className="infection-false">
                    격리해제
                    <div className="infection-false-num">
                        <Spring
                        from={{ number: 0 }}
                        to={{ number: infectionFalse }}>
                        {props => <div>{Math.round(props.number)}</div>}
                        </Spring>
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