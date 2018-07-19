import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import MNHome from "./MNHome";
import State from "./State";

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <img src={window.location.origin + '/img/Spliced-Website-Header-(UGPTI).png'} style={{ width: '100%' }} />

                    <ul>
                        <li><NavLink to="/">State</NavLink></li>
                        <li><NavLink to="/MNHome">MNHome</NavLink></li>
                    </ul>

                    <div className="content">
                        <Route exact path="/" component={State}/>
                        <Route path="/MNHome" component={MNHome}/>
                    </div>

                    <a target="_blank" href="http://www.ugpti.org/dotsc/" />
                    <img src={window.location.origin + '/img/logo_DOTSC.jpg'} style={{ width: '60%' }} />
                    <a />
                </div>
            </HashRouter>
        );
    }
}

export default Main;