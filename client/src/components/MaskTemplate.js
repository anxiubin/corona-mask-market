import React from "react"
import { MdTimer } from "react-icons/md"

function MaskTemplate({ img, price, name, time, link, sub }) {
	const onClick = (url) => {
		window.open(url)
	}

	// console.log(img+link+sub);

	return (
		<section className="mask-section" key={img + link + sub}>
			<div className="mask-wrap" onClick={() => onClick(link)} title="구매링크">
				<div
					className="mask-img"
					title="mask"
					style={{ backgroundImage: `url(${img})` }}
				></div>
				<div className="item-details">
					<h2 className="item-price">{price}</h2>
					<h3 className="item-name">{name}</h3>
					{sub === null ? (
						<h3 className="item-time">
							<MdTimer className="clock" /> 판매 예정 시간 : {time}
						</h3>
					) : (
						<h4 className="item-sub">{sub}</h4>
					)}
				</div>
			</div>

			{/* {timer !== '00h 00m 00s' ? 
        <h2 className="item-timer">
            <MdTimer /> {timer}
        </h2> :
        <h2 className="item-selling">
            {itemText}
        </h2>
        } */}
		</section>
	)
}
export default MaskTemplate
