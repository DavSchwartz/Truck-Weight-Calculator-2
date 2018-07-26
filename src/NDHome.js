import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class NDHome extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = { redirect : false, location : '/' }
    }

    onChange(event) {
        this.setState({location: event.target.value, redirect : true});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.location} />;
        }

        return (
            <div>
                <Resources />
                <select onChange={ this.onChange } defaultValue='/NDHome' >
                    <option value=''>State</option>
                    <option value='/MNHome'>Minnesota</option>
                    <option value='/NDHome' defaultValue>North Dakota</option>
                </select>
            </div>
        );
    }
}

function Resources() {
    return (
        <div>
            <h4>Resources</h4>
                <ul>
                    <li><a href='http://www.ndltap.org/resources/truckweight.php'>NLDTAP Truck Weight Resources</a></li>
                    <li><a href='http://www.nd.gov/ndhp/motor-carrier/legal-vehicle-size-and-weight'>NDHP Vehicle Size and Weight</a></li>
                    <li><a href='http://www.dot.nd.gov/business/motor-carrier.htm'>NDDOT Motor Carrier Services</a></li>
                    <li><a href='http://www.ugpti.org'>UGPTI</a></li>
                </ul>
        </div>
    );
}

export default NDHome;