import React, { Component } from 'react';
import './default.css';

class Footer extends Component {
	render() {
		return (
			<div id="copyright" class="container">
				<p>&copy; All rights reserved.</p>
				<ul class="contact">
					<li>
						<a href="https://github.com/zhangkecyrus/musicapp" target="_blank" rel="noopener noreferrer">
							<i class="fab fa-github footer-icon"></i>
						</a>
					</li>
				</ul>
			</div>
		);
	}
}
export default Footer;
