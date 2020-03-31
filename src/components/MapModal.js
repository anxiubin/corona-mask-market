import React from 'react';
import { useEffect } from 'react';

function MapModal() {

    useEffect(() => {
        if(localStorage.getItem('LS_agreed') === 'true') {
            document.querySelector('.map-modal').style.display = "none";
        } else {
            localStorage.setItem('LS_agreed', 'false')
        }
    },[])

    const onClick = () => {
        localStorage.setItem('LS_agreed', 'true');
        document.querySelector('.map-modal').style.display = "none";
    }

  return (
    <>
        <div className="map-modal">
            <h2 className="modal-head">서비스 이용 동의</h2>
            <div className="modal-contents">
                <p>* 공적 마스크 관련 안내는 
                    <a href="https://www.mfds.go.kr/bogunMaskPanMae.jsp" target="_blank" rel="noopener noreferrer">
                        <strong> [식약처 홈페이지]</strong></a>를 참고하세요.
                </p>
                <p>* 코로나마스크마켓에서 제공하는 공적마스크 판매정보는 <strong>5분 이상 지연된</strong> 정보입니다.</p>
                <p>* 일선에서 수고하시는 약사님 등 현장에서 힘써주시는 모든 분들께 감사의 마음을 전합니다.</p>
                <p style={{color: "red"}}>* 실제 약국에 있는 재고량과 오차가 발생할 수 있으니 절대로 현장에 계신 약사님들께 문제를 제기하지 말아주세요.</p>
            </div>
            <div className="modal-footer">
                <div>데이터 관련 문의: 한국정보화진흥원(maskdata@nia.or.kr)</div>
                <button className="btn-agree" onClick={onClick}>동의합니다</button>
            </div>

        </div>
    </>
  );
}
export default MapModal;