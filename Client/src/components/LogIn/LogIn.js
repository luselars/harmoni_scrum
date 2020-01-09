//@flow

import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';

export default class LogIn extends Component {
    render() 
    {  
       return ( 
        <div class="loginBox">
        <form>
           <h2>LOGG INN</h2>
            <div class="form-group">
                <label for="inputEmail1" class="loginText">E-mail</label>
                <input type="email" class="form-control" id="inputEmail1" aria-describedby="emailHelp" placeholder="Skriv e-mail"></input>
            </div>
            <div class="form-group">
                <label for="inputPassword1" class="loginText">Passord</label>
                <input type="password" class="form-control" id="inputPassword1" placeholder="Passord"></input>
            </div>
            <div class="form-group">
                <label class="form-label" for="check1"><a href="/glemtpassord">Glemt passord?</a></label>
            </div>
            <button type="submit" class="btn btn-success">Logg inn</button>
            <div class="form-group p-2">
                <label for="profileNew" class="form-label">Ikke registrert bruker? <a href="/register">Registrer deg her</a></label>
            </div>
        </form>
        </div>
        )
    }
}