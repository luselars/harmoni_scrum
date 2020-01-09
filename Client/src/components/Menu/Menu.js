//@flow
import React from 'react';
import { Component } from 'react';
import "./stylesheet.css";
import { Link } from 'react-router-dom'

type State = {
    status: boolean
}

export default class Menu extends Component<{}, {status : boolean}> {
    constructor(props: any) {
        super(props);
        this.state = {
            status: (localStorage.getItem("token") === null)
        }
    }

    render() {
        return (
            <nav class="navbar navbar-dark bg-dark">
                <a class="navbar-brand text-light" href="/">HARMONI</a>
                <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"></link>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                {this.state.status ? 
                (
                    <form class="loginGroup">
                        <a class="nav-link text-light" id="homeButton" href="/">Hjem <i class="fa fa-home fa-lg"></i><span class="sr-only"></span></a>
                        <a class="nav-link text-light text-right" id="loginButton" href="/login">Logg inn <i class="fa fa-sign-in fa-lg" style={{ color: "white" }} aria-hidden="true"></i><span class="sr-only"></span></a>
                    </form>
                ): (
                    <form class="loginGroup">
                        <a class="nav-link text-light" id="homeButton" href="/">Hjem <i class="fa fa-home fa-lg"></i><span class="sr-only"></span></a>
                        <a class="nav-link text-light" id="profileButton" href="/profile">Profil <i class="fa fa-user fa-lg"></i><span class="sr-only"></span></a>
                        <a class="nav-link text-light" id="loginButton" onClick={() => this.logOut()}>Logg ut <i class="fa fa-sign-out fa-lg" style={{ color: "white" }} aria-hidden="true"></i><span class="sr-only"></span></a>
                    </form>
                )}
            </nav>

        )
    }
    logOut() {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      
}
