import React from 'react';
import '../App.css';


//추후 크롤링해서 데이터 가져온 것 state로 관리 (컨텍스트API 활용)


function LocalInfections() {
    
    //테스트용 하드코딩 데이터

    const cities = [
        {
            id: 'seoul',
            idKR: '서울',
            num: 100,
        },
        {
            id: 'gyeonggi',
            idKR: '경기',
            num: 120,
        },
        {
            id: 'incheon',
            idKR: '인천',
            num: 9,
        },
        {
            id: 'gangwon',
            idKR: '강원',
            num: 25,
        },
        {
            id: 'chungnam',
            idKR: '충남',
            num: 90,
        },
        {
            id: 'chungbuk',
            idKR: '충북',
            num: 15,
        },
        {
            id: 'sejong',
            idKR: '세종',
            num: 1,
        },
        {
            id: 'daejeon',
            idKR: '대전',
            num: 18,
        },
        {
            id: 'jeonbuk',
            idKR: '전북',
            num: 7,
        },
        {
            id: 'jeonnam',
            idKR: '전남',
            num: 5,
        },
        {
            id: 'gwangju',
            idKR: '광주',
            num: 13,
        },
        {
            id: 'kyeongbuk',
            idKR: '경북',
            num: 984,
        },
        {
            id: 'kyeongnam',
            idKR: '경남',
            num: 77,
        },
        {
            id: 'daegu',
            idKR: '대구',
            num: 4693,
        },
        {
            id: 'ulsan',
            idKR: '울산',
            num: 23,
        },
        {
            id: 'busan',
            idKR: '부산',
            num: 95,
        },
        {
            id: 'jeju',
            idKR: '제주',
            num: 4,
        },
    ];


    return (
        <>
        {cities.map(city => (
            <div className={`city-common ${city.id}`} key={city.id}>{city.idKR}
                <div className="num">{city.num}</div>
            </div>
        ))}
        </>
    );
}

export default LocalInfections;