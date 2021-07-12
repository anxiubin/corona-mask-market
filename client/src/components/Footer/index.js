import React from "react"
import { AiFillGithub } from "react-icons/ai"
import { MdMail } from "react-icons/md"
import { IconContext } from "react-icons"

function Footer() {
	return (
		<footer>
			<div className="footer-container">
				<p className="footer-icons">
					<a
						href="https://github.com/anxiubin/corona-mask-market"
						rel="noopener noreferrer"
						target="_blank"
					>
						<IconContext.Provider value={{ color: "black", size: 20 }}>
							<AiFillGithub />
						</IconContext.Provider>
					</a>
					<a href="a.tnqls0120@gmail.com" target="_blank">
						<IconContext.Provider value={{ color: "black", size: 20 }}>
							<MdMail />
						</IconContext.Provider>
					</a>
				</p>
				<p className="footer-copyright">© 2020 Subin Ahn</p>
			</div>
		</footer>
	)
}

export default Footer
