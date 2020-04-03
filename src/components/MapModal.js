import React from 'react';
import { useEffect } from 'react';

function MapModal() {

    useEffect(() => {
        if(localStorage.getItem('LS_agreed') === 'true') {
            document.querySelector('.map-modal').style.display = "none";
            document.querySelector('.backbox').style.display = "none";
        } else {
            localStorage.setItem('LS_agreed', 'false')
        }
    },[])

    const onClick_agree = () => {
        localStorage.setItem('LS_agreed', 'true');
        document.querySelector('.map-modal').style.display = "none";
        document.querySelector('.backbox').style.display = "none";
    }

    const onClick_birth = () => {
        let modalHidden = document.querySelector('.modal-hidden').style.display;
        if(modalHidden === "block") {
            document.querySelector('.modal-hidden').style.display = "none";
        } else {
            document.querySelector('.modal-hidden').style.display = "block";
        }
    }

    const onClick_submit = () => {
        let dayData = checkBirth(document.querySelector('.birth-input').value);
        document.querySelector('.birth-input').value = '';
        document.querySelector('.modal-hidden').style.display = "none";
        localStorage.setItem('LS_birth', dayData);
        document.querySelector('.day').innerText = dayData;

    }

    const checkBirth = (year) => {
        let day ='';

        switch(year.substring(3)) {
            case '1' || '6':
                day = "월요일";
            break;
            case '2' || '7':
                day = "화요일";
            break;
            case '3' || '8':
                day = "수요일";
            break;
            case '4' || '9':
                day = "목요일";
            break;
            case '5' || '0':
                day = "금요일";
            break;
            default:
                day = "정보없음";
        }

        return day;
    }

  return (
    <>
        <section className="map-modal">
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
                <button className="btn-agree" onClick={onClick_agree}>동의합니다</button>
            </div>
        </section>

        <section className="date-modal">
            <div className="modal-show">
                <h4>구매 가능 요일</h4>
                <button onClick={onClick_birth}>확인</button>
            </div>
            <h2 className="day">
                    {!localStorage.getItem('LS_birth')? '정보없음' : localStorage.getItem('LS_birth')}
            </h2>
            <p className="day-ref">[토,일 : 주중에 못산 경우 구매 가능]</p>
            <div className="modal-hidden">
                <div className="birth">
                    출생연도
                </div>
                
                <input className="birth-input" type="text" placeholder="ex)1993" maxLength="4" />
                <button className="birth-submit" onClick={onClick_submit}>제출</button>
                <p>*마스크 5부제를 위한 정보수집입니다.</p>
            </div>
        </section>
    </>
  );
}

export default MapModal;