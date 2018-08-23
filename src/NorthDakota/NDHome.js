import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import './CSS/NDHome.css';

class NDHome extends React.Component {
	render() {
			return (
					<div>
						<Resources />
						<RedirectDropDown />
						<Link to='/NDCalculations'><button>Go to Calculator</button></Link>
						<Information />
					</div>
			);
	}
}

//informational links in css dropdown and contact link
function Resources() {
	return (
		<div className='flexRow'>
			<div className='dropdown flexItem'>
				<span>Resources</span>
					<div className='dropdown-content'>
						<p><a href='http://www.ndltap.org/resources/truckweight.php'>NLDTAP Truck Weight Resources</a></p>
						<p><a href='https://www.nd.gov/ndhp/motor-carrier/legal-vehicle-size-and-weight'>NDHP Vehicle Size and Weight</a></p>
						<p><a href='http://www.dot.nd.gov/business/motor-carrier.htm'>NDDOT Motor Carrier Services</a></p>
						<p><a href='http://www.ugpti.org'>UGPTI</a></p>
					</div>
			</div>
			<Link className='flexItem' to='/NDContact'>Contact Us</Link>	
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
			<select onChange={ this.onChange } defaultValue='/ND' >
				<option value=''>State</option>
					<option value='/MN'>Minnesota</option>
					<option value='/ND'>North Dakota</option>
			</select>
		);
	}
}

//information about ND TWC calcualations
function Information() {
	return (
		<div>
			<p>
				The Truck Weight Calculator provides a convenient way to determine the maximum legal weight that any set of axles on a vehicle/vehicle combination may carry on ND interstate and state highways. The allowable weight on a vehicle/vehicle combination may increase by either adding additional axles or by increasing the distance between axles. The formula for the calculator is a weight-to-length ratio. This formula was enacted by Congress and the State to limit the weight-to-length of a vehicle crossing a bridge.
			</p>
			<p>
			The formula is <b>W = 500 [LN/N-1 + 12N + 36]</b>
			</p>
			<p>
				W = Maximum weight in pounds on any group of two or more axles.<br />
				L  = Distance in feet between extremes of any group of two or more consecutive axles.<br />
				N = Number of axles in the group under consideration. 
			</p>
			<p>
				<a href ='https://www.nd.gov/ndhp/sites/www/files/documents/Permits/Weight_Limitations_Chart_.pdf'>NDHP Weight Limitations Chart.</a>
			</p>
			<p>
				The legal gross vehicle weight (GVW) on ND <u>state highways</u> is 105,500 pounds unless otherwise posted. On all other highways the maximum GVW is 80,000 pounds unless designated for more, not to exceed 105,500 pounds. All tire and axle weights must be legal. No tire shall exceed 550 pounds per inch of tire width. 
			</p>
			<p>
				The legal GVW on the <u>interstate highway system</u> is 80,000 pounds. An interstate permit is required when a vehicle hauling a reducible load exceeds 80,000 pounds GVW. The GVW shall not exceed 105,500 pounds. The vehicle combination must have sufficient axles and bridge lengths. All tire and axle weights must be legal. No tire shall exceed 550 pounds per inch of tire width, except on the steering axle. The weight on the steering axle shall be determined by the manufacturer’s <Modal img='img/Axle_Rating.PNG'>axle rating</Modal> and shall not exceed 20,000 pounds. For more information on the interstate permit visit the <a href = 'http://www.nd.gov/ndhp/motor-carrier'>NDHP Motor Carrier</a> website.
			</p>
			<img alt='State Calculation Example' src={'img/State.PNG'} />
			<img alt='Interstate Calculation Example' src={'img/Interstate.PNG'} />
		</div>
	);
}

//create modal, animated pop-up image
class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.handleClose = this.handleClose.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.state = { modalStyle:'none' }
	}

	handleClose = () => {  // When the user clicks on 'x', close the modal
		this.setState({modalStyle:'none'});
	}

	handleClick = () => { // When the user clicks on the text, open the modal
		this.setState({modalStyle:'block'});
	}

	render() {
		const styles = { // wrapper for modal style
			modalStyle: { display: this.state.modalStyle}
		};
		return (
			<span>
				<span className='link' onClick={this.handleClick}>{this.props.children}</span>

				<span className="modal" style={styles.modalStyle}>

					{/* The Close Button */}
					<span className="close" onClick={this.handleClose}>&times;</span>

					{/* Modal Content (The Image) */}
					<img className="modal-content" src={this.props.img} alt={this.props.children}/>

					{/* Modal Caption (Image Text) */}
					<span className="caption">{this.props.children}</span>
				</span>
			</span>
		);
	}

}

export default NDHome;