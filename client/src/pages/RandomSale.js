import React from "react"
import MaskTemplate from "../components/MaskTemplate"
import randomMaskJSON from "../assets/randomMasks.json"

function RandomSale() {
	return (
		<>
			<section>
				<div className="head-section">
					<h1>#랜덤세일</h1>
					<h3 className="head-section-text">
						게릴라로 판매하는 마스크를 구매해보세요!
					</h3>
				</div>
			</section>
			{randomMaskJSON.map((item, index) => (
				<MaskTemplate
					key={item.name + item.price + index}
					img={item.image.slice(5, -2)}
					price={item.price}
					name={item.name}
					link={item.link}
					sub={item.sub}
				></MaskTemplate>
			))}
		</>
	)
}
export default RandomSale
