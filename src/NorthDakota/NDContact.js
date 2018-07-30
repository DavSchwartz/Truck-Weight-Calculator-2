import React from 'react';
import { Link } from 'react-router-dom'
import './CSS/NDContact.css';

class NDContact extends React.Component {
	render() {
		return (
			<div>
				<Link to='/ND'>Back</Link>	
			</div>
		);
	}
}

export default NDContact;