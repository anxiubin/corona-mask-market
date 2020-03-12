import React, {useState} from 'react';

function OfficialSale() {

    const [kakao] = useState(window.kakao);

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.56667, 126.98023), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
        mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
    }; 
    // 지도를 생성한다 
    var map = new kakao.maps.Map(mapContainer, mapOption); 
    // 지도에 확대 축소 컨트롤을 생성한다
    var zoomControl = new kakao.maps.ZoomControl();
    // 지도의 우측에 확대 축소 컨트롤을 추가한다
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    // 지도 영역 변화 이벤트를 등록한다
    kakao.maps.event.addListener(map, 'bounds_changed', function () {
        var mapBounds = map.getBounds(),
            message = '지도의 남서쪽, 북동쪽 영역좌표는 ' +
                        mapBounds.toString() + '입니다.';
        console.log(message);	
    });
    // 지도에 마커를 생성하고 표시한다
    var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(37.56667, 126.98023), // 마커의 좌표
        map: map // 마커를 표시할 지도 객체
    });
    // 마커 위에 표시할 인포윈도우를 생성한다
    var infowindow = new kakao.maps.InfoWindow({
        content : '<div style="padding:5px;">인포윈도우 :D</div>' // 인포윈도우에 표시할 내용
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

  return (
    <React.Fragment>
    
        <div id="map" style={{width:"100%", height:"350px"}}></div>
        <div>test</div>
    </React.Fragment>
  );
}
export default OfficialSale;