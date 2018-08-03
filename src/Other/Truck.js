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
	}	

	calculate() {
		//TODO add calculations
	}

	/*
	//OLD C# TRUCK VARIABLES
	// axle details
	private int[] numTires { get; set; }
	private double[] tireWidth { get; set; }
	private int[] distanceToLastAxle { get; set; } // in inches
	private double[] Rating { get; set; } // ND: only steering rating  MN: tire ratings
	private bool[] isSteerable { get; set; }

	// axle-group details
	private int[] startOfAxleGroup;
	private int[] endofAxleGroup;
	private int[] numAxlesInAxleGroup;
	private int[] numTiresInAxleGroup;
	private double[] tireWidthOfAxleGroup; // TODO do I need this?

	// bridge details
	int[] startOfBridgeGroup;
	int[] endOfBridgeGroup;
	int[] weightOfBridgeGroup;
	*/
}

export default Truck;