import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Truck from '../Other/Truck';
import MNInput from './MNInput';
import MNOutput from './MNOutput';
import './CSS/MNCalculations.css';

class MNCalculations extends React.Component {
	constructor(props) {
		super(props);
		this.handleAxleDetailsButton = this.handleAxleDetailsButton.bind(this);
		this.handleChangeAxleDetails = this.handleChangeAxleDetails.bind(this);
		this.resetCurrentAxle = this.resetCurrentAxle.bind(this);
		this.handleChangeMetaTruckData = this.handleChangeMetaTruckData.bind(this);
		this.state = {currentAxle:0, truck: new Truck()}; // axles are indexed at zero
  }

	handleChangeAxleDetails(change) {
		let truck = this.state.truck;
		let key = Object.keys(change)[0]; // identifier of truck property being changed

		// change.rightaxle: 0 is for left axle, and 1 is for right axle in the UI
		truck[key][this.state.currentAxle + change.rightAxle] = change[key];
		this.setState({truck:truck});
	}

	handleAxleDetailsButton() {
		this.setState({currentAxle:this.state.currentAxle+1}); //increase current axle when button is pressed
	}

	resetCurrentAxle() {
		this.setState({currentAxle:0});
	}
	
	handleChangeMetaTruckData(change) {
		let truck = this.state.truck;

		let key = Object.keys(change)[0]; // identifier of truck property being changed
		if (key === 'axleCount') { this.setState({currentAxle:0}) } // reset currentAxle to 0 if axle count is reset
		truck[key] = change[key];

		this.setState({truck:truck});
	}

	render() {
		return (
			<div>
				<Link to='/MN'><button>Return to MN Home Page</button></Link>

				{/* use flex box so conent can collapse when page shrinks */}
				<div className='flexRowMainContent'>
					<span style={{width: '20%'}}></span> {/* left padding for content */}
					<h2>Required Truck Information</h2>
				</div>

				<div className='flexRowMainContent'>
					<span style={{width: '5%'}}></span> {/* left padding for content */}
					<MetaTruckData truck={this.state.truck} handleChangeMetaTruckData={this.handleChangeMetaTruckData}/>
				</div>

					<Switch>
						<Route
								exact
								path='/MNCalculations'
								render={(props) => <MNInput {...props} currentAxle={this.state.currentAxle} truck={this.state.truck}
								handleChangeAxleDetails={this.handleChangeAxleDetails} handleAxleDetailsButton={this.handleAxleDetailsButton}
								resetCurrentAxle={this.resetCurrentAxle} />}
								/>
						<Route
								path='/MNCalculations/Output'
								component={MNOutput}
								/>
					</Switch>

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
		// !!WARNING!! default values for axles are set in Truck.js. If max axleCount is increased, set the cooresponding values in Truck.js
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