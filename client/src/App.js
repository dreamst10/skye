//import logo from './logo.svg';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import SkillsEdit from './pages/SkillsEdit'
import Home from './pages/home'
import 'semantic-ui-css/semantic.min.css'
import { JobEdit } from './pages/JobEdit';
import { PostJob } from './pages/PostJob';
import { JobSkillsEdit } from './pages/JobSkillsEdit';


class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = { loggedIn: JSON.parse(localStorage.getItem('loggedIn')), user: JSON.parse(localStorage.getItem('user')) }
  }

  componentDidMount = () => {
    this._retrieveState()
  }

  _retrieveState = async () => {
    const loggedIn = await localStorage.getItem('loggedIn')
    const user = await localStorage.getItem('user')
    console.log(loggedIn)
    console.log(user)
     if(loggedIn !== null) { this.setState({ loggedIn: JSON.parse(loggedIn) }) }
     if(user !== null) { this.setState({ user: JSON.parse(user) })}
  }
  
  handleLoggedIn = async (loggedIn) => {
    if(!loggedIn) {
      await localStorage.clear('user')
      this.setState({ user: null, loggedIn: false })
    }
    await localStorage.setItem('loggedIn', JSON.stringify(loggedIn))
    this.setState({ loggedIn: loggedIn })
    console.log(loggedIn)
  }

  handleUser = async (user) => { 
    if(user === null) {
      await localStorage.setItem("loggedIn", JSON.stringify(false));
      this.setState({ loggedIn: false })
    }
    await localStorage.setItem('user', JSON.stringify(user))
    this.setState({ user: user })
    console.log(user)
  }
  
/*
  handleUser=(data)=>{
    this.setState({user:data});
    console.log(this.state.user)
  }*/

  handleLogout = () =>{
    
    
    this.handleLoggedIn(false);
  }

  render() {
    console.log(this.state.user)
    return (
      <Router>
        <React.Fragment>
          {this.state.loggedIn && this.state.user && <Navbar title="Skye" logout={this.handleLogout}/>}
          <div className="container" >
            <Switch>
              <Route exact path="/" render={!this.state.loggedIn && this.state.user === null ? ()=> <Login handleLoggedIn={this.handleLoggedIn} handleUser={this.handleUser} /> : ()=> <Home />} />
              <Route exact path="/register" render={()=><Register />}/>
              <Route exact path="/JobEdit/:id" render={(props)=><JobEdit {...props} user={this.state.user} />}/>
              <Route exact path="/home/:id" render={()=><Home user={this.state.user} />}/>
              <Route exact path="/login" render={!this.state.loggedIn && this.state.user === null ? ()=><Login handleUser={this.handleUser} handleLoggedIn={this.handleLoggedIn} /> : ()=> <Home />} />
              <Route exact path="/editUserSkills" render={!this.state.loggedIn && this.state.user === null ? ()=> <Login handleLoggedIn={this.handleLoggedIn} handleUser={this.handleUser} /> : ()=><SkillsEdit user={this.state.user} />} />
              <Route exact path="/editJobSkills/:id" render={!this.state.loggedIn && this.state.user === null ? ()=> <Login handleLoggedIn={this.handleLoggedIn} handleUser={this.handleUser} /> : (props)=><JobSkillsEdit {...props} user={this.state.user} />} />
              <Route exact path="/PostJob" render={(props)=><PostJob {...props} user={this.state.user} />}/>
            </Switch>
            
          </div>
          
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
