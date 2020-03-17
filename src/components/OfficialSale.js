import React, { useState, useEffect } from 'react';
import axios from 'axios';



function OfficialSale() {

    const [kakao] = useState(window.kakao);
    const [location, setLocation] = useState({
        lat: 0,
        lng: 0,
    })
    const { lat, lng } = location;
    const [map, setMap] = useState(null)

    useEffect(() => {

        //내 위치 불러오기
        const getLocation = () => {
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
                        const moveLatLng = new kakao.maps.LatLng(lat, lng);
                        map.panTo(moveLatLng)
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

        var mapContainer = document.getElementById('kakao-map'),
            mapOption = {
                center: new kakao.maps.LatLng(lat, lng),
                level: 3,
            };
        var map = new kakao.maps.Map(mapContainer, mapOption);
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        // kakao.maps.event.addListener(map, 'bounds_changed', function () {
        //     //이벤트로직
        // });

        setMap(map);

    },[lat, lng])


    // useEffect(() => {

    //     if(map) {
    //         //마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
    //         kakao.maps.event.addListener(map, 'dragend', function() {        
                        
    //             // 지도 중심좌표를 얻어옵니다 
    //             var latlng = map.getCenter(); 

    //             setLocation({
    //                 ...location,
    //                 lat: latlng.getLat(),
    //                 lng: latlng.getLng()
    //             })

    //         });
    //         setMap(map);
    //     }
        
    //   }, [map])



    useEffect(() => {

        async function getShops() {
            try {
                //화면 지도 반경만큼 약국 다 보여주기
                return await axios.get(`https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=1500`)

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

                            // 커스텀 오버레이에 표시할 내용입니다     
                            // HTML 문자열 또는 Dom Element 입니다 
                            var content = document.createElement('div');
                            content.classList.add('store-label');
                            content.innerHTML = `
                            <div class="store-details">
                                <div style="padding-bottom:3px"> ${name}</div>
                                <div class="long"> 업데이트: ${created_at}</div>
                                <div class="long"> 입고시간: ${stock_at}</div>
                            </div>
                            <div>
                            ${remain_stat === 'empty' ? '품절' : '재고있음'}
                            </div>
                            `

                            // 커스텀 오버레이가 표시될 위치입니다 
                            var position = new kakao.maps.LatLng(lat,lng);  

                            // 커스텀 오버레이를 생성합니다
                            var customOverlay = new kakao.maps.CustomOverlay({
                                position: position,
                                content: content   
                            });

                            // 커스텀 오버레이를 지도에 표시합니다
                            customOverlay.setMap(map);    
                        });
                    }
                }   
        }

        printShops();

        
    },[lat, lng, map])

    // const storeLabels = document.querySelectorAll('store-label');

    // console.log(storeLabels);

    // storeLabels.forEach(store => {
    //     store.addEventListener('mouseover', function() {
    //         detailBox.current.classList.remove('hidden');
    //     });

    //     store.addEventListener('mouseout', function() {
    //         detailBox.current.classList.add('hidden');
    //     });

    // });
    
    


    return (
        <React.Fragment>
            <section>
                <div className="officialsale-section">
                    <h1>
                        #공적 마스크 판매
                </h1>

                    <h3 className="officialsale-section-text">
                        내 주변 공적 마스크 판매처에서 마스크를 구매해보세요!
                </h3>
                </div>
            </section>

            <div className="kakao-map-wrap">
                <div id="kakao-map">
                </div>
            </div>
        </React.Fragment>
    );
}


export default OfficialSale;