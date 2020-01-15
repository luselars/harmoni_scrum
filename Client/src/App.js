import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { withRouter } from 'react-router';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Main from '../src/views/main';
import Menu from './components/Menu/Menu';
import LogIn from './components/LogIn/LogIn';
import Footer from './components/Footer/Footer';
import ProfileNew from './components/profile/ProfileNew/ProfileNew';
import EventNew from './components/event/EventNew/EventNew';
import EventDetails from './components/event/EventDetails/EventDetails';
import EventDetailsLoggedIn from './components/event/EventDetailsLoggedIn/EventDetailsLoggedIn';
import ProfileEdit from './components/profile/ProfileEdit/ProfileEdit';
import ProfileOrganiser from './components/profile/ProfileOrganiser/ProfileOrganiser';
import LoggedIn from './views/loggedIn';
import Upload from './components/Upload/Upload';
import EventNew2 from './components/event/EventNew/EventNew2';
import EventNew3 from './components/event/EventNew/EventNew3';
import EventNew4 from './components/event/EventNew/EventNew4';

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
        {/*<Link to="/"></Link>*/}
        <Menu />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/newevent" component={EventNew} />
          <Route exact path="/newevent2" component={EventNew2} />
          <Route exact path="/newevent3" component={EventNew3} />
          <Route exact path="/newevent4" component={EventNew4} />
          <Route exact path="/register" component={ProfileNew} />
          <Route exact path="/profile" component={ProfileOrganiser} />
          <Route exact path="/editprofile" component={ProfileEdit} />
          <Route exact path="/profile/summary" component={LoggedIn} />
          <Route exact path="/event/:id" component={EventDetails} />
          <Route exact path="/events" component={LoggedIn} />
          <Route exact path="/orgevent/:id" component={EventDetailsLoggedIn} />
          <Route component={NoMatch} />
        </Switch>
        <LocationDisplay />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
