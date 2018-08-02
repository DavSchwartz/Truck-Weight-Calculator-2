class Truck{
	constructor() {
		this.restriction = 'No Restriction';
		this.axleCount = 5;
		this.is10Ton = true;
		this.is9Ton = true;
		this.isRestricted = false;
		this.feet = [0, 8, 8, 8, 8, 8, 8, 8];
		this.inches = [0, 0, 0, 0, 0, 0, 0, 0];
		this.tireCount = [2, 4, 4, 4, 4, 4, 4, 4];
		this.tireWidth = [11, 11, 11, 11, 11, 11, 11, 11];;
		this.tireRating = [20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000];
		this.weightUnit = ['lbs.', 'lbs.', 'lbs.', 'lbs.', 'lbs.', 'lbs.', 'lbs.', 'lbs.'];
		this.steerable = ['Yes', 'No', 'No', 'No', 'No', 'No', 'No', 'No'];
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