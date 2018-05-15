import React from 'react';
import Modal from './Modal'
let data = require('./music-events.json');


const num = 6;
class Event extends React.Component {
	constructor(props) {
		super(props);
		this.index = 0;
		this.size = num;
		this.all = data;
		this.state = {
			data: data.slice(0, 6).map(function (x) {
				x['PRICE'] = x['PRICE'].replace('$', '');
				return x;
			}),
			direction: {
				PRICE: 'asc',
				ARTIST: 'asc',
				VENUE: 'asc',
				DATE: 'asc',
				TIME: 'asc',
			},
			artist: {},
			trackId: 226,//default mock
			playing: ""
		};
		this.sortBy = this.sortBy.bind(this);
		this.fetchMoreData = this.fetchMoreData.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.fetchArtist = this.fetchArtist.bind(this);
		this.playTrack = this.playTrack.bind(this);
		this.changePage = this.changePage.bind(this);
	}
	//this funciton is the simulations of the FetchAPI job.
	fetchMoreData = () => {
		this.setState({
			data: this.state.data.concat(this.all[this.index]).map(function (x) {
				x['PRICE'] = x['PRICE'].replace('$', '');
				return x;
			})
		})
		this.index = this.index + 1;
	}
	
	//this funciton is the simulations of the FetchAPI job.
	fetchData = () => {
		this.setState({
			data: this.all.slice(this.index, this.index+this.size).map(function (x) {
				x['PRICE'] = x['PRICE'].replace('$', '');
				return x;
			})
		})
	}

	//this funciton is the simulations of the FetchAPI job.
	playTrack = (key) => {
		const ava = [291, 292, 293, 199, 667, 278, 256, 226, 590, 148, 427, 742, 19, 778];
		let pickRandom = ava[Math.floor(Math.random() * 10)];
		this.setState({
			trackId: pickRandom,
			playing: key
		})
	}
	
	fetchArtist = (a) => {
		const targetUrl = 'https://randomuser.me/api/?results=1'
		fetch(targetUrl)
			.then(response => response.json())
			.then(parsedJSON => parsedJSON.results.map(user => (
				{
					name: `${a}`,
					nickname: `${user.login.username}`,
					dob: `${user.dob}`,
					location: `${user.location.street}, ${user.location.city}`,
					pic: `${user.picture.medium}`,
				}
			)))
			.then(artist => this.setState({
				artist: artist[0]
			}))
			.catch(error => console.log('parsing failed', error))
	}
	sortBy = (key) => {
		if (this.state.direction[key] === 'asc') {
			this.setState({
				data: this.state.data.sort((a, b) => {
					if (a[key] < b[key]) return -1;
					if (a[key] > b[key]) return 1;
					return 0;
				}),
				direction: {
					[key]: 'desc'
				}
			})
		} else {
			this.setState({
				data: this.state.data.sort((a, b) => {
					if (a[key] < b[key]) return 1;
					if (a[key] > b[key]) return -1;
					return 0;
				}),
				direction: {
					[key]: 'asc'
				}
			})
		}
	}

	handleScroll = () => {
		if (this.scroller && this.scroller.scrollTop >= 20 + (this.index - 1) * 220) {
			if (this.state.data.length < data.length) {
				this.fetchMoreData();
			} else {
				console.log(this.state.data)
			}
		}
	}

	changePage = (order) => {
		if (order === "next") {
			if (this.index + 6 < this.all.length) {
				this.index += 1;
				console.log(this.index);
				this.fetchData();
			}
		} else {
			if (this.index > 0) {
				this.index -= 1;
				this.fetchData();
			}
		}
	}

	render() {
		var divStyle = {
			padding: '5em 5em 5em 5em'
		};
		return (
			<div style={divStyle}>
				<iframe width="100%" height="90" title="sc" scrolling="no" frameBorder="no" src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + this.state.trackId}></iframe>
				<div className="eventTh row myThRow">
					<div className="headerItem col-md-4 col-sm-4" onClick={() => this.sortBy('ARTIST')}><b>ARTIST</b> <i className={this.state.direction.ARTIST === "asc" ? "fas fa-angle-down" : "fas fa-angle-up"}></i></div>
					<div className="headerItem col-md-2 col-sm-2"><b>AUDITION</b></div>
					<div className="headerItem col-md-2 col-sm-2 hidden-xs" onClick={() => this.sortBy('DATE')}><b>DATE</b> <i className={this.state.direction.DATE === "asc" ? "fas fa-angle-down" : "fas fa-angle-up"}></i></div>
					<div className="headerItem col-md-1 col-sm-1 hidden-xs" onClick={() => this.sortBy('TIME')}><b>TIME</b> <i className={this.state.direction.TIME === "asc" ? "fas fa-angle-down" : "fas fa-angle-up"}></i></div>
					<div className="headerItem col-md-2 col-sm-2 hidden-xs" onClick={() => this.sortBy('VENUE')}><b>VENUE</b> <i className={this.state.direction.VENUE === "asc" ? "fas fa-angle-down" : "fas fa-angle-up"}></i></div>
					<div className="headerItem col-md-1 col-sm-1" onClick={() => this.sortBy('PRICE')}><b>PRICE</b> <i className={this.state.direction.PRICE === "asc" ? "fas fa-angle-down" : "fas fa-angle-up"}></i></div>
				</div>
				<div
					style={{
						overflowY: 'auto',
						height: 250
					}}
				// onScroll={this.handleScroll}
				// ref={scroller => {
				// 	this.scroller = scroller;
				// }}
				>
					{
						this.state.data.map(contact => {
							return <div key={contact["ON SALE"]} style={{ height: 40 }} className="row myRow">
								<div className="tableItem col-md-4 col-sm-4"><a href="#imageModal1" className="portfolio-link" data-toggle="modal" data-target="#exampleModal" onClick={() => this.fetchArtist(contact.ARTIST)}><i className="far fa-user"></i> {contact.ARTIST}</a></div>
								<div className="tableItem col-md-2 col-sm-2"><span className="play-track" onClick={() => this.playTrack(contact["ON SALE"])}>{this.state.playing === contact["ON SALE"] ? (<i class="fas fa-music"></i>) : "play track"}</span></div>
								<div className="tableItem col-md-2 col-sm-2 hidden-xs"><i className="far fa-calendar-alt"></i> {contact.DATE}</div>
								<div className="tableItem col-md-1 col-sm-1 hidden-xs"><i className="far fa-clock"></i> {contact.TIME}</div>
								<div className="tableItem col-md-2 col-sm-2 hidden-xs"><i className="fas fa-thumbtack"></i> {contact.VENUE}</div>
								<div className="tableItem col-md-1 col-sm-1">{"$" + contact.PRICE}</div>
							</div>
						})
					}
				</div>
				<div>
					<span className="pageBtn" onClick={() => this.changePage("previous")}><i className="fas fa-caret-left"></i></span>
					<span className="pageBtn" onClick={() => this.changePage("next")}><i className="fas fa-caret-right"></i></span>
				</div>
				<Modal data={this.state.artist} />
			</div>
		)
	}
}
export default Event;