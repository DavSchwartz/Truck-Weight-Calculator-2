import React from 'react';
import { Redirect, Link } from 'react-router-dom'

class MNHome extends React.Component {
	render() {
		return (
			<div>
				<Resources />
				<RedirectDropDown />
				<Link to='/MNInput'><button>Go to Calculator</button></Link>
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
			<select onChange={this.onChange} defaultValue='/MN' >
				<option value=''>State</option>
				<option value='/MN' defaultValue>Minnesota</option>
				<option value='/ND'>North Dakota</option>
			</select>
		);
	}
}


function Resources() {
	return (
		<div>
			<h4>Resources</h4> <Link to='/MNContact'>Contact Us</Link>	
				<ul>
				<li><a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>good stuff</a></li>
			</ul>
		</div>
	);
}

export default MNHome;