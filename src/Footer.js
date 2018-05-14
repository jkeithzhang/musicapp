import React, { Component } from 'react';
import './default.css';

class Footer extends Component {
	render() {
		return (
			<div id="copyright" className="container">
				<p>&copy; All rights reserved.</p>
				<ul className="contact">
					<li>
						<a href="https://github.com/zhangkecyrus/musicapp" target="_blank" rel="noopener noreferrer">
							<i className="fab fa-github footer-icon"></i>
						</a>
					</li>
				</ul>
			</div>
		);
	}
}
export default Footer;
