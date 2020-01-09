import * as React from 'react';
import { Component } from 'react';
import Footer from '../components/Footer/Footer';
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