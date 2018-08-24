class NDTruck{
	constructor() {
		this.restriction = 'No Restriction'; //restriction to display
		this.axleCount = 5; // total number of axle
		this.isInterstate = true; // true to display Interstate Highway calculations
		this.isState = false; // true to display State Highwat calculations
		this.isPrimaryNetwork = false; // true to display Primary Network calculations
		this.isRestricted = false; // true to display Restricted calculations
		this.steeringRating = 20000; // rating in lbs or kg of steering tire
		this.weightUnit = 'lbs.'; // unit of weight for steering rating
		this.feet = [0, 8, 8, 8, 8, 8, 8, 8];
		this.inches = [0, 0, 0, 0, 0, 0, 0, 0]; // distance from last axle to this axle, first is always 0
		this.tireCount = [2, 4, 4, 4, 4, 4, 4, 4]; // single or double tires for each axle
		this.tireWidth = [11, 11, 11, 11, 11, 11, 11, 11]; // width in inches or mm or tires
		this.steerable = ['Yes', 'No', 'No', 'No', 'No', 'No', 'No', 'No'];

		this.axleGroups = {};
		this.axleGroups.weightInterstate = [];
		this.axleGroups.weightState = [];
		this.axleGroups.weightPrimary = [];
		this.axleGroups.startAxle = [];
		this.axleGroups.endAxle = [];
		this.axleGroups.numAxles = []; // TODO IS THIS ARRAY NECCESARY?
		this.axleGroups.numTires = []; // TODO IS THIS ARRAY NECCESARY?
		this.axleGroups.tireWidth = []; // TODO IS THIS ARRAY NECCESARY?

		this.bridges = {};
		this.bridges.weight = [];
		this.bridges.startAxle = [];
		this.bridges.endAxle = [];
	}	

	calculate() {
		//TODO add calculations
	}

	// calculate starting and ending axles of axle groups
	calculateAxleGroups() {
		let axleGroups = {};
		axleGroups.startAxle = [];
		axleGroups.endAxle = [];

		let counter = 0;
		axleGroups.startAxle[counter] = 0;
		for (let i=0; i<this.axleCount; ++i) {
			// if the previous distance is 8 feet or greater, start a new axle group
			if ((this.inches[i]/12 + this.feet[i]) >= 8) {
				axleGroups.endAxle[counter-1] = i;
				axleGroups.startAxle[counter] = i;
				++counter;
			}
		}
		axleGroups.endAxle[counter] = this.axleCount;

		return axleGroups;
	}

	//calculate bridge weights based on federal formula with exceptions for MN 10 Ton roads
	calculateBridgeWeights() {
		let bridges = {};
		bridges.weights = [];
		bridges.startAxle = [];
		bridges.endAxle = [];

		// Number of bridges will be C(axleCount,2) or ( axleCount! / 2!(axleCount-2)! )
		// iterate through all combinations of axles
		let counter = 0;
		for (let i=0; i<this.axleCount; ++i) {
			for (let j=i+1; j<this.axleCount; ++j) {
				bridges.weight[counter] = bridgeFormula(i,j);
				bridges.startAxle[counter] = i;
				bridges.endAxle[counter] = j;
				++counter;
			}
		}

		return bridges;

		function bridgeFormula(axle1, axle2) {
			let L = Math.floor(this.getDistBetweenAxlesInFeet(axle1, axle2)); // Length in feet, truncated
			let N = axle2 - axle1 + 1; // Number of axles
			let W = 500 * Math.round( (L*N)/(N-1) + 12*N + 36 ) // Bridge Formula, calculates Weight

			//exceptions
			if ((N===2 || N===3) && L<8)
			{
				W = 34000;
			}
			//"Two consecutive sets of tandem axles may carry a gross load of 34K pounds 
			//each provided the overall distance between the first and last axles of such consecutive
			//sets of tandem axles is 36 feet or more."
			else if (N == 4 && L < 40 && L > 35)
			{
				W = 68000;
			}

			let cap = 0;

			switch (N)
			{
				case 2:
					cap = 40000;
					break;
				case 3:
					cap = 60000;
					break;
				case 4:
					cap = 80000;
					break;
				case 5:
					cap = 100000;
					break;
				default:
					cap = 105500;
					break;
			}

			return Math.min(W, cap);
		}
	}

	getDistBetweenAxlesInFeet(axle1, axle2) {
		let sumInches = 0;
		let sumFeet = 0;
		for (let i=axle1+1; i<=axle2; ++i) {
			sumInches += this.inches[i];
			sumFeet += this.feet[i];
		}
		return (sumInches / 12) + sumFeet;
	}

}

export default NDTruck;