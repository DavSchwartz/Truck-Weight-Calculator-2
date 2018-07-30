import React from 'react';
import { Link } from 'react-router-dom'
import './CSS/MNInput.css';

class MNInput extends React.Component {
	render() {
		return (
			<div>
				<Link to='/MN'><button>Return to MN Home Page</button></Link>
				<h2 className='title'>Required Truck Information</h2>

				<div>
					<div className='row-container'>
						<span className='item'>State:</span>
						<span className='item'>Minnesota</span>
					</div>
					<div className='row-container'>
						<span className='item'>Select type of restriction</span>
						<span className='item'>
							<select defaultValue='By Legal Weight'>
								<option value='By Legal Weight'>By Legal Weight</option>
								<option value='8 ton road'>8 ton road</option>
								<option value='7 ton road'>7 ton road</option>
								<option value='6 ton road'>6 ton road</option>
								<option value='5 ton road'>5 ton road</option>
								<option value='4 ton road'>4 ton road</option>
							</select>
						</span>
					</div>
					<div className='row-container'>
						<span className='item'>Axle Count</span>
						<span className='item'>
							<select defaultValue={5} >
								<option value={8}>8</option>
								<option value={7}>7</option>
								<option value={6}>6</option>
								<option value={5}>5</option>
								<option value={4}>4</option>
								<option value={3}>3</option>
								<option value={2}>2</option>
							</select>
						</span>
					</div>
				</div>

				<div>
					<div>
						<span className='item1'></span>
						<span className='item1'>Axle 1</span>
						<span className='item1'><Modal img='\img\AxleDist.png'>Distance</Modal></span>
						<span className='item1'>Axle 2</span>
					</div>
					<div>
						<span className='item1'># of Tires</span>
						<span className='item1'>
							<select defaultValue={2}>
								<option value={2}>2</option>
								<option value={4}>4</option>
							</select>
						</span>
						<span className='item1'>
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
						</span>
						<span className='item1'>
							<select defaultValue={4}>
								<option value={2}>2</option>
								<option value={4}>4</option>
							</select>
						</span>
					</div>
					<div>
						<span className='item1'><Modal img='img\TireWidth1.PNG'>Tire Width</Modal></span>
						<span className='item1'>
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
						</span>
						<span className='item1'></span>
						<span className='item1'>
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
						</span>
					</div>
					<div>
						<span className='item1'><Modal img='img\Axle_Rating.PNG'>Tire Rating</Modal></span>
						<span className='item1'>
							<input type="text" />
							<select defaultValue='lbs.'>
								<option value='lbs.'>lbs.</option>
								<option value='kg'>kg</option>
							</select>
						</span>
						<span className='item1'></span>
						<span className='item1'>
							<input type="text" />
							<select defaultValue='lbs.'>
								<option value='lbs.'>lbs.</option>
								<option value='kg'>kg</option>
							</select>
						</span>
					</div>
					<div>
						<span className='item1'>Steerable</span>
						<span className='item1'>
							<select defaultValue='Yes'>
								<option value='Yes'>Yes</option>
								<option value='No'>No</option>
							</select>
						</span>
						<span className='item1'></span>
						<span className='item1'>
							<select defaultValue='No'>
								<option value='Yes'>Yes</option>
								<option value='No'>No</option>
							</select>
						</span>
					</div>
				</div>

				<button>Next</button>

			</div>
		);
	}
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
				<span className='axleRatingLink' onClick={this.handleClick}>{this.props.children}</span>

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