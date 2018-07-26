import React, { Component } from "react";

class NDHome extends Component {
    render() {
        return (
            <div>
                <resources />
                <select>
                    <option value="" selected="true">State</option>
                    <option value="/MNHome">Minnesota</option>
                    <option value="/NDHome">North Dakota</option>
                </select>
            </div>
        );
    }
}

function resources() {
    return (
        <div>
            <h4>Resources</h4>
                <ul>
                    <li><a href="http://www.ndltap.org/resources/truckweight.php">NLDTAP Truck Weight Resources</a></li>
                    <li><a href="http://www.nd.gov/ndhp/motor-carrier/legal-vehicle-size-and-weight">NDHP Vehicle Size and Weight</a></li>
                    <li><a href="http://www.dot.nd.gov/business/motor-carrier.htm">NDDOT Motor Carrier Services</a></li>
                    <li><a href="http://www.ugpti.org">UGPTI</a></li>
                </ul>
        </div>
    );
}

export default NDHome;