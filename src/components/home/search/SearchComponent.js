import React, {Component, Fragment} from "react";
import './SearchComponent.css';

//Component to handle search feature
class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [], //to store user data on which searching will be done
            filteredSearchResult: [], //to store the search result
        };
    }

    static getDerivedStateFromProps(nextProps,prevState) {
        console.log('SearchList',nextProps.searchData);
        return {
            userData: nextProps.searchData
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.filteredSearchResult !== this.state.filteredSearchResult) return true;
        if(nextProps.searchData.length === this.props.searchData.length) return false;
        return true;
    }

    //function to select the suggested option on searching
    handleSearchClick = (obj) => {
        this.props.filteredData([obj]);
        this.setState({
            filteredSearchResult: []
        });
    }

    //function to handle keypress in the searchbar
    handleChange = () => {
        let input = document.getElementById('searchTerm').value;
        console.log(input);
        const searchResult = [];
        if(input.length>0) {
            input = input.toLowerCase();
            this.state.userData.forEach(obj => {
                const name = obj.login.toLowerCase();
                if(name.includes(input)) {
                    searchResult.push(obj);
                }
            });
            const filteredSearchResult = searchResult.splice(0,5);
            console.log(filteredSearchResult);
            this.setState({
                filteredSearchResult: [...filteredSearchResult]
            });
        } else {
            this.props.filteredData([], 'All');
            this.setState({
                filteredSearchResult: []
            });
        }
    }

    render() {
        console.log('Filtered search result:', this.state.filteredSearchResult);
        return(
            <Fragment>
                <div className="search" id="search">
                    <input type="text" className="searchTerm" id="searchTerm" placeholder="Search by user name..." onKeyUp={this.handleChange}/>
                    <button type="button" className="searchButton" disabled>
                        <i className="fa fa-search"></i>
                    </button>
                </div>
                <ul className="searchContainer" id="searchContainer">
                    {
                        this.state.filteredSearchResult.map(elem => {
                            return (
                                <li key={elem.char_id} onClick={() => {this.handleSearchClick(elem)}}>
                                    <div className="row searchSuggest">
                                        <div className="col-4 search-img-container">
                                            <img className="search-img" src={elem.avatar_url} alt={elem.login}/>
                                        </div>
                                        <div className="col-4 search-text">
                                            {elem.login}
                                        </div>
                                        <div className="col-4 search-text">
                                            {elem.html_url}
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </Fragment>
        );
    }
}

export default SearchComponent;