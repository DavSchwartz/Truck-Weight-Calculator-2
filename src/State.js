import React, { Component } from "react";

class State extends Component {
    render() {
        return (
            <div>
                <Resources />
            </div>
        );
    }
}

function Resources() {
    return (
        <div>
            <h4>Resources</h4>
                <ul>
                    <li>NLDTAP Truck Weight Resources</li>
                    <li>NDHP Vehicle Size and Weight</li>
                    <li>NDDOT Motor Carrier Services</li>
                    <li>UGPTI</li>
                </ul>
        </div>
    );
}

export default State;