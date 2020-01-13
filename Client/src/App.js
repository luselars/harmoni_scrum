import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { withRouter } from 'react-router';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Main from '../src/views/main.js';
import Menu from './components/Menu/Menu.js';
import LogIn from './components/LogIn/LogIn.js';
import Footer from './components/Footer/Footer.js';
import ProfileNew from './components/profile/ProfileNew/ProfileNew.js';
import EventNew from './components/event/EventNew/EventNew.js';
import ProfileEdit from './components/profile/ProfileEdit/ProfileEdit.js';
import ProfileOrganiser from './components/profile/ProfileOrganiser/ProfileOrganiser.js';
import LoggedIn from './views/loggedIn.js';
import Upload from './components/Upload/Upload.js';
import EventNew2 from './components/event/EventNew/EventNew2.js';

//https://testing-library.com/docs/example-react-router
//se på den linken for å forstå hvordan routing her fungerer

{
  /*const Main = () => <h1>Home here</h1>*/
}
const NoMatch = () => <h1>404 Not Found</h1>;
const LocationDisplay = withRouter(({ location }) => (
  <div data-testid="location-display">{location.pathname}</div>
));

function App() {
  return (
    <Router basename="/">
      <div className="maindiv">
        <Link to="/"></Link>
        <Link to="/login"></Link>
        <Link to="/upload"></Link>
        <Link to="/newevent"></Link>
        <Link to="/register"></Link>
        <Link to="/profile"></Link>
        <Link to="/editprofile"></Link>
        <Link to="/profile/summary"></Link>
        <Menu />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/newevent" component={EventNew} />
          <Route exact path="/newevent2" component={EventNew2} />
          <Route exact path="/register" component={ProfileNew} />
          <Route exact path="/profile" component={ProfileOrganiser} />
          <Route exact path="/editprofile" component={ProfileEdit} />
          <Route exact path="/profile/summary" component={LoggedIn} />
          <Route component={NoMatch} />
        </Switch>
        <LocationDisplay />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
