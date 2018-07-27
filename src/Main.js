import React from 'react';
import {
	Route,
	HashRouter
} from 'react-router-dom';

import State from './State';
import MNHome from './Minnesota/MNHome';
import MNContact from './Minnesota/MNContact';
import MNInput from './Minnesota/MNInput';
import MNCalculations from './Minnesota/MNCalculations';
import NDHome from './NorthDakota/NDHome';
import NDContact from './NorthDakota/NDContact';
import NDInput from './NorthDakota/NDInput';
import NDCalculations from './NorthDakota/NDCalculations';

class Main extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<img alt='UGPTI-DOTSC Header' src={window.location.origin + '/img/Spliced-Website-Header-(UGPTI).png'} style={{ width: '100%' }} />

					<div>
						<Route exact path='/' component={State} />
						<Route path='/MN' component={MNHome} />
						<Route path='/MNContact' component={MNContact} />
						<Route path='/MNInput' component={MNInput} />
						<Route path='/MNCalculations' component={MNCalculations} />
						<Route path='/ND' component={NDHome} />
						<Route path='/NDContact' component={NDContact} />
						<Route path='/NDInput' component={NDInput} />
						<Route path='/NDCalculation' component={NDCalculations} />
					</div>

					<a href='http://www.ugpti.org/dotsc/' >
						<img alt='UGPTI-DOTSC Footer' src={window.location.origin + '/img/logo_DOTSC.jpg'} style={{ width: '60%' }} />
					</ a>
				</div>
			</HashRouter>
		);
	}
}

export default Main;