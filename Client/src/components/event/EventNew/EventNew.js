//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css'
import UserService from "../../../services/UserService.js";
import {string} from "prop-types";
import EventService from "../../../services/EventService";
let path = require('path');


type State = {
    name: string;
    description: string;
    start: string;
    end: string;
}

type Props = {}

class EventNew extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: string,
            description: string,
            start: string,
            end: string,
        }
    }
    componentDidMount(): * {
        // Check if the user is currently writing an event, if so load inputs with data
        if(localStorage.getItem("curr_event") !== null) {
            console.log("Bruker i arr. henter data. id: " + localStorage.getItem("curr_event"));
            // TODO add token
            EventService.getEvent(localStorage.getItem("curr_event")).then(response => {
               let data = response.data[0];
               this.setState({
                   name: data.name,
                   description: data.description,
                   start: data.start,
                   end: data.end
               });
               console.log(this.state.start);
            });
        }
    }

    render() {
        return (
            <div class="createEvent">
                <h2>Opprett arrangement</h2>
                {/*<form>*/}
                    <div class="form-row">
                        <div class="col" id="coltitle">
                            <label id="eventnamelabel" for="eventname">Tittel</label>
                            <input required type="text" class="form-control" id="eventnameinput" value={this.state.name} onChange={e => this.changeName(e)}/>
                            <label id="eventdesclabel" htmlFor="eventdesc">Beskrivelse</label>
                            <textarea className={"form-control"} id={"eventdesc"} value={this.state.description}  rows="4" cols="50" onChange={e => this.changeDesc(e)}>
                            </textarea>
                            {/*TODO Sett opp så det er mulig å velge tidspunkt også*/}
                            <label id="eventdatestart" htmlFor="start">Starttidspunkt</label>
                            <input type="date" id="start" name="start" max="2023-12-31" value={this.state.start} onChange={e => this.changeStart(e)}/>
                            <label id="eventdateend" htmlFor="end">Starttidspunkt</label>
                            <input type="date" id="end" name="end" max="2023-12-31" value={this.state.end} onChange={e => this.changeEnd(e)}/>
                        </div>
                    </div>
                    <div>
                    <button onClick={()=> this.ny()} class="btn btn-success" id="nextbtn">Oprett ny. debugknapp</button>
                    <button onClick={()=> this.next()} class="btn btn-success" id="nextbtn">Neste</button>
                    </div>
                {/*</form>*/}
            </div>
        )
    }
    //debug-metode, slett etter hvert
    // TODO delete
    ny() {
        localStorage.removeItem("curr_event");
        window.location='/newevent';
    }
    next() {
        if(typeof this.state.name != "string" || this.state.name.length <= 1) {
            // TODO bytt denne alerten
            alert("Ugyldig navn");
            return;
        }
        if(typeof this.state.description != "string") {
            this.state.description = null;
        }
        if(typeof this.state.start != "string") {
            this.state.start = null;
        }
        if(typeof this.state.end != "string") {
            this.state.end = null;
        }
        if(localStorage.getItem("curr_event") === null) {
            console.log(localStorage.getItem("curr_event"));
            EventService.createEvent(this.state.name, this.state.description, this.state.start, this.state.end).then(resp => {
                console.log(resp);
                if (resp.status === 200) {
                    console.log("Arrangement oprettet");
                    localStorage.setItem("curr_event", resp.data.insertId);
                    window.location = '/newevent2';
                } else {
                    alert("Kunne ikke oprette arrangement.");
                    // TODO bytt ut denne alerten med et komponent.
                }

            });
        }
        else {
            // TODO oppdater arrangement!!!
            console.log("Arr finnes, oppdaterer og sender videre");
            window.location='/newevent2';
        }
    }
    changeName(e : any) {
        const target = e.target;
        let value: string = target.value;
        this.setState({name:value});
    }
    changeDesc(e : any) {
        const target = e.target;
        let value: string = target.value;
        this.setState({description:value});
    }
    changeStart(e : any) {
        const target = e.target;
        let value: string = target.value;
        this.setState({start:value});
    }
    changeEnd(e : any) {
        const target = e.target;
        let value: string = target.value;
        this.setState({end:value});
    }
}

// var today = new Date();
// if (today.getMonth().toString.length === 1) {
//     var date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
// }
// if (today.getDate().toString.length === 1) {
//     var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + today.getDate();
// }
// if (today.getMonth().toString.length === 1 && today.getDate().toString.length === 1) {
//     var date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate();
// }
// else {
//     var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
// }
//
// var time = today.getHours() + ":" + today.getMinutes();
// console.log(time)



export default EventNew;