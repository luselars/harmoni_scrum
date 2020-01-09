import * as React from 'react';
import { Component } from 'react';
import Footer from '../components/Footer/Footer';
import LogIn from '../components/LogIn/LogIn';
import Menu from '../components/Menu/Menu';
import EventList from '../components/event/EventList/EventList';

export default class Main extends Component {
    render() {
        return (
            <div>
            <Menu />
            <EventList />
            <Footer />
            </div>
        )
    }
}