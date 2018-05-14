import React from 'react';
import Modal from './Modal'
let data = require('./music-events.json');


const num = 6;
let arr = new Array(Math.ceil(data.length / num));
let c = -1;
for (let i = 0; i < data.length; i++) {
	if (i % num === 0) {
		c++;
		arr[c] = [];
	}
	arr[c].push(data[i]);
}
class Event extends React.Component {
	constructor(props) {
		super(props);
		this.index = 1;
		this.all = arr;
		this.state = {
			data: arr[0].map(function (x) {
				x['PRICE'] = x['PRICE'].replace('$', '');
				return x;
			}),
			direction: {
				PRICE: 'asc',
				ARTIST: 'asc',
				VENUE: 'asc'
			},
			artist: {},
			trackId: 226//default
		};
		this.sortBy = this.sortBy.bind(this);
		this.fetchMoreData = this.fetchMoreData.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.fetchArtist = this.fetchArtist.bind(this);
		this.playTrack = this.playTrack.bind(this);
	}

	fetchMoreData = () => {
		this.setState({
			data: this.state.data.concat(this.all[this.index]).map(function (x) {
				x['PRICE'] = x['PRICE'].replace('$', '');
				return x;
			})
		})
		this.index = this.index + 1;
	}

	playTrack = () => {
		//this func is to simulate the API call.
		const ava = [291, 292, 293, 199, 667, 278, 256, 226, 590, 148, 427, 742, 19, 778];
		let pickRandom = ava[Math.floor(Math.random() * 10)];
		this.setState({
			trackId: pickRandom
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

	render() {
		var divStyle = {
			padding: '5em 5em 5em 5em'
		};
		return (
			<div style={divStyle}>
				<iframe width="100%" height="90" title="sc" scrolling="no" frameBorder="no" src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + this.state.trackId}></iframe>
				<div className="eventTh row myThRow">
					<div className="headerItem col-md-4 col-sm-4" onClick={() => this.sortBy('ARTIST')}><b>ARTIST</b> <i className="fas fa-angle-down"></i></div>
					<div className="headerItem col-md-2 col-sm-2" onClick={() => this.sortBy('ARTIST')}><b>AUDITION</b> <i className="fas fa-angle-down"></i></div>
					<div className="headerItem col-md-2 col-sm-2 hidden-xs" onClick={() => this.sortBy('DATE')}><b>DATE</b> <i className="fas fa-angle-down"></i></div>
					<div className="headerItem col-md-1 col-sm-1 hidden-xs" onClick={() => this.sortBy('TIME')}><b>TIME</b> <i className="fas fa-angle-down"></i></div>
					<div className="headerItem col-md-2 col-sm-2 hidden-xs" onClick={() => this.sortBy('VENUE')}><b>VENUE</b> <i className="fas fa-angle-down"></i></div>
					<div className="headerItem col-md-1 col-sm-1" onClick={() => this.sortBy('PRICE')}><b>PRICE</b> <i className="fas fa-angle-down"></i></div>
				</div>
				<div style={{
					overflowY: 'auto',
					height: 220
				}}
					onScroll={this.handleScroll}
					ref={scroller => {
						this.scroller = scroller;
					}}
				>
					{
						this.state.data.map(contact => {
							return <div key={contact["ON SALE"]} style={{ height: 40 }} className="row myRow">
								<div className="tableItem col-md-4 col-sm-4"><a href="#imageModal1" className="portfolio-link" data-toggle="modal" data-target="#exampleModal" onClick={() => this.fetchArtist(contact.ARTIST)}><i className="far fa-user"></i> {contact.ARTIST}</a></div>
								<div className="tableItem col-md-2 col-sm-2"><span onClick={() => this.playTrack()}><i className="fas fa-play" ></i> play track</span></div>
								<div className="tableItem col-md-2 col-sm-2 hidden-xs"><i className="far fa-calendar-alt"></i> {contact.DATE}</div>
								<div className="tableItem col-md-1 col-sm-1 hidden-xs"><i className="far fa-clock"></i> {contact.TIME}</div>
								<div className="tableItem col-md-2 col-sm-2 hidden-xs"><i className="fas fa-thumbtack"></i> {contact.VENUE}</div>
								<div className="tableItem col-md-1 col-sm-1">{"$" + contact.PRICE}</div>
							</div>
						})
					}
				</div>
				<Modal data={this.state.artist} />
			</div>
		)
	}
}
export default Event;