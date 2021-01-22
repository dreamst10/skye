//import logo from './logo.svg';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register'

class App extends React.Component {

  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar title="Skye"/>
          <div className="container">
            <Switch>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
