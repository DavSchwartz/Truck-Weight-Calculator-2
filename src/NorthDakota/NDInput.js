import React from 'react';

// display form table to input axle details data
class NDInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.SteeringRatingRow = this.SteeringRatingRow.bind(this);
		this.state = {buttonText:'Next', lastButtonVisibility:false, steeringRatingVisibility:true};
	}

	handleChange(leftOrRightaxle, event) { // pass in 0 for left axle, and 1 for right
		let change = { [event.target.name]:event.target.value };
		this.props.handleChangeAxleDetails(leftOrRightaxle, change);
	}
	
	componentDidUpdate() {
		// Only show steering rating when current axle is zero
		if (this.state.steeringRatingVisibility === false && this.props.currentAxle === 0) {
			this.setState({steeringRatingVisibility:true});
		}
		else if (this.state.steeringRatingVisibility === true && this.props.currentAxle !== 0) {
			this.setState({steeringRatingVisibility:false});
		}

		// Hide 'Last' button on currentAxle===0
		if (this.props.currentAxle === 0 && this.state.lastButtonVisibility === true) {
			this.setState({lastButtonVisibility: false});
		}
		else if (this.props.currentAxle === 1 && this.state.lastButtonVisibility === false) {
			this.setState({lastButtonVisibility: true});
		}

		// second button will change to 'Calculate' instead of 'Next' on final axle
		if (this.props.currentAxle === this.props.truck.axleCount-2 && this.state.buttonText === 'Next') {
			this.setState({buttonText:'Calculate'});
		}
		else if(this.props.currentAxle !== this.props.truck.axleCount-2 && this.state.buttonText === 'Calculate') {
			this.setState({buttonText:'Next'})
		}
	}

	SteeringRatingRow() {
		if (this.state.steeringRatingVisibility) {
			return(
					<FlexBoxRow class='flexItemAxleDetails'>{{
							one: <Modal img='img/Axle_Rating.PNG'>Steering<br />Axle<br />Rating</Modal>,
							two: <div><input className='txtBox' type='text' name='steeringRating' value={this.props.truck.steeringRating} onChange={this.handleChange.bind(this,-1)}/>
									<WeightUnitDropDown weightUnit={this.props.truck.weightUnit} handleChange={this.handleChange.bind(this,-1)}/></div>,
							three: '',
							four: '',
							}}</FlexBoxRow>
			);
		}
		else {
			return null;
		}
	}

	render() {
		let truck = this.props.truck;
		let currentAxle = this.props.currentAxle;
		
		return(
			<div>
				<div className='flexRowMainContent'>
					<span style={{width: '40%'}}></span> {/* left padding for content */}
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
								three: <div><FeetDropDown currentAxle={currentAxle} feet={truck.feet[currentAxle+1]} handleChange={this.handleChange.bind(this,1)}/>
										<br /><InchDropDown inches={truck.inches[currentAxle+1]} handleChange={this.handleChange.bind(this,1)}/></div>,
								four: <TireNumDropDown tireCount={truck.tireCount[currentAxle+1]} handleChange={this.handleChange.bind(this,1)}/>
								}}</FlexBoxRow>
						<FlexBoxRow class='flexItemAxleDetails'>{{
								one: <Modal img='img/TireWidth1.PNG'>Tire<br />Width</Modal>,
								two: <TireWidthDropDown currentAxle={currentAxle} tireWidth={truck.tireWidth[currentAxle]} handleChange={this.handleChange.bind(this,0)}/>,
								three: '',
								four: <TireWidthDropDown currentAxle={currentAxle} tireWidth={truck.tireWidth[currentAxle+1]} handleChange={this.handleChange.bind(this,1)}/>
								}}</FlexBoxRow>
						<this.SteeringRatingRow />
						<FlexBoxRow class='flexItemAxleDetails'>{{
								one: '',
								two: <div>{this.state.lastButtonVisibility && <button onClick={this.props.handleAxleDetailsButtonLast.bind()}>Last</button>}</div>, // bind handle method so it is not continously executed
								three: <button onClick={this.props.handleAxleDetailsButtonNext.bind()}>{this.state.buttonText}</button>,
								four: ''
								}}</FlexBoxRow>
					</div>
				</div>
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

// dropdown for tire width, prop value controls optional text box, local value controls drop down
class TireWidthDropDown extends React.Component {
	constructor(props) {
		super(props);
		this.handleLocalChange = this.handleLocalChange.bind(this);
		this.OtherTxtBox = this.OtherTxtBox.bind(this);
		this.state = {localTireWidth:this.props.tireWidth, tireWidthTxtVisibility:false, txtBoxFocus:false}
		// array to check if an option is valid
		this.options = [8, 8.25, 8.5, 9, 10, 11, 12, 13, 14, 15, 16, 215, 225, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335, 345, 365, 385, 425];
		this.localCurrentAxle = this.props.currentAxle; // used to check if currentAxle changed
	}

	componentDidUpdate() {
		// if currentAxle changes, check if options textbox should be hidden or shown
		if (this.localCurrentAxle !== this.props.currentAxle) {
			if (this.state.tireWidthTxtVisibility === true) {
				if (this.options.includes(this.props.tireWidth)) { // if it is a valid option
					this.setState({tireWidthTxtVisibility:false, localTireWidth:this.props.tireWidth});
				}
			}
			else {
				if (!this.options.includes(this.props.tireWidth)) { // if it is not a valid option
					this.setState({tireWidthTxtVisibility:true, localTireWidth:'Other'});
				}
			}
			this.setState({txtBoxFocus:false}); // reset focus when currentAxle changes
		}
		this.localCurrentAxle = this.props.currentAxle; // reset currentAxle
	}

	handleLocalChange(event) {
		// show textbox if 'Other' is selected and give focus to it
		if (event.target.value==='Other') {
			this.setState({ tireWidthTxtVisibility : true, localTireWidth:'Other', txtBoxFocus:true });
			return;
		} else if (this.state.tireWidthTxtVisibility === true) { // hide textbox if options is not selected
			this.setState({ tireWidthTxtVisibility : false });
		}
		this.setState({ localTireWidth:event.target.value }); // update local value
		this.props.handleChange(event); // update prop value
	}

	OtherTxtBox() {
		if (this.state.tireWidthTxtVisibility) {
			return <input className='txtBox' autoFocus={this.state.txtBoxFocus} type='text' name='tireWidth' value={this.props.tireWidth} onChange={this.props.handleChange} />;
		}
		else {
			return null;
		}
	}

	render() {
		return(
			<span> 
				{/* IF OPTION IS ADDED, ADD IT TO 'options' ARRAY */}
				<select name='tireWidth' value={this.state.localTireWidth} onChange={this.handleLocalChange}>
					<option value={8}>8 in.</option>
					<option value={8.25}>8.25 in.</option>
					<option value={8.5}>8.5 in.</option>
					<option value={9}>9 in.</option>
					<option value={10}>10 in.</option>
					<option value={11}>11 in.</option>
					<option value={12}>12 in.</option>
					<option value={13}>13 in.</option>
					<option value={14}>14 in.</option>
					<option value={15}>15 in.</option>
					<option value={16}>16 in.</option>
					<option value={215}>215 in.</option>
					<option value={225}>225 in.</option>
					<option value={245}>245 in.</option>
					<option value={255}>255 in.</option>
					<option value={265}>265 in.</option>
					<option value={275}>275 in.</option>
					<option value={285}>285 in.</option>
					<option value={295}>295 in.</option>
					<option value={305}>305 in.</option>
					<option value={315}>315 in.</option>
					<option value={325}>325 in.</option>
					<option value={335}>335 in.</option>
					<option value={345}>345 in.</option>
					<option value={365}>365 in.</option>
					<option value={385}>385 in.</option>
					<option value={425}>425 in.</option>
					<option value='Other'>Other</option>
				</select>
				<this.OtherTxtBox />
			</span>
		)
	}
}

// dropdown for feet, prop value controls optional text box, local value controls drop down
class FeetDropDown extends React.Component {
	constructor(props) {
		super(props);
		this.handleLocalChange = this.handleLocalChange.bind(this);
		this.OtherTxtBox = this.OtherTxtBox.bind(this);
		this.state = {localFeet:this.props.feet, feetTxtVisibility:false, txtBoxFocus:false}
		this.localCurrentAxle = this.props.currentAxle; // used to check if currentAxle changed
	}

	componentDidUpdate() {
		// if currentAxle changes, check if options textbox should be hidden or shown
		if (this.localCurrentAxle !== this.props.currentAxle) {
			if (this.state.feetTxtVisibility === true) {
				if (this.props.feet >= 3 && this.props.feet <= 45) { // if it is a valid option
					this.setState({feetTxtVisibility:false, localFeet:this.props.feet});
				}
			}
			else {
				if (this.props.feet < 3 || this.props.feet > 45) { // if it is not a valid option
					this.setState({feetTxtVisibility:true, localFeet:'Other'});
				}
			}
			this.setState({txtBoxFocus:false}); // reset focus when currentAxle changes
		}
		this.localCurrentAxle = this.props.currentAxle; // reset currentAxle
	}

	handleLocalChange(event) {
		// show textbox if 'Other' is selected and give focus to it
		if (event.target.value==='Other') {
			this.setState({ feetTxtVisibility : true, localFeet:'Other', txtBoxFocus:true });
			return;
		} else if (this.state.feetTxtVisibility === true) { // hide textbox if options is not selected
			this.setState({ feetTxtVisibility : false });
		}
		this.setState({ localFeet:event.target.value }); // update local value
		this.props.handleChange(event); // update prop value
	}

	OtherTxtBox() {
		if (this.state.feetTxtVisibility) {
			return <input className='txtBox' autoFocus={this.state.txtBoxFocus} type='text' name='feet' value={this.props.feet} onChange={this.props.handleChange} />;
		}
		else {
			return null;
		}
	}

	render() {
		return (
			<span>
				{/* IF OPTION IS ADDED, UPDATE CONDITION IN componentDidUpdate METHOD */}
				<select name='feet' value={this.state.localFeet} onChange={this.handleLocalChange}>
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
					<option value='Other'>Other</option>
				</select>
				ft.
				<this.OtherTxtBox />
			</span>
		);
	}
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
			in.
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

export default NDInput;