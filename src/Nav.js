import React, { Component } from 'react';
import './default.css';

class Nav extends Component {
	render() {
		return (
			<div id="header-wrapper">
				<div id="header" className="container">
					<div id="logo">
						<h1><a>Montreal Rhythm</a></h1>
						<div id="menu">
							<p className="current_page_item">Never miss out your local upcoming music events!</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Nav;
