import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Event from './Event';
import Nav from './Nav';
import Footer from './Footer';
import registerServiceWorker from './registerServiceWorker';
let eventdata = require('./music-events.json')

ReactDOM.render(<Nav />, document.getElementById('nav'));
ReactDOM.render(<Event data={eventdata}/>, document.getElementById('list'));
ReactDOM.render(<Footer />, document.getElementById('footer'));

registerServiceWorker();
