import React from 'react';
import LocalInfections from './LocalInfections';

function Home() {

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
                        4500
                    </div>
                </div>
                <div className="infection-dead">
                    사망
                    <div className="infection-dead-num">
                        30
                    </div>
                </div>
                <div className="infection-false">
                    격리해제
                    <div className="infection-false-num">
                        12000
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