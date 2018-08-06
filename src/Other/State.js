import React from 'react';
import { Redirect } from 'react-router-dom';
import './CSS/State.css';

class State extends React.Component {
	render() {
		return (
			<div>
				<h2>Please Select a State</h2>
				<RedirectDropDown />
			</div>
		);
	}
}

//state selection drop down to redirect page
class RedirectDropDown extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = { redirect : false, location : '/' }
	}

	onChange(event) { // set value for redirect
		this.setState({location: event.target.value, redirect : true});
	}

	render() {
		if (this.state.redirect) { // redirect to chosen option
			return <Redirect push to={this.state.location} />;
		}

		return (
				<select onChange={this.onChange} defaultValue=''>
					<option value=''>State</option>
					<option value='/MN'>Minnesota</option>
					<option value='/ND'>North Dakota</option>
				</select>
		);
	}
}

export default State;