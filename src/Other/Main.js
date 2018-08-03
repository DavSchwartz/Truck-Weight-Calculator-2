import React from 'react';
import {
	Route,
	HashRouter
} from 'react-router-dom';

import State from '../Other/State';
import MNHome from '../Minnesota/MNHome';
import MNContact from '../Minnesota/MNContact';
import MNInput from '../Minnesota/MNInput';
import MNCalculations from '../Minnesota/MNCalculations';
import NDHome from '../NorthDakota/NDHome';
import NDContact from '../NorthDakota/NDContact';
import NDInput from '../NorthDakota/NDInput';
import NDCalculations from '../NorthDakota/NDCalculations';

import './CSS/Main.css';

class Main extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<img className='header' alt='UGPTI-DOTSC Header' src={'img/Spliced-Website-Header-(UGPTI).png'} />

					<div className='body'>
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
						<img className='footer' alt='UGPTI-DOTSC Footer' src={'img/logo_DOTSC.jpg'} />
					</ a>
				</div>
			</HashRouter>
		);
	}
}

export default Main;