import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom';
import Navbar from '../utility/navbar/Navbar';
import User from '../user/User';
import './List.css';
import Modal from '../modal/Modal';

//Component to display favourite user information alongwith their top 5 repos in /list route
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: []
        };
    }

    componentDidMount() {
        let userData = JSON.parse(localStorage.getItem('userData'));
        console.log('User Data', userData);
        if(!userData) {
            userData = [];
        }
        this.setState({
            userData: userData
        });
    }

    //function to handle toggle functionality to show/hide repository information
    handleToggle = (user) => {
        // console.log(user);
        const ref = document.getElementById('collapse'+user.login);
        console.log(ref,ref.hidden);
        if(ref.hidden) {
            ref.hidden = false;
        } else {
            ref.hidden = true;
        }
    }

    //function to remove user information from list component
    handleRemove = (user) => {
        let userData = [...JSON.parse(localStorage.getItem('userData'))];
        userData = userData.filter(obj => {
            return obj.id !== user.id
        });
        localStorage.setItem('userData',JSON.stringify(userData));
        this.setState({
            userData: userData
        });
        // alert('User removed');
        ReactDOM.render(<Modal message='User removed'/>, document.getElementById('modal-area'));
        document.getElementById('navbar').scrollIntoView();
    }

    render() {
        let element = (
            <div className="my-3">
                <h3><i>Add your favourite accounts here...</i></h3>
            </div>
        );
        if(this.state.userData.length>0) {
            element = (
                this.state.userData.map(user => {
                    return (
                        <div  key={user.id}>
                            <User user={user} remove={this.handleRemove} toggle={this.handleToggle} type='list'/>
                        </div>
                    )
                })
            );
        }
        return (
            <Fragment>
                <Navbar type='list'/>
                {element}
                <div id="modal-area"></div>
            </Fragment>
        );
    }
}

export default List;