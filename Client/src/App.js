import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { withRouter } from 'react-router';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Main from '../src/views/main';
import LogInP from './views/login.js';
import Menu from './components/Menu/Menu'
import LogIn from './components/LogIn/LogIn'
import Footer from './components/Footer/Footer'
import ProfileNew from './components/profile/ProfileNew/ProfileNew'

{/*const Main = () => <h1>Home here</h1>*/}
const NoMatch = () => <h1>404 Not Found</h1>
const LocationDisplay = withRouter(({ location }) => (
    <div data-testid="location-display">{location.pathname}</div>
))

function App() {
  return (
    <Router basename="/">
      <div>
      <Link to="/"></Link>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/register" component={ProfileNew} />
        <Route component={NoMatch} />
      </Switch>
      <Footer/>
      <LocationDisplay />
      </div>
    </Router>
  );
}

export default App;
