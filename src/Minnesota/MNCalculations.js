import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import MNTruck from './MNTruck';
import MNInput from './MNInput';
import MNOutput from './MNOutput';

class MNCalculations extends React.Component {
	constructor(props) {
		super(props);
		this.handleChangeMetaTruckData = this.handleChangeMetaTruckData.bind(this);
		this.handleChangeAxleDetails = this.handleChangeAxleDetails.bind(this);
		this.handleAxleDetailsButtonNext = this.handleAxleDetailsButtonNext.bind(this);
		this.handleAxleDetailsButtonLast = this.handleAxleDetailsButtonLast.bind(this);
		this.resetCurrentAxle = this.resetCurrentAxle.bind(this);
		this.state = {currentAxle:0, truck: new MNTruck()}; // axles are indexed at zero
  }

	handleChangeAxleDetails(leftOrRightaxle, change) {
		let truck = this.state.truck;
		let key = Object.keys(change)[0]; // identifier of truck property being changed

		// leftOrRightaxle: 0 is for left axle, and 1 is for right axle in the UI
		truck[key][this.state.currentAxle + leftOrRightaxle] = change[key];
		this.setState({truck:truck});
	}

	handleAxleDetailsButtonNext() {
		this.setState((prevState) => ({ currentAxle: prevState.currentAxle + 1 })); // increase current axle when 'Next' button is pressed
	}
	handleAxleDetailsButtonLast() {
		this.setState((prevState) => ({ currentAxle: prevState.currentAxle - 1 })); // decrease current axle when 'Last' button is pressed
	}
	
	handleChangeMetaTruckData(change) {
		let truck = this.state.truck;

		let key = Object.keys(change)[0]; // identifier of truck property being changed
		if (key === 'axleCount') { this.setState({currentAxle:0}) } // reset currentAxle to 0 if axle count is reset
		truck[key] = change[key];

		this.setState({truck:truck});
	}

	resetCurrentAxle() {
		this.setState({currentAxle:0});
	}

	render() {
		// redirect after user inputs last axle. only on MNCalculation page
		if (this.state.currentAxle === this.state.truck.axleCount-1 && this.props.location.pathname === '/MNCalculations') {
			return <Redirect push to='/MNCalculations/Output' />;
		}

		return (
			<div>
				<Link to='/MN'><button>Return to MN Home Page</button></Link>

				{/* use flex box so content can collapse when page shrinks */}
				<div className='flexRowMainContent'>
					<span style={{width: '20%'}}></span> {/* left padding for content */}
					<h2>Required Truck Information</h2>
				</div>

				<div className='flexRowMainContent'>
					<span style={{width: '5%'}}></span> {/* left padding for content */}
					<MetaTruckData truck={this.state.truck} handleChangeMetaTruckData={this.handleChangeMetaTruckData}/>
				</div>
				<Route
						exact
						path='/MNCalculations'
						render={(props) => <MNInput {...props}
						currentAxle={this.state.currentAxle}
						truck={this.state.truck}
						handleChangeAxleDetails={this.handleChangeAxleDetails}
						handleAxleDetailsButtonNext={this.handleAxleDetailsButtonNext}
						handleAxleDetailsButtonLast={this.handleAxleDetailsButtonLast} />}
						/>
				<Route
						path='/MNCalculations/Output'
						render={(props) => <MNOutput {...props}
						truck={this.state.truck}
						resetCurrentAxle={this.resetCurrentAxle} />}
						/>
			</div>
		);
	}
}

// display form table for meta truck data, how many axles and what to display
class MetaTruckData extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const target = event.target;
    const value = (target.type === 'checkbox' ? target.checked : target.value); // return boolean for checkboxes
		
		let change = { [target.name] : value};
		this.props.handleChangeMetaTruckData(change);
	}
	
	render() {
		return (
			<div>
				<FlexBoxRow class='flexItemAxleCount'>{{
						one: 'State:',
						two: 'Minnesota'
						}}</FlexBoxRow>
				<FlexBoxRow class='flexItemAxleCount'>{{
						one: 'Select Type of Restriction:',
						two: <RestrictionDropDown restriction={this.props.truck.restriction} handleChange={this.handleChange}/>
						}}</FlexBoxRow>
				<FlexBoxRow class='flexItemAxleCount'>{{
						one: 'Axle Count:',
						two: <AxleCountDropDown axleCount={this.props.truck.axleCount} handleChange={this.handleChange}/>
						}}</FlexBoxRow>
				<FlexBoxRow class='flexItemCheckBox'>{{
						one: 'Calculations:',
						two: <div>10 Ton:<input name='is10Ton' type='checkbox' checked={this.props.truck.is10Ton} onChange={this.handleChange} /></div>,
						three: <div>9 Ton:<input name='is9Ton' type='checkbox' checked={this.props.truck.is9Ton} onChange={this.handleChange} /></div>,
						four: <div>Restricted:<input name='isRestricted' type='checkbox' checked={this.props.truck.isRestricted} onChange={this.handleChange} /></div>
						}}</FlexBoxRow>
			</div>
		)
	}
}


//iterate through children and display them with given className in a flex container
function FlexBoxRow(props) {
	let children = [];
	let counter  = 0;
	for(let value in props.children) {
		children[counter] = <span key={counter} className={props.class}>{props.children[value]}</span>;
		++counter;
	};

	return (
			<div className='flexRowInput'>
				{children}
			</div>
	);
}

function RestrictionDropDown(props) {
	return(
		<select name='restriction' value={props.restriction} onChange={props.handleChange}>
			<option value='No Restriction'>No Restriction</option>
			<option value='8 ton road'>8 ton road</option>
			<option value='7 ton road'>7 ton road</option>
			<option value='6 ton road'>6 ton road</option>
			<option value='5 ton road'>5 ton road</option>
			<option value='4 ton road'>4 ton road</option>
		</select>
	);
}

function AxleCountDropDown(props) {
	return(
		// !!WARNING!! default values for axles are set in MNTruck.js. If max axleCount is increased, set the cooresponding values in MNTruck.js
		<select name='axleCount' value={props.axleCount} onChange={props.handleChange}>
			<option value={8}>8</option>
			<option value={7}>7</option>
			<option value={6}>6</option>
			<option value={5}>5</option>
			<option value={4}>4</option>
			<option value={3}>3</option>
			<option value={2}>2</option>
		</select>
	);
}

export default MNCalculations;