import React from 'react';
import { Link } from 'react-router-dom'

class NDOutput extends React.Component {
	render() {
		return (
			<div>
				What up boi? want to go <Link to='/NDCalculations'>back</Link>?
			</div>
		);
	}
}

export default NDOutput;