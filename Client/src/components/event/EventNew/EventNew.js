//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css'
import UserService from "../../../services/UserService.js";
import {string} from "prop-types";
import EventService from "../../../services/EventService";
import Event from '../../../services/EventService';
let path = require('path');


type Props = {}
class EventNew extends Component<Props> {
    ev = new Event();
    constructor(props: any) {
        super(props);
    }
    componentDidMount(): * {
        // Check if the user is currently writing an event, if so load inputs with data
        if(localStorage.getItem("curr_event") !== null) {
            console.log("Bruker i arr. henter data. id: " + localStorage.getItem("curr_event"));
            // TODO add token
            EventService.getEvent(localStorage.getItem("curr_event")).then(response => {
               let data = response.data[0];
               this.ev = data;
               console.log(this.ev);
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
                            <input required type="text" class="form-control" id="eventnameinput" value={this.ev.name} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.ev.name = event.target.value)}/>
                            <label id="eventdesclabel" htmlFor="eventdesc">Beskrivelse</label>
                            <textarea className={"form-control"} id={"eventdesc"} value={this.ev.description}  rows="4" cols="50" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.ev.description = event.target.value)}>
                            </textarea>
                            {/*TODO Sett opp så det er mulig å velge tidspunkt også*/}
                            <label id="eventdatestart" htmlFor="start">Starttidspunkt</label>
                            <input type="date" id="start" name="start" max="2023-12-31" value={this.ev.start} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.ev.start = event.target.value)}/>
                            <label id="eventdateend" htmlFor="end">Starttidspunkt</label>
                            <input type="date" id="end" name="end" max="2023-12-31" value={this.ev.end} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.ev.end = event.target.value)}/>
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
        console.log(this.ev);
        console.log(typeof this.ev);
        console.log(this.ev.address);
        return;
        if(typeof this.ev.name != "string" || this.ev.name.length <= 1) {
            // TODO bytt denne alerten
            alert("Ugyldig navn");
            return;
        }
        if(typeof this.ev.description != "string") {
            this.ev.description = null;
        }
        if(typeof this.ev.start != "string") {
            this.ev.start = null;
        }
        if(typeof this.ev.end != "string") {
            this.ev.end = null;
        }
        if(localStorage.getItem("curr_event") === null) {
            EventService.createEvent(this.ev).then(resp => {
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