import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/home/Home';
import List from './components/userlist/List';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <Route exact path="/" component={Home}/>
          <Route exact path="/list" component={List}/>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
