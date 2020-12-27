import React, {Component, Fragment} from "react";
import {withRouter} from 'react-router-dom';
import Axios from "axios";
import './User.css';
import Repo from '../repo/Repo';

//Functional component to render each character card showing name,nickname and actor name with character image
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            repoData: []
        };
    }

    componentDidMount() {
        const url = this.props.user.repos_url;
        Axios.get(url)
        .then(response => {
            console.log({response});
            this.setState({
                user: this.props.user,
                repoData: this.sortData(response.data)
            });
        })
        .catch(err => {
            console.log(err);
        })
    }


    sortData = (data) => {
        const sortedData = data.sort((a,b) => Number(b.stargazers_count) - Number(a.stargazers_count));
        const minlength = Math.min(sortedData.length,5);
        const repoData = sortedData.splice(0,minlength);
        return repoData;
    }


    render() {
        const user = this.state.user;
        let userElement = user ? (
            <Fragment>
                <div className="row col-item-container">
                    <div className="col-4 col-item-left">
                        <img className="list-img" src={user.avatar_url} alt={user.login}/>
                    </div>
                    <div className="col-6 col-item-centre">
                        <div><b>User Name:</b> {user.login}</div>
                        <div><b>Account URL:</b> <a href={user.html_url} target="_blank" rel="noreferrer">{user.html_url}</a></div>
                    </div>
                    <div className="col-2 col-item-right">
                        {
                            this.props.type === 'home' ? (
                                <Fragment>
                                    <div>
                                        <button type="button" className="btn btn-dark add-btn m-1" onClick={() => this.props.add(user)}>Save</button>
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-dark toggle-btn m-1" onClick={() => this.props.toggle(user)}>Repository</button>
                                    </div>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div>
                                        <button type="button" className="btn btn-dark add-btn m-1" onClick={() => this.props.remove(user)}>Remove</button>
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-dark toggle-btn m-1" onClick={() => this.props.toggle(user)}>Repository</button>
                                    </div>
                                </Fragment>
                            )
                        }
                    </div>
                </div>
                <div id={"collapse"+user.login} className="repo" hidden>
                    <Repo repoData={this.state.repoData}/>
                </div>
            </Fragment>
        ) : null;
        return (
            <Fragment>
                {userElement}
            </Fragment>
        );
    }
}

export default withRouter(User);