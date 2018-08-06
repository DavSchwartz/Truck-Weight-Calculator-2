import React from 'react';
import { Link } from 'react-router-dom'
import './CSS/NDContact.css';

class NDContact extends React.Component {
	render() {
		return (
			<div>
				<Link to='/MN'><button>Return to Minnesota Home Page</button></Link>
				<p>Contact for weight calculations:  <a href="mailto:ndhppermits@nd.gov">ndhppermits@nd.gov</a> , phone number here, (701) 328-2621</p>
				<p>Contact for application questions and feedback: <a href="mailto:ndtruckwgt@ugpti.org">ndtruckwgt@ugpti.org</a>.</p>
			</div>
		);
	}
}

export default NDContact;