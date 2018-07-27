import React from 'react';
import { Redirect, Link } from 'react-router-dom'

class NDHome extends React.Component {
	render() {
			return (
					<div>
							<Resources />
							<RedirectDropDown/>
							<Link to='/NDInput'><button>Go to Calculator</button></Link>
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
			<select onChange={ this.onChange } defaultValue='/ND' >
				<option value=''>State</option>
					<option value='/MN'>Minnesota</option>
					<option value='/ND' defaultValue>North Dakota</option>
			</select>
		);
	}
}


function Resources() {
	return (
		<div>
			<h4>Resources</h4> <Link to='/NDContact'>Contact Us</Link>	
				<ul>
				<li><a href='http://www.ndltap.org/resources/truckweight.php'>NLDTAP Truck Weight Resources</a></li>
				<li><a href='http://www.nd.gov/ndhp/motor-carrier/legal-vehicle-size-and-weight'>NDHP Vehicle Size and Weight</a></li>
				<li><a href='http://www.dot.nd.gov/business/motor-carrier.htm'>NDDOT Motor Carrier Services</a></li>
				<li><a href='http://www.ugpti.org'>UGPTI</a></li>
			</ul>
		</div>
	);
}

export default NDHome;