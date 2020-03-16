import React, {useState, useEffect} from 'react';
import axios from 'axios';


function OfficialSale() {

    const [kakao] = useState(window.kakao);

    const [location, setLocation] = useState({
        lat: 0,
        lng: 0,
    })

    const {lat, lng} = location;


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


              const moveLatLng = new kakao.maps.LatLng(latitude, longitude)
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

    useEffect(() => {
        getLocation();
    })


    //지도 생성하기
    var mapContainer = document.getElementById('kakao-map'), 
    mapOption = {
        center: new kakao.maps.LatLng(lat, lng), 
        level: 3, 
    }; 

    var map = new kakao.maps.Map(mapContainer, mapOption); 

    var zoomControl = new kakao.maps.ZoomControl();

    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    kakao.maps.event.addListener(map, 'bounds_changed', function () {
        //이벤트로직
    });

    

    //판매처 데이터 불러오기
    async function getShops() {
        try {
            return await axios.get(`https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${300}`)
           
        } catch (error) {
            console.error(error);
        }
    }

    //지도에 마커와 인포윈도우 표시
    async function printShops() {
        const shops = await getShops();
        
        var imageSrc = 'https://image.flaticon.com/icons/svg/2628/2628081.svg', // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(40, 20), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(20, 20)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            markerPosition = new kakao.maps.LatLng(shops.data.stores[0].lat, shops.data.stores[0].lng); // 마커가 표시될 위치입니다

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage // 마커이미지 설정 
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);  

        // 마커 위에 표시할 인포윈도우를 생성한다
        var infowindow = new kakao.maps.InfoWindow({
            content : `<div style="padding:5px;">
            <span> ${shops.data.stores[0].name}</span>
            <span> ${shops.data.stores[0].remain_stat}</span>
            </div>` // 인포윈도우에 표시할 내용
        });

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다 
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
        function makeOverListener(map, marker, infowindow) {
            return function() {
                infowindow.open(map, marker);
            };
        }

        // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
        function makeOutListener(infowindow) {
            return function() {
                infowindow.close();
            };
        }
    }

    useEffect(() => {
        printShops()
    })



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
            <div id="kakao-map"></div>
        </div>

    </React.Fragment>
  );
}


export default OfficialSale;