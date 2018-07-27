import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'

class NDHome extends Component {
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
					<div>
							<Resources />
							<redirectDropDown obj={this}/>
							<Link to='/ND/Input'><button>Calculations</button></Link>
					</div>
			);
	}
	
}

	function redirectDropDown(props) {
		return (
			<select onChange={ props.obj.onChange.call(props.obj) } defaultValue='/ND' >
				<option value=''>State</option>
					<option value='/MN'>Minnesota</option>
					<option value='/ND' defaultValue>North Dakota</option>
			</select>
		);
	}

	function Resources() {
		return (
			<div>
					<table>
						<tr>
							<td>
								<h4>Resources</h4>
									<ul>
									<li><a href='http://www.ndltap.org/resources/truckweight.php'>NLDTAP Truck Weight Resources</a></li>
									<li><a href='http://www.nd.gov/ndhp/motor-carrier/legal-vehicle-size-and-weight'>NDHP Vehicle Size and Weight</a></li>
									<li><a href='http://www.dot.nd.gov/business/motor-carrier.htm'>NDDOT Motor Carrier Services</a></li>
									<li><a href='http://www.ugpti.org'>UGPTI</a></li>
								</ul>
							</td>
							<td>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</td>
							<td>
								<Link to='/NDContact'>Contact Us</Link>	
							</td>
						</tr>
					</table>
			</div>
		);
	}

export default NDHome;