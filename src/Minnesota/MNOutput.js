import React from 'react';
import { Link } from 'react-router-dom'

class MNOutput extends React.Component {
	render() {
		return (
			<div>
				What up boi? want to go <Link to='/MNCalculations'>back</Link>?
			</div>
		);
	}
}

export default MNOutput;