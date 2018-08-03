import React from 'react';
import { Redirect } from 'react-router-dom';

class MNInput extends React.Component {
	render() {
		return (
			<div>
				<div className='flexRowMainContent'>
					<span style={{width: '40%'}}></span> {/* left padding for content */}
					<AxleDetails currentAxle={this.props.currentAxle} truck={this.props.truck}
							handleChangeAxleDetails={this.props.handleChangeAxleDetails} handleAxleDetailsButton={this.props.handleAxleDetailsButton}/>
				</div>
			</div>
		);
	}
}

// display form table to input data for each axle
class AxleDetails extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {buttonText:'Next'};
	}

	handleChange(rightAxle, event) { // pass in 0 for left axle, and 1 for right
		let change = { [event.target.name]:event.target.value, 'rightAxle':rightAxle};
		this.props.handleChangeAxleDetails(change);
	}

	componentWillReceiveProps() {
		if (this.props.currentAxle === this.props.truck.axleCount-2) {
			this.setState({buttonText:'Calculate'}); // last button click will say 'Calculate' instead of 'Next'
		}
	}

	render() {
		let truck = this.props.truck;
		let currentAxle = this.props.currentAxle;

		if (this.props.currentAxle === this.props.truck.axleCount-1) {
			return <Redirect to='/MNCalculations/Output' />; //redirect to Output after last axle entry
		}
		
		return(
			<div>
				{/* pass 0 into handleChange for left axle, and 1 for right axle */}
				<FlexBoxRow class='flexItemAxleDetails'>{{
						one: '',
						two: <div>Axle {currentAxle+1}</div>,
						three: <Modal img='img/AxleDist.png'>Distance</Modal>,
						four: <div>Axle {currentAxle+2}</div>,
						}}</FlexBoxRow>
				<FlexBoxRow class='flexItemAxleDetails'>{{
						one: '# of Tires',
						two: <TireNumDropDown tireCount={truck.tireCount[currentAxle]} handleChange={this.handleChange.bind(this,0)}/>,
						three: <div><FeetDropDown feet={truck.feet[currentAxle+1]} handleChange={this.handleChange.bind(this,1)}/>ft.
								<br /><InchDropDown inches={truck.inches[currentAxle+1]} handleChange={this.handleChange.bind(this,1)}/>in.</div>,
						four: <TireNumDropDown tireCount={truck.tireCount[currentAxle+1]} handleChange={this.handleChange.bind(this,1)}/>
						}}</FlexBoxRow>
				<FlexBoxRow class='flexItemAxleDetails'>{{
						one: <Modal img='img/TireWidth1.PNG'>Tire<br />Width</Modal>,
						two: <TireWidthDropDown tireWidth={truck.tireWidth[currentAxle]} handleChange={this.handleChange.bind(this,0)}/>,
						three: '',
						four: <TireWidthDropDown tireWidth={truck.tireWidth[currentAxle+1]} handleChange={this.handleChange.bind(this,1)}/>
						}}</FlexBoxRow>
				<FlexBoxRow class='flexItemAxleDetails'>{{
						one: <Modal img='img/Axle_Rating.PNG'>Tire<br />Rating</Modal>,
						two: <div><input className='tireRating' type='text' name='tireRating' value={truck.tireRating[currentAxle]} onChange={this.handleChange.bind(this,0)}/>
								<WeightUnitDropDown weightUnit={truck.weightUnit[currentAxle]} handleChange={this.handleChange.bind(this,0)}/></div>,
						three: '',
						four: <div><input className='tireRating' type='text' name='tireRating' value={truck.tireRating[currentAxle+1]} onChange={this.handleChange.bind(this,1)}/>
								<WeightUnitDropDown weightUnit={truck.weightUnit[currentAxle+1]} handleChange={this.handleChange.bind(this,1)}/></div>
						}}</FlexBoxRow>
				<FlexBoxRow class='flexItemAxleDetails'>{{
						one: 'Steerable',
						two: <SteerableDropDown steerable={truck.steerable[currentAxle]} handleChange={this.handleChange.bind(this,0)}/>,
						three: '',
						four: <SteerableDropDown steerable={truck.steerable[currentAxle+1]} handleChange={this.handleChange.bind(this,1)}/>
						}}</FlexBoxRow>
				<FlexBoxRow class='flexItemAxleDetails'>{{
						one: '',
						two: '',
						three: <button onClick={this.props.handleAxleDetailsButton.bind()}>{this.state.buttonText}</button>, //bind handle method so it is not continously executed
						four: ''
						}}</FlexBoxRow>
			</div>
		);
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

function TireNumDropDown(props) {
	return (
		<div>
			<select name='tireCount' value={props.tireCount} onChange={props.handleChange}>
				<option value={2}>2</option>
				<option value={4}>4</option>
			</select>
		</div>
	);
}

function WeightUnitDropDown(props) {
	return (
		<div>
			<select name='weightUnit' value={props.weightUnit} onChange={props.handleChange}>
				<option value='lbs.'>lbs.</option>
				<option value='kg'>kg</option>
			</select>
		</div>
	);
}

function SteerableDropDown(props) {
	return (
		<div>
			<select name='steerable' value={props.steerable} onChange={props.handleChange}>
				<option value='Yes'>Yes</option>
				<option value='No'>No</option>
			</select>
		</div>
	);
}

function TireWidthDropDown(props) {
	return(
		<span>
			<select name='tireWidth' value={props.tireWidth} onChange={props.handleChange}>
				<option value='8'>8 in.</option>
				<option value='8.25'>8.25 in.</option>
				<option value='8.5'>8.5 in.</option>
				<option value='9'>9 in.</option>
				<option value='10'>10 in.</option>
				<option value='11'>11 in.</option>
				<option value='12'>12 in.</option>
				<option value='13'>13 in.</option>
				<option value='14'>14 in.</option>
				<option value='15'>15 in.</option>
				<option value='16'>16 in.</option>
				<option value='215'>215 in.</option>
				<option value='225'>225 in.</option>
				<option value='245'>245 in.</option>
				<option value='255'>255 in.</option>
				<option value='265'>265 in.</option>
				<option value='275'>275 in.</option>
				<option value='285'>285 in.</option>
				<option value='295'>295 in.</option>
				<option value='305'>305 in.</option>
				<option value='315'>315 in.</option>
				<option value='325'>325 in.</option>
				<option value='335'>335 in.</option>
				<option value='345'>345 in.</option>
				<option value='365'>365 in.</option>
				<option value='385'>385 in.</option>
				<option value='425'>425 in.</option>
				{/* <option value={}>Other</option> TODO add other functionality */}
			</select>
		</span>
	)
}

function FeetDropDown(props) {
	return (
		<span>
			<select name='feet' value={props.feet} onChange={props.handleChange}>
				<option value={3}>3</option>
				<option value={4}>4</option>
				<option value={5}>5</option>
				<option value={6}>6</option>
				<option value={7}>7</option>
				<option value={8}>8</option>
				<option value={9}>9</option>
				<option value={10}>10</option>
				<option value={11}>11</option>
				<option value={12}>12</option>
				<option value={13}>13</option>
				<option value={14}>14</option>
				<option value={15}>15</option>
				<option value={16}>16</option>
				<option value={17}>17</option>
				<option value={18}>18</option>
				<option value={19}>19</option>
				<option value={20}>20</option>
				<option value={21}>21</option>
				<option value={22}>22</option>
				<option value={23}>23</option>
				<option value={24}>24</option>
				<option value={25}>25</option>
				<option value={26}>26</option>
				<option value={27}>27</option>
				<option value={28}>28</option>
				<option value={29}>29</option>
				<option value={30}>30</option>
				<option value={31}>31</option>
				<option value={32}>32</option>
				<option value={34}>33</option>
				<option value={35}>34</option>
				<option value={36}>35</option>
				<option value={37}>36</option>
				<option value={38}>37</option>
				<option value={39}>38</option>
				<option value={40}>39</option>
				<option value={41}>40</option>
				<option value={42}>41</option>
				<option value={42}>42</option>
				<option value={43}>43</option>
				<option value={44}>44</option>
				<option value={45}>45</option>
				{/* <option value={}>Other</option> TODO add other functionality */}
			</select>
		</span>
	);
}
function InchDropDown(props) {
	return (
		<span>
			<select name='inches' value={props.inches} onChange={props.handleChange}>
				<option value={0}>0</option>
				<option value={1}>1</option>
				<option value={2}>2</option>
				<option value={3}>3</option>
				<option value={4}>4</option>
				<option value={5}>5</option>
				<option value={6}>6</option>
				<option value={7}>7</option>
				<option value={8}>8</option>
				<option value={9}>9</option>
				<option value={10}>10</option>
				<option value={11}>11</option>
			</select>
		</span>
	);
}

//creat modal, animated pop-up image
class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.handleClose = this.handleClose.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.state = { modalStyle: 'none' }
	}

	handleClose = () => {  // When the user clicks on 'x', close the modal
		this.setState({ modalStyle: 'none' });
	}

	handleClick = () => { // When the user clicks on the text, open the modal
		this.setState({ modalStyle: 'block' });
	}

	render() {
		const styles = { // wrapper for modal style
			modalStyle: { display: this.state.modalStyle }
		};
		return (
			<span>
				<span className='link' onClick={this.handleClick}>{this.props.children}</span>

				<span className="modal" style={styles.modalStyle}>

					{/* The Close Button */}
					<span className="close" onClick={this.handleClose}>&times;</span>

					{/* Modal Content (The Image) */}
					<img className="modal-content" src={this.props.img} alt={this.props.children} />

					{/* Modal Caption (Image Text) */}
					<span className="caption">{this.props.children}</span>
				</span>
			</span>
		);
	}
}

export default MNInput;