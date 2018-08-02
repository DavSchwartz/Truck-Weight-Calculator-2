import React from 'react';
import { Link, } from 'react-router-dom'
import './CSS/MNCalculations.css';

class MNCalculations extends React.Component {
	render() {
		return (
			<div>
				What up boi? want to go <Link to='/MNInput'>back</Link>?
			</div>
		);
	}
}

export default MNCalculations;