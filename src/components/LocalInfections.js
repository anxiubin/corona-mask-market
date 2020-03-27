import React from 'react';
import { useLocalDataState } from '../DataContext';

function LocalInfections() {

    const localData = useLocalDataState();

    return (
        <>
        {localData.map((city) => (
            <div className={`city-common ${city.id}`} key={city.id}>
                <div className="cityname">{city.idKR}</div>
                <div className="num">{city.num}</div>
            </div>
        ))}
        </>
    );
}

export default LocalInfections;