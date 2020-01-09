//@flow
import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';

export default class ProfileNew extends Component<{}> {
    render() 
    {  
       return ( 
        <div class="registerBox">
        <form>
           <h2>REGISTER</h2>
            <div class="form-group">
                <label for="inputEmail1" class="registerText">E-mail</label>
                <input type="email" class="form-control" id="inputEmail1" aria-describedby="emailHelp" placeholder="Skriv e-mail"></input>
            </div>
            <div class="form-group">
                <label for="inputName1" class="registerText">Navn</label>
                <input type="text" class="form-control" id="inputName1" placeholder="Skriv nave"></input>
            </div>
            <div class="form-group">
                <label for="inputPassword1" class="loginText">Passord</label>
                <input type="password" class="form-control" id="inputPassword1" placeholder="Passord"></input>
            </div>
            <div class="form-group">
                <label for="inputPasswordRepeat1" class="loginText">Gjenta passord</label>
                <input type="password" class="form-control" id="inputPasswordRepeat1" placeholder="Gjenta password"></input>
            </div>

  <div class="file-field">
    <div class="btn btn-outline-success btn-rounded waves-effect btn-sm">
      <span>Velg profilbilde</span>
      <input type="file" accept=".jpg, .jpeg, .png" id="upload" name="recfile"></input>
    </div>
  </div>


            {/*<div class="form-check p-2">
                <label class="form-check-label" for="upload">Profilbilde</label><br></br>
                <input class="file mr-6" accept=".jpg, .jpeg, .png" type="file" id="upload" name="recfile"/>
       </div>*/}
            <div class="form-check p-2">
                <input type="checkbox" class="form-check-input" id="check1"></input>
                <label class="form-check-label" for="check1">Jeg godkjenner deres vilkår</label>
            </div>
            <button type="submit" class="btn btn-success">Logg inn</button>
        </form>
        </div>
        )
    }
}