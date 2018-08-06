import React from 'react';
import { Redirect, Link } from 'react-router-dom'
import './CSS/MNHome.css';

class MNHome extends React.Component {
	render() {
		return (
			<div>
				<Resources />
				<RedirectDropDown />
				<Link to='/MNCalculations'><button>Go to Calculator</button></Link>
				<Information />
			</div>
		);
	}
}

//informational links in css dropdown and contact link, TODO add more links
function Resources() {
	return (
		<div className='flexRow'>
			<div className="dropdown flexItem">
				<span>Resources</span>
					<div className='dropdown-content'>
						<p><a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'> TODO STILL NEED TO ADD MORE RESOURCES</a></p>
					</div>
			</div>
			<Link className='flexItem' to='/MNContact'>Contact Us</Link>
		</div>
	);
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
			<select onChange={this.onChange} defaultValue='/MN' >
				<option value=''>State</option>
				<option value='/MN'>Minnesota</option>
				<option value='/ND'>North Dakota</option>
			</select>
		);
	}
}

//information about MN TWC calcualations, TODO NEED MORE CONTENT
function Information() {
	return (
		<div>
			<p>
				TODO ADD STUFF HERE
			</p>
			<p>
				The formula is <b>W = 500 [LN/N-1 + 12N + 36]</b>
			</p>
			<p>
				W = Maximum weight in pounds on any group of two or more axles.<br />
				L  = Distance in feet between extremes of any group of two or more consecutive axles.<br />
				N = Number of axles in the group under consideration. 
			</p>
		</div>
	);
}

export default MNHome;