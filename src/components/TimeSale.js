import React, {useEffect} from 'react';
import MaskTemplate from './MaskTemplate';
import maskJSON from '../masks.json';


function TimeSale() {

useEffect(() => {
	console.log(maskJSON)
},[]);


  // const [date, setDate] = useState(new Date());

  // const [timer, setTimer] = useState('');

  // function getTime() {
  //   const dday = new Date(mima.date);
  //   setDate(new Date())
  //   const distance = dday - date;
  //   const hours = Math.floor(
  //     (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //   );
  //   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //   const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //   setTimer(`${
  //       hours < 10 ? `0${hours}` : hours
  //     }h ${minutes < 10 ? `0${minutes}` : minutes}m ${
  //       seconds < 10 ? `0${seconds}` : seconds
  //     }s`)
  // }
  


//   useEffect(() => {
//     const interval = setInterval(() => {
//         if(timer === '00h 00m 00s') {
//             clearInterval(interval);
//           } else if(timer[1] === '-') {
//             clearInterval(interval);
//           } else {
//               getTime()
//               console.log(timer[1])
//             }
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [date, timer]);

  
//   //useEffect & setTimeout 으로 판매시작으로 바뀐 태그의 스타일이랑 itemtext 바꾸는 로직 짜기

//   //리렌더링했을때 타이머 오류 고치는 로직 짜기


  return (
    <>
        <section>
            <div className="timesale-section">
				<h1>
					#타임세일
				</h1>
				<h3 className="timesale-section-text">
					특정 시간에 맞춰 마스크를 구매해보세요!
				</h3>
            </div>
        </section>
        {maskJSON.map((item) => (
          <MaskTemplate 
            img={item.image.slice(5,-2)} 
            price={item.price} 
            name={item.name}
            time={item.time}
			link={item.link}
			sub={null}>
          </MaskTemplate>
        ))
        }
    </>
  );
}
export default TimeSale;

