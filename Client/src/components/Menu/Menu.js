//@flow
import React from 'react';
import { Component } from 'react';
import "./Menu.css";

type State = {
    status: boolean
}

type Props = {}

class Menu extends Component<Props> {
    constructor(props: any) {
        super(props);
        this.state = {
            status: true
        }
    }

    render() {
        return (
            <nav class="navbar navbar-dark bg-dark">
                <a class="navbar-brand text-light" href="#">HARMONI</a>
                <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"></link>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                {this.state.status ? (
                    <form class="loginGroup">
                    <a class="nav-link text-light text-right" id="loginButton" href="#">Logg ut<span class="sr-only"></span></a>
                    <i class="fa fa-sign-out fa-lg" style={{ color: "white" }} aria-hidden="true"></i>
                    </form>
                ) : (
                    <form class="loginGroup">
                    <a class="nav-link text-light text-right" id="loginButton" href="#">Logg inn<span class="sr-only"></span></a>
                    <i class="material-icons" style={{ color: "white" }}>person</i>
                    </form>
                )}
            </nav>
        )
    }
}


export default Menu;