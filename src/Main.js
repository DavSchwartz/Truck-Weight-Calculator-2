import React, { Component } from 'react';
import {
	Route,
	HashRouter
} from 'react-router-dom';
import MNHome from './MNHome';
import NDHome from './NDHome';
import State from './State';

class Main extends Component {
	render() {
		return (
			<HashRouter>
				<div>
					<img alt='UGPTI-DOTSC Header' src={window.location.origin + '/img/Spliced-Website-Header-(UGPTI).png'} style={{ width: '100%' }} />

					<div>
						<Route exact path='/' component={State} />
						<Route path='/MN' component={MNHome} />
						<Route path='/ND' component={NDHome} />
					</div>

					<a target='_blank' rel='noopener noreferrer' href='http://www.ugpti.org/dotsc/' >
						<img alt='UGPTI-DOTSC Footer' src={window.location.origin + '/img/logo_DOTSC.jpg'} style={{ width: '60%' }} />
					</ a>
				</div>
			</HashRouter>
		);
	}
}

export default Main;