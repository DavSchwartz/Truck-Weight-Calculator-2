import React from 'react';
import { Link } from 'react-router-dom'

class NDOutput extends React.Component {
	constructor(props) {
		super(props)
		this.props.resetCurrentAxle(); // must reset axle, or redirecting to MNInput will immediately redirect back
	}
	
	render() {
		return (
			<div>
				What up boi? want to go <Link to='/NDCalculations'>back</Link>?
			</div>
		);
	}
}

export default NDOutput;