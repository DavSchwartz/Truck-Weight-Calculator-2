import React from 'react';
import { Link } from 'react-router-dom'

class MNContact extends React.Component {
	render() {
		return (
			<div>
				<Link to='/MN'><button>Return to Minnesota Home Page</button></Link>
				<p>MSP Commercial Contact: <a href="mailto:cmvinfo@state.mn.us">cmvinfo@state.mn.us</a> , 651-405-6196</p>
				<p>ATCC contact: <a href="mailto:truckweight@alextech.edu">truckweight@alextech.edu</a></p>
			</div>
		);
	}
}

export default MNContact;