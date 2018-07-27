import React from 'react';
import { Redirect } from 'react-router-dom'

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


class RedirectDropDown extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = { redirect : false, location : '/' }
	}

	onChange(event) {
		this.setState({location: event.target.value, redirect : true});
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.location} />;
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