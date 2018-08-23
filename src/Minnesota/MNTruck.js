class MNTruck{
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
		this.axleGroups.weight10Ton = [];
		this.axleGroups.weight9Ton = [];
		this.axleGroups.startAxle = [];
		this.axleGroups.endAxle = [];
		this.axleGroups.numAxles = []; // TODO IS THIS ARRAY NECCESARY?
		this.axleGroups.numTires = []; // TODO IS THIS ARRAY NECCESARY?
		this.axleGroups.tireWidth = []; // TODO IS THIS ARRAY NECCESARY?

		this.bridges = {};
		this.bridges.weight10Ton = [];
		this.bridges.weight9Ton = [];
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
		bridges.weights10Ton = [];
		bridges.weights9Ton = [];
		bridges.startAxle = [];
		bridges.endAxle = [];

		// Number of bridges will be C(axleCount,2) or ( axleCount! / 2!(axleCount-2)! )
		// iterate through all combinations of axles
		let counter = 0;
		for (let i=0; i<this.axleCount; ++i) {
			for (let j=i+1; j<this.axleCount; ++j) {
				bridges.weight10Ton[counter] = bridgeFormula(i, j);
				bridges.weight9Ton[counter] = exceptions9Ton(i, j, bridges.weight10Ton[counter]);
				bridges.startAxle[counter] = i;
				bridges.endAxle[counter] = j;
				++counter;
			}
		}

		return bridges;

		function bridgeFormula(axle1, axle2) {
			let originalLength = this.getDistBetweenAxlesInFeet(axle1, axle2);
			let L = Math.round(originalLength); // Length in feet, rounded away from zero
			let N = axle2 - axle1 + 1; // Number of axles
			let W = (L*N)/(N-1) + 12*N + 36 // Bridge Formula, will be multiplied by 500 later

			// exceptions
			switch (N) {
				case 2:
					if (originalLength >= 9) {
						// floor, celing, rounding away from zero, and rounding towards zero works
						W = Math.ceil(W);
					}
					else if (originalLength <= 8) {
						W = 68; // 68*500 = 34,000
					}
					else { // 8+ values
						W = 76; // 76*500 = 38,000
					}
					break;
				case 3:
					if (originalLength >= 9) {
						// celing and rounding away from zero works
						W = Math.ceil(W);
					}
					else if (originalLength <= 8) {
						W = 68; // 68*500 = 34,000
					}
					else { // 8+ values
						W = 84; // 84*500 = 42,000
					}
					break;
				case 4:
					// rounding away from zero and rounding towards zero works
					if (L >= 44) {
						W = roundTowardsZero(W);
					}
					else if (L <= 45) {
						W = Math.ceil(W);
					}
					break;
				case 5:
					if (L >= 51) {
						W = roundTowardsZero(W);
					}
					else if (L <= 52) {
						W = Math.ceil(W);
					}
					break;
				case 6:
					// rounding away from zero and rounding towards zero works
					if (L >= 43) {
						W = roundTowardsZero(W);
					}
					else if (L <= 45) {
						W = Math.ceil(W);
					}
					break;
				case 7:
					if (L === 64) {
						W = 194; // 194*500 = 97,000
					}
					else if (L >= 34) {
						W = roundTowardsZero(W);
					}
					else if (L <= 36) {
						W = Math.ceil(W);
					}
					break;
				case 8:
					if (L === 74) {
						W = 216; // 216*500 = 108,000
					}
					// rounding away from zero and rounding towards zero works
					else if (L >= 32) {
						W = roundTowardsZero(W);
					}
					else if(L <= 35) {
						W = Math.ceil(W);
					}
					break;
				default:
					W = roundTowardsZero(W);
					break;
			}

			W = W*500;

			let cap;
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

			// round down for midpoints, otherwise round normally
			function roundTowardsZero(x) {
				if ((x - .5) === Math.floor(x)) { // check if it is a midpoint
					return Math.floor(x);
				}
				else {
					return Math.round(x);
				}
			}
		}

		// exceptions on formula for 9 Ton
		function exceptions9Ton(axle1, axle2, W) {
			let originalLength = this.getDistBetweenAxlesInFeet(axle1, axle2); // Length in feet, rounded up
			let L = Math.round(originalLength);
			let N = axle2 - axle1 + 1; // Number of axles

			if (N===2) {
				if (originalLength > 8 && originalLength < 9) { // 8+ values
					W = 34000;
				}
				else if (L === 9) {
					W = 35000;
				}
				else if (L === 10) {
					W = 36000;
				}
			}

			let cap=0;
			// MN caps on weight based on axle count
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

export default MNTruck;