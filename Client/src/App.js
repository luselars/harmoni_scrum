import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { withRouter } from 'react-router';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Main from '../src/views/main';
import Menu from './components/Menu/Menu'
import LogIn from './components/LogIn/LogIn'
import Footer from './components/Footer/Footer'
import ProfileNew from './components/profile/ProfileNew/ProfileNew'
import ProfileOrganiser from './components/profile/ProfileOrganiser/ProfileOrganiser';
import LoggedIn from './views/loggedIn';

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
        <Route exact path="/profile" component={ProfileOrganiser} />
        <Route exact path="/profile/summary" component={LoggedIn} />
        <Route component={NoMatch} />
      </Switch>
      <Footer/>
      <LocationDisplay />
      </div>
    </Router>
  );
}

export default App;
