import React from "react"
import { Link } from "react-router-dom"

function Header() {
	return (
		<div id="fixed-bar">
			<div id="fixed-bar-wrap">
				<div id="logo-wrap">
					<Link to="/" id="home-link">
						<img
							className="logo-img"
							alt="코로나마스크마켓"
							src="https://image.flaticon.com/icons/png/128/1033/1033165.png"
						/>
						<div className="logo-text">Corona Mask Market</div>
					</Link>
				</div>
				<div id="category-wrap">
					<div className="category">
						<Link to="/randomSale" className="glow">
							Random
						</Link>
					</div>
					<div className="category">
						<Link to="/officialSale" className="glow">
							Official
						</Link>
					</div>
					<div className="category">
						<Link to="/cheerKR" className="glow">
							Support
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
