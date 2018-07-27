import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class MNHome extends Component {
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
				<select onChange={this.onChange} defaultValue='/MN' >
					<option value=''>State</option>
					<option value='/MN' defaultValue>Minnesota</option>
					<option value='/ND'>North Dakota</option>
				</select>

				<h2>HELLO</h2>
				<p>Cras facilisis urna ornare ex volutpat, et
				convallis erat elementum. Ut aliquam, ipsum vitae
				gravida suscipit, metus dui bibendum est, eget rhoncus nibh
				metus nec massa. Maecenas hendrerit laoreet augue
				nec molestie. Cum sociis natoque penatibus et magnis
                dis parturient montes, nascetur ridiculus mus.</p>

				<p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
			</div>
		);
	}
}

export default MNHome;