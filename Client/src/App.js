import React from 'react';
//import logo from './logo.svg';
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
import ProfileEditUser from './components/profile/ProfileEdit/ProfileEditUser';
import ProfileOrganiser from './components/profile/Profile/Profile';
import LoggedIn from './views/loggedIn';
import EventNew2 from './components/event/EventNew/EventNew2';
import EventNew3 from './components/event/EventNew/EventNew3';
import EventNew4 from './components/event/EventNew/EventNew4';
import ProfileUser from './components/profile/ProfileUser/ProfileUser';
import EventDeleted from './components/event/EventDeleted/EventDeleted';
import EventNew5 from './components/event/EventNew/EventNew5';
import EventNew6 from './components/event/EventNew/EventNew6';
import Admin from './components/Admin/Admin';

//https://testing-library.com/docs/example-react-router
//se på den linken for å forstå hvordan routing her fungerer

{
  /*const Main = () => <h1>Home here</h1>*/
}
const NoMatch = () => (
  <div className="card" id="NotFound">
    <h1>404 Not Found</h1>
    <p>Oisann.. Siden finnes ikke, eller du mangler rettighetene som kreves for å gå inn på den.</p>
  </div>
);
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
          <Route exact path="/newevent5" component={EventNew5} />
          <Route exact path="/newevent6" component={EventNew6} />
          <Route exact path="/register" component={ProfileNew} />
          <Route exact path="/profile" component={ProfileOrganiser} />
          <Route exact path="/profile/user" component={ProfileUser} />
          <Route exact path="/editprofile/organiser" component={ProfileEdit} />
          <Route exact path="/editprofile/user" component={ProfileEditUser} />
          <Route exact path="/profile/summary" component={LoggedIn} />
          <Route exact path="/eventdeleted" component={EventDeleted} />
          <Route exact path="/event/:id" component={EventDetails} />
          <Route exact path="/events/:id" component={LoggedIn} />
          <Route exact path="/orgevent/:id" component={EventDetailsLoggedIn} />
          <Route exaxt path="/admin" component={Admin} />
          <Route component={NoMatch} />
        </Switch>
        {/* <LocationDisplay />*/}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
