class Truck{
constructor(restriction, axleCount, is10Ton, is9Ton, isRestricted) {
	this.restriction = restriction;
	this.axleCount = axleCount;
	this.is10Ton = is10Ton;
	this.is9Ton = is9Ton;
	this.isRestricted = isRestricted;
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