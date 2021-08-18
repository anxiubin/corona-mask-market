import React from "react"
import { MdTimer } from "react-icons/md"

function Mask({ img, price, name, time, link, sub }) {
	const onClick = (url) => {
		window.open(url)
	}

	return (
		<section className="mask-section">
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
		</section>
	)
}
export default Mask
