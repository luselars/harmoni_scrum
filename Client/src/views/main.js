import * as React from 'react';
import { Component } from 'react';
import Footer from '../components/Footer/Footer';
import LogIn from '../components/LogIn/LogIn';
import Menu from '../components/Menu/Menu';

export default class Main extends Component {
    render() {
        return (
            <div>
            <Menu />
            <LogIn />
            <Footer />
            </div>
        )
    }
}