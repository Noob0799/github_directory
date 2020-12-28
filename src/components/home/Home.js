import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom';
import Navbar from '../utility/navbar/Navbar';
import Pagination from '../utility/pagination/Pagination';
import User from '../user/User';
import SearchComponent from './search/SearchComponent';
import Axios from 'axios';
import './Home.css';
import Modal from '../modal/Modal';

//Component to display list of users via pagination and implement searching. Component rendered at /
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],  //to store user data from api
            displayData: [], //to store data to be displayed
            currentPage: 1 //to store current page number
        };
    }

    componentDidMount() {
        Axios.get('https://api.github.com/users')
            .then(response => {
                console.log({response});
                const resData = response.data;
                this.setState({
                    data: resData,
                    displayData: resData
                });
                // alert('Github user data fetched');
                ReactDOM.render(<Modal message='Github user data fetched'/>, document.getElementById('modal-area'));
                document.getElementById('navbar').scrollIntoView();
            })
            .catch(error => {
                console.log({error});
                // alert('Could not fetch data. Check log.');
                ReactDOM.render(<Modal message='Could not fetch data. Check log.'/>, document.getElementById('modal-area'));
                document.getElementById('navbar').scrollIntoView();
            })
    }

    componentDidUpdate() {
        let elementRef = '';

        //pagination css effect
        for(let i=1;i<=Math.ceil(this.state.data.length/5);i++) {
            if(i !== this.state.currentPage) {
                elementRef = document.getElementById("page-no-"+i);
                if(elementRef) {
                    elementRef.style.borderBottom = "1px solid black";
                }
            }
        }
        elementRef = document.getElementById("page-no-"+this.state.currentPage);
        if(elementRef) {
            elementRef.style.borderBottom = "3px solid black";
        }
    }

    //function to handle page change
    handlePageChange = (index) => {
        this.setState({
            currentPage: index
        });
    }

    //function to handle filtered data after searching and displaying it
    handleFilteredData = (arr, type) => {
        if(type === 'All') {  //All is to show entire list of users
            this.setState({
                displayData: [...this.state.data],
                currentPage: 1
            });
        } else {
            this.setState({
                displayData: [...arr],
                currentPage: 1
            });
        }
    }

    //function to handle toggle functionality to show/hide repo information
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

    //function to add user information to List component via localstorage
    handleAdd = (user) => {
        let userData = [];
        if(localStorage.getItem('userData')) {
            userData = [...JSON.parse(localStorage.getItem('userData'))];
        }
        let found = false;
        for(let i=0;i<userData.length;i++) {
            if(userData[i].id === user.id) {
                found = true;
                break;
            }
        }
        const ref = document.getElementById('modal-area');
        if(!found) {
            userData.push(user);
            localStorage.setItem('userData',JSON.stringify(userData));
            // alert('User list updated')
            ReactDOM.render(<Modal message='User list updated'/>, ref);
            document.getElementById('navbar').scrollIntoView();
        } else {
            // alert('User exists');
            ReactDOM.render(<Modal message='User exists'/>, ref);
            document.getElementById('navbar').scrollIntoView();
        }
    }

    render() {
        const userData = [];
        if(this.state.displayData.length > 0) {  //handling pagination depending on current page
            for(let i=(this.state.currentPage-1)*5;i<Math.min(this.state.currentPage*5, this.state.displayData.length);i++) {
                userData.push(this.state.displayData[i]);
            }
        }
        let element = (
            <div className="spinner-border text-dark m-5"></div>
        );
        if(this.state.data.length>0) {
            element = (
                <div>
                    <Pagination dataSize={this.state.displayData.length} getIndex={this.handlePageChange}/>
                    <div className="home-search">
                        <SearchComponent searchData={this.state.data} filteredData={this.handleFilteredData}/>
                    </div>
                    <div className="home-data">
                        {
                            userData.map(user => {
                                return (
                                    <div  key={user.id}>
                                        <User user={user} toggle={this.handleToggle} add={this.handleAdd} type='home'/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            );
        } 
        return (
            <Fragment>
                <Navbar type='home'/>
                {element}
                <div id="modal-area"></div>
            </Fragment>
        );
    }
}

export default Home;