import React from 'react';
import '../App.css';
import './CityCircle.scss';


//크롤링해서 데이터 가져온 것 변수에 담기



function LocalInfections() {

    const cities = [
        {
          id: 'seoul',
          idKR: '서울',
          num: 100,
        },
        {
          id: 'incheon',
          idKR: '인천',
          num: 30,
        }
    ];


    return (
        <>
        {cities.map(city => (
            <div className={`city-common ${city.id}`}>{city.idKR}
                <span className="num">{city.num}</span>
            </div>
        ))}
        </>
    );
}

export default LocalInfections;