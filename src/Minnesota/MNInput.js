import React from 'react';
import { Link } from 'react-router-dom'
import Truck from '../Other/Truck';
import './CSS/MNInput.css';

class MNInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleAxleDetailsButton = this.handleAxleDetailsButton.bind(this);
		this.handleChangeMetaTruckData = this.handleChangeMetaTruckData.bind(this);
		this.truck = new Truck('No Restriction', 5, true, true, false); //pre-set meta truck data
		this.currentAxle = 0;
  }

	handleAxleDetailsButton(change) {
		var key = Object.keys(change)[0];
		this.truck[key][this.currentAxle] = change[key];
	}
	
	handleChangeMetaTruckData(change) {
		var key = Object.keys(change)[0];
		if (key === 'axleCount') { this.currentAxle = 0;}
		this.truck[key] = change[key];
	}
	
	render() {
		return (
			<div>
				<Link to='/MN'><button>Return to MN Home Page</button></Link>

				<div className='flexRowMainContent'>
					<span style={{width: '20%'}}></span>
					<h2>Required Truck Information</h2>
				</div>

				<div className='flexRowMainContent'>
					<span style={{width: '5%'}}></span>
					<MetaTruckData truck={this.truck} handleChangeMetaTruckData={this.handleChangeMetaTruckData}/>
				</div>

				<div className='flexRowMainContent'>
					<span style={{width: '40%'}}></span>
					<AxleDetails handleAxleDetailsButton={this.handleAxleDetailsButton}/>
				</div>

			</div>
		);
	}
}


class MetaTruckData extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		var truck = props.truck;
		this.state = {axleCount:truck.axleCount, restriction:truck.restriction, is10Ton:truck.is10Ton, is9Ton:truck.is9Ton, isRestricted:truck.isRestricted};
	}

	handleChange(event) {
		const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		
		let change = { [name] : value};
		this.setState(change);
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
					two: <RestrictionDropDown restriction={this.state.restriction} handleChange={this.handleChange}/>
				}}</FlexBoxRow>
				<FlexBoxRow class='flexItemAxleCount'>{{
					one: 'Axle Count:',
					two: <AxleCountDropDown axleCount={this.state.axleCount} handleChange={this.handleChange}/>
				}}</FlexBoxRow>
				<FlexBoxRow class='flexItemCheckBox'>{{
					one: 'Calculations:',
					two: <div>10 Ton:<input name='is10Ton' type='checkbox' checked={this.state.is10Ton} onChange={this.handleChange} /></div>,
					three: <div>9 Ton:<input name='is9Ton' type='checkbox' checked={this.state.is9Ton} onChange={this.handleChange} /></div>,
					four: <div>Restricted:<input name='isRestricted' type='checkbox' checked={this.state.isRestricted} onChange={this.handleChange} /></div>
				}}</FlexBoxRow>
			</div>
		)
	}
}

class AxleDetails extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleAxleDetailsButton = this.handleAxleDetailsButton.bind(this);
		this.state = {};
	}

	handleChange(event) {		
		let change = { [event.target.name] : event.target.value};
		this.setState(change);
	}

	handleAxleDetailsButton(event) {
		let change = {}; // TODO not done
		this.props.handleAxleDetailsButton(change);
	}

	render() {
		return(
			<div>
				<FlexBoxRow class='flexItemAxleDetails'>{{
					one: '',
					two: 'Axle 1',
					three: <Modal img='\img\AxleDist.png'>Distance</Modal>,
					four: 'Axle 2'
				}}</FlexBoxRow>
				<FlexBoxRow class='flexItemAxleDetails'>{{
					one: '# of Tires',
					two: <TireNumDropDown />,
					three: <FeetInchDropDown />,
					four: <TireNumDropDown />,
				}}</FlexBoxRow>
				<FlexBoxRow class='flexItemAxleDetails'>{{
					one: <Modal img='img\TireWidth1.PNG'>Tire<br />Width</Modal>,
					two: <TireWidthDropDown />,
					three: '',
					four: <TireWidthDropDown />,
				}}</FlexBoxRow>
				<FlexBoxRow class='flexItemAxleDetails'>{{
					one: <Modal img='img\Axle_Rating.PNG'>Tire<br />Rating</Modal>,
					two: <WeightUnitDropDown />,
					three: '',
					four: <WeightUnitDropDown />,
				}}</FlexBoxRow>
				<FlexBoxRow class='flexItemAxleDetails'>{{
					one: 'Steerable',
					two: <SteerableDropDown />,
					three: '',
					four: <SteerableDropDown />,
				}}</FlexBoxRow>
				<FlexBoxRow class='flexItemAxleDetails'>{{
					one: '',
					two: '',
					three: <button onClick={this.handleAxleDetailsButton.bind()}>Next</button>,
					four: '',
				}}</FlexBoxRow>
			</div>
		);
	}
}



//iterate through children and display them with given className
function FlexBoxRow(props) {
	var children = [];
	var counter  = 0;
	for(var value in props.children) {
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

function TireNumDropDown() {
	return (
		<div>
			<select defaultValue={4}>
				<option value={2}>2</option>
				<option value={4}>4</option>
			</select>
		</div>
	);
}
function WeightUnitDropDown() {
	return (
		<div>
			<select defaultValue='lbs.'>
				<option value='lbs.'>lbs.</option>
				<option value='kg'>kg</option>
			</select>
		</div>
	);
}
function SteerableDropDown() {
	return (
		<div>
			<select defaultValue='Yes'>
				<option value='Yes'>Yes</option>
				<option value='No'>No</option>
			</select>
		</div>
	);
}

function TireWidthDropDown() {
	return(
		<div>
			<select defaultValue={11}>
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
		</div>
	)
}

function FeetInchDropDown() {
	return (
		<div>
			<select defaultValue={8}>
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
			ft.
			<select defaultValue={0}>
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
			in.
		</div>
	)
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