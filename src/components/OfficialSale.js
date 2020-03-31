import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MapModal from './MapModal'


function OfficialSale() {

    const [kakao] = useState(window.kakao);
    const [location, setLocation] = useState({ //useReducer 사용
        lat: null,
        lng: null,
    })
    
    const { lat, lng } = location;
    const [map, setMap] = useState(null);

    useEffect(() => {

        if(!lat && !lng) {
            //내 위치 불러오기
            const getLocation = (calback) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            const { coords } = position
                            const { latitude, longitude } = coords
                            setLocation({
                                ...location,
                                lat: latitude,
                                lng: longitude
                            })
                        },
                        () => {
                            console.log("내 위치를 불러올 수 없습니다.")
                        }
                    )
                } else {
                    console.log("위치를 불러올 수 없습니다.")
                }
            }
            getLocation();
        }

        if(!(!!map) && lat && lng) {
            const mapContainer = document.getElementById('kakao-map'),
            mapOption = {
                center: new kakao.maps.LatLng(lat, lng),
                level: 3,
            };

            // var map = new kakao.maps.Map(mapContainer, mapOption);
            const mapNew = new kakao.maps.Map(mapContainer, mapOption);

            const moveLatLng = new kakao.maps.LatLng(lat, lng);
            mapNew.panTo(moveLatLng);

            const zoomControl = new kakao.maps.ZoomControl();
            mapNew.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
            setMap(mapNew);
        }

    }, [lat, lng, map])

    const mounted = useRef(false);

    //마우스 드래그로 지도 이동할 때
    useEffect(() => {

        if(!mounted.current) {
            mounted.current = true;
        } else {
            kakao.maps.event.addListener(map, 'dragend', function() {      
                var level = map.getLevel();
                console.log(level);
                map.setLevel(level); 

                var latlng = map.getCenter(); 

                setLocation({
                    ...location,
                    lat: latlng.getLat(),
                    lng: latlng.getLng()
                })

            });

            setMap(map);
    
        }

      }, [map]);


    //지도에 약국들 출력
    useEffect(() => {

        if(lat && lng) {
            async function getShops() {
                try {
                    //화면 지도 반경만큼 약국 다 보여주기
                    return await axios.get(`https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=1000`)
    
                } catch (error) {
                    console.error(error);
                }
                
            }
    
            async function printShops() {
                    if(lat && lng) {
                        const shops = await getShops();
                        console.log(shops.data);
                    
                        if(shops.data.count) {
    
                            shops.data.stores.forEach((store, i) => {
                                const {created_at, name, remain_stat, stock_at, lat, lng} = shops.data.stores[i];
    
                                // 커스텀 오버레이에 표시할 내용    
                                var content = document.createElement('div');

                                //재고 상태[100개 이상(녹색): 'plenty' / 30개 이상 100개미만(노랑색): 'some' / 2개 이상 30개 미만(빨강색): 'few' / 1개 이하(회색): 'empty' / 판매중지: 'break']

                                let stockColor = '';
                                let stockText = '';

                                switch(remain_stat) {
                                    case 'plenty':
                                        stockColor = "green";
                                        stockText = "100개 이상";
                                      break;
                                    case 'some':
                                        stockColor = "#ffd800";
                                        stockText = "30개~100개";
                                      break;
                                    case 'few':
                                        stockColor = "#e00000";
                                        stockText = "2개~30개";
                                      break;
                                    case 'empty':
                                        stockColor = "#6d6d6d";
                                        stockText = "품절";
                                      break;
                                    case 'break':
                                        stockColor = "#6d6d6d";
                                        stockText = "판매중지";
                                      break;
                                    default:
                                        stockColor = "black";
                                        stockText = "정보없음";
                                  }

                                content.style.backgroundColor = stockColor;
                                content.style.borderRadius = '3px';

                                content.innerHTML = `
                                <div class="store-label">${stockText}</div>
                                <div class="store-details">
                                    <div style="padding-bottom:3px"> ${name}</div>
                                    <div class="text-long"> 업데이트: ${created_at}</div>
                                    <div class="text-long"> 입고시간: ${stock_at}</div>
                                </div>
                                `
    
                                var position = new kakao.maps.LatLng(lat,lng);  
    
                                var customOverlay = new kakao.maps.CustomOverlay({
                                    position: position,
                                    content: content,
                                });

    
                                customOverlay.setMap(map);    

                                //label detail 2개 커스텀 오버레이 컴포넌트 나누기
                            });
                        }
                    }   
            }
    
            printShops();

        }
        
    },[map,lat,lng]);

    
    
    

    return (
        <React.Fragment>
            <div className="officialsale-section">
                <h1>
                    #공적 마스크 판매
            </h1>

                <h3 className="officialsale-section-text">
                        내 주변 공적 마스크 판매처에서 마스크를 구매해보세요!
            </h3>
            </div>
            <div className="kakao-map-wrap">
                <div id="kakao-map">
                </div>
            </div>
            <MapModal />
        </React.Fragment>
    );
}


export default OfficialSale;