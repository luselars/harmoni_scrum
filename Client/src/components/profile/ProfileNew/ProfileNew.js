//@flow
import * as React from 'react';
import {Component} from 'react';
import './stylesheet.css';
import UserService from "../../../services/UserService";
import {string} from "prop-types";

export default class ProfileNew extends Component<{}, { email: string, name: string, password: string }> {
    constructor(props: any) {
        super(props)
        this.state =
            {
                email: string,
                name: string,
                password: string,
                passwordConfirmation: string,
                url: string,
                organiser: false,
                check: false
            }
    }

    render() {
        return (
            <div id="registerBox">
                <form>
                    <h2 id="registerTextH">REGISTER</h2>
                    <div className="form-check p-2">
                        <input type="checkbox" onChange={e => this.changeOrganiser(e)} className="form-check-input"
                               id="check1"></input>
                        <label className="form-check-label" htmlFor="check1">Er du en arrangør?</label>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail1" id="registerText">E-mail</label>
                        <input type="email" onChange={e => this.changeEmail(e)} class="form-control"
                               id="inputEmail1" aria-describedby="emailHelp"
                               placeholder="Epost"></input>
                    </div>
                    <div class="form-group">
                        <label for="inputName1" id="registerText">Navn</label>
                        <input type="text" onChange={e => this.changeName(e)} class="form-control" id="inputName1"
                               placeholder="Navn"></input>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword1" id="loginText">Passord</label>
                        <input type="password" onChange={e => this.changePassword(e)} class="form-control"
                               id="inputPassword1"
                               placeholder="Passord"></input>
                    </div>
                    <div class="form-group">
                        <label for="inputPasswordRepeat1" id="loginText">Gjenta passord</label>
                        <input type="password" onChange={e => this.changePasswordConfirmation(e)}
                               class="form-control" id="inputPasswordRepeat1"
                               placeholder="Gjenta passord"></input>
                    </div>
                    <div class="form-group">
                        <label for="inputURL1" id="loginText">URL til nettsted</label>
                        <input type="url" onChange={e => this.changeUrl(e)} class="form-control" id="inputURL1"
                               placeholder="Lim inn url"></input>
                    </div>
                    <div class="form-check p-2 border">

                        <input class="file mr-6" accept=".jpg, .jpeg, .png" type="file" id="upload" name="recfile"/>
                        <label class="form-check-label" for="upload">Profilbilde</label>
                    </div>
                    <div class="form-check p-2">
                        <input type="checkbox" onChange={e => this.changeCheck(e)} class="form-check-input" id="check1"></input>
                        <label class="form-check-label" for="check1">Jeg godkjenner deres vilkår</label>
                    </div>
                    <button type="submit" onClick={() => this.post()} class="btn btn-success">Registrer</button>
                </form>
            </div>
        )
    }

    changeEmail(e:any) {
        const target = e.target;
        let value: string = target.value;
        this.setState({email: value});
        console.log(this.state.email);
    }

    changeName(e: any) {
        const target = e.target;
        let value: string = target.value;
        this.setState({name: value});
        console.log(this.state.name);
    }

    changePassword(e:any) {
        const target = e.target;
        let value: string = target.value;
        this.setState({password: value});
        console.log(this.state.password);
    }

    changePasswordConfirmation(e: any) {
        const target = e.target;
        let value: string = target.value;
        this.setState({passwordConfirmation: value});
        console.log(this.state.passwordConfirmation);
    }

    changeUrl(e: any) {
        const target = e.target;
        let value: string = target.value;
        this.setState({url: value});
        console.log(this.state.url);
    }

    changeOrganiser(e: any) {
        this.setState({organiser: !this.state.organiser});
    }

    changeCheck(e: any) {
        this.setState({check: !this.state.check});
    }


    post()
    {
        // Checks if agree to terms box is checked.
        if(this.state.check)
        {
            // Checks whether password is filled in and matches password confirmation
            if(this.state.password === this.state.passwordConfirmation && this.state.password.length > 8)
            {
                if(this.state.name !== "")
                {
                    if(this.state.email !== "")
                    {
                        // Checks if it's an organiser or normal user.
                        if(this.state.organiser)
                        {
                            UserService.newOrganiser(this.state.email, this.state.name, this.state.password).then(() => {
                                window.location = '/profile'
                            });
                        }
                        else
                        {
                            UserService.newUser(this.state.email, this.state.name, this.state.password).then(() => {
                                window.location = '/profile'
                            });
                        }
                    }
                }
            }
            else
            {
                console.log("Password does not match or you don't have a password.");
            }
            console.log("TRYING TO CREATE NEW USER");
        }
        else
        {
            console.log("Not checked agree with terms");
        }
    }
}