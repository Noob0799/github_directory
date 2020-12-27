import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import './Navbar.css';

//functional component to render the navbar
const Navbar = (props) => {
    const handleClick = (option) => {
        if(option === 'home') {
            props.history.push('/');
        } else {
            props.history.push('/list');
        }
    }
    let element = null;

    //to check current component. If current component is home, then no home button. Else display the home button for routing back to home
    if(props.type === 'home') { 
        element = <button type="button" className="btn btn-warning home-btn" onClick={() => handleClick('list')}>Favourites</button>;
    } else {
        element = <button type="button" className="btn btn-warning home-btn" onClick={() => handleClick('home')}>Home</button>;
    }
    return (
        <Fragment>
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li>
                            <span className="nav-title">
                                Github User Directory <i className="fa fa-github"></i>
                            </span>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav ml-auto">
                        <li>
                            {element}
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
}

export default withRouter(Navbar);