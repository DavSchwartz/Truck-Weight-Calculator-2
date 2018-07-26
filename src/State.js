import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class State extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = { redirect: false, location: '/' }
	}

	onChange(event) {
		this.setState({ location: event.target.value, redirect: true });
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.location} />;
		}

		return (
			<div>
				<h2>Please Select a State</h2>
				<br />
				<select onChange={this.onChange} defaultValue=''>
					<option value=''>State</option>
					<option value='/MNHome'>Minnesota</option>
					<option value='/NDHome'>North Dakota</option>
				</select>
				<br />
				<br />
				<br />
				<br />
			</div>
		);
	}
}

export default State;