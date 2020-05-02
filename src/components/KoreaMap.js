import React, {useEffect} from 'react';
import { useLocalDataState } from '../DataContext';
import {MapChart} from '@toast-ui/react-chart';
import TuiChart from 'tui-chart';
import 'tui-chart/dist/maps/south-korea';


function KoreaMap() {

    const localData = useLocalDataState();

    let mapData = {
        series: []
    } ;
    let mapDataArr = [];
    
    localData.forEach(city => {
        if(city.idToast && city.num !==0) {
            mapDataArr.push({
                code: city.idToast,
                data: city.num
            })
        }
    });

    mapData.series = mapDataArr;

 


    const mapOptions = {
        chart: {
            width: 600,
            height: 750,
            title: {
                text: '시도별 확진자 현황',
                align: 'center',
                offsetY: 30
            }
        },
        map: 'south-korea',
        legend: {
            align: 'center'
        },
    };
    var myTheme = {
        series: {
            startColor: '#FCE1E1',
            endColor: '#DC3736'
        },
        title: {
            fontFamily: 'Lato',
            fontWeight: 'bold',
            fontSize: 20,
        }
    };

    TuiChart.registerTheme('myTheme', myTheme);
    mapOptions.theme = 'myTheme';

    return (
        <MapChart 
            data={mapData} 
            options={mapOptions} 
        />
    );
}

export default KoreaMap;