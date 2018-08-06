import React from 'react';
import { Link } from 'react-router-dom'
import './CSS/MNContact.css';

class MNContact extends React.Component {
	render() {
		return (
			<div>
				<Link to='/MN'><button>Return to Minnesota Home Page</button></Link>
				<p>TODO STILL NEED TO ADD CONTACTS</p>
				<p>Contact for weight calculations: {/*<a href="mailto:JohnDoe@nd.gov">*/}e-mail here{/*</a>*/} , phone number here, (701) 123-4567</p>
				<p>Contact for application questions and feedback: {/*<a href="mailto:JaneDoe@ugpti.org">*/}e-mail here{/*</a>*/}.</p>
			</div>
		);
	}
}

export default MNContact;