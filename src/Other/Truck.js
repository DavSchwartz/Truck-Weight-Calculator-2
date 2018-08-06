class Truck{
	constructor() {
		this.restriction = 'No Restriction'; //restriction to display
		this.axleCount = 5; // total number of axle
		this.is10Ton = true; // true to display 10 Ton calculations
		this.is9Ton = true; // true to display 9 Ton calculations
		this.isRestricted = false; // true to display Restricted calculations
		this.feet = [0, 8, 8, 8, 8, 8, 8, 8];
		this.inches = [0, 0, 0, 0, 0, 0, 0, 0]; // distance from last axle to this axle, first is always 0
		this.tireCount = [2, 4, 4, 4, 4, 4, 4, 4]; // single or double tires for each axle
		this.tireWidth = [11, 11, 11, 11, 11, 11, 11, 11]; // width in inches or mm or tires
		this.tireRating = [20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000]; // rating in lbs or kg of tires
		this.weightUnit = ['lbs.', 'lbs.', 'lbs.', 'lbs.', 'lbs.', 'lbs.', 'lbs.', 'lbs.']; // unit of weight for tire rating
		this.steerable = ['Yes', 'No', 'No', 'No', 'No', 'No', 'No', 'No'];

		this.axleGroups = {};
		this.axleGroups.weight = [];
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
		let exteriorLength = this.getDistBetweenAxlesInFeet(0,this.axleCount-1);
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
			let L = Math.round(this.getDistBetweenAxlesInFeet(axle1, axle2)); // Length in feet, rounded up
			let N = axle2 - axle1 + 1; // Number of axles
			let W = 500 * Math.ceil( (L*N)/(N-1) + 12*N + 36 ) // Bridge Formula, calculates Weight

			// exception on federal formula for MN axle weight limit table
			// 2 and 3 axle
			if ((N === 2 || N === 3) && exteriorLength <= 8)
			{
					W = 34000;
			}
			//8+ values
			else if (N===2 && exteriorLength < 9) {
				W = 38000;
			}
			else if (N===3 && exteriorLength < 9) {
				W = 42000;
			}
			// 4 axle: starting with L==46, every 3rd axle must be decreased by 500
			else if (N === 4 && L > 45 && ((L - 46) % 3 === 0))
			{
				W -= 500;
			}
			// 5 axle: every 4th starting with L==53, and every 4th starting with L==54 must be decreased by 500
			else if (N === 5 && L > 52 && (((L - 53) % 4 === 0) || ((L - 54) % 4 === 0)))
			{
				W -= 500;
			}
			// 6 axle: every 5th starting with L==46 and every 5th starting at L==47 must be decreased by 500
			else if (N === 6 && L > 45 && (((L - 46) % 5 === 0) || ((L - 47) % 5 === 0)))
			{
				W -= 500;
			}
			// 7 axle: starting with L==37, every other group of 3 and when L==64 must be decrease by 500
			else if (N === 7 && L > 36 && ( L === 64 || (((L - 37) % 6 === 0) || ((L - 38) % 6 === 0) || ((L - 39) % 6 === 0))))
			{
				W -= 500;
			}
			// 8 axle: every 7th starting with L==46, every 7th starting with L==47, every 7th starting with L==48 and when L==74 must be decreased by 500
			else if (N === 8 && L > 35 && ( L === 74 || (((L - 36) % 7 === 0) || ((L - 37) % 7 === 0) || ((L - 38) % 7 === 0))))
			{
				W -= 500;
			}

			let cap=0;
			// MN caps on weight based on axle count
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
					cap = 85500;
					break;
				case 6:
					cap = 90000;
					break;
				case 7:
					cap = 97000;
					break;
				default:
					cap = 108000; // 8 axles: most weight any bridge can carry
					break;
			}

			W = Math.min(W,cap);
			return W;
		}
	}

	//apply 9 Ton road exceptions to bridge weight values
	bridgeWeightExceptions9Ton(bridges) {
		let exteriorLength = this.getDistBetweenAxlesInFeet(0,this.axleCount-1);
		// iterate through all combinations of axles to apply 9Ton exceptions
		let counter = 0;
		for (let i=0; i<this.axleCount; ++i) {
			for (let j=i+1; j<this.axleCount; ++j) {
				bridges.weight[counter] = exceptions9Ton(bridges.weight[counter], i, j);
				++counter;
			}
		}

		return bridges;

		function exceptions9Ton(weight, axle1, axle2) {
			let L = Math.round(this.getDistBetweenAxlesInFeet(axle1, axle2)); // Length in feet, rounded up
			let N = axle2 - axle1 + 1; // Number of axles
			let W = weight;

			// exception on federal formula for MN axle weight limit table, 9 Ton roads only
			if (N===2)
			{
				if (exteriorLength < 9) { // 8+ values
					W = 34000;
				}
				else if (L===9)
				{
					W = 35000;
				}
				else if (L===10)
				{
					W = 36000;
				}
			}

			let cap = 0;
			// MN caps on weight based on axle count, 9 Ton roads only
			switch (N)
			{
				case 2:
					cap = 36000;
					break;
				case 3:
					cap = 54000;
					break;
				case 4:
					cap = 72000;
					break;
				// TODO SHOULD THIS VALUE BE 80,000?
				default:
					cap = 108000 // most weight any bridge can carry
					break;
			}

			W = Math.min(W,cap);
			return W;
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

export default Truck;