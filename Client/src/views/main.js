import * as React from 'react';
import { Component } from 'react';
import Footer from '../components/Footer/Footer';
import LogIn from '../components/LogIn/LogIn';


export default class Main extends Component {
    render() {
        return (
            <div>
            <Footer/>
            <LogIn/>
            </div>
        )
    }
}