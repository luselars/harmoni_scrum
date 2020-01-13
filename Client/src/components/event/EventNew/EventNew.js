//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css'
import {EventService} from "../../../services/EventService";
import {Event} from '../../../services/EventService';


type Props = {}
class EventNew extends Component<Props> {
    constructor(props: any) {
        super(props);
        this.state = {
            event: new Event()
        }
    }
    componentDidMount(): * {
        // Check if the user is currently writing an event, if so load inputs with data
        if(localStorage.getItem("curr_event") !== null) {
            console.log("Bruker i arr. henter data. id: " + localStorage.getItem("curr_event"));
            // TODO add token
            EventService.getEvent(localStorage.getItem("curr_event")).then(response => {
               let data = response.data[0];
               this.setState({event: data});
               console.log(this.state.event);
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
                            <input required type="text" class="form-control" id="eventnameinput" value={this.state.event.name} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.state.event.name = event.target.value)}/>
                            <label id="eventdesclabel" htmlFor="eventdesc">Beskrivelse</label>
                            <textarea className={"form-control"} id={"eventdesc"} value={this.state.event.description}  rows="4" cols="50" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.state.event.description = event.target.value)}>
                            </textarea>
                            {/*TODO Sett opp så det er mulig å velge tidspunkt også*/}
                            <label id="eventdatestart" htmlFor="start">Starttidspunkt</label>
                            <input type="date" id="start" name="start" max="2023-12-31" value={this.state.event.start} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.state.event.start = event.target.value)}/>
                            <label id="eventdateend" htmlFor="end">Starttidspunkt</label>
                            <input type="date" id="end" name="end" max="2023-12-31" value={this.state.event.end} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.state.event.end = event.target.value)}/>
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
        if(typeof this.state.event.name != "string" || this.state.event.name.length <= 1) {
            // TODO bytt denne alerten
            alert("Ugyldig navn");
            return;
        }
        if(typeof this.state.event.description != "string") {
            this.state.event.description = null;
        }
        if(typeof this.state.event.start != "string") {
            this.state.event.start = null;
        }
        if(typeof this.state.event.end != "string") {
            this.state.event.end = null;
        }
        if(localStorage.getItem("curr_event") === null) {
            EventService.createEvent(this.state.event).then(resp => {
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
            EventService.updateEvent(this.state.event).then(resp => {
                if (resp.status === 200) {
                    console.log("Arrangement oppdatert");
                    window.location = '/newevent2';
                } else {
                    alert("Kunne ikke oppdatere arrangement.");
                    // TODO bytt ut denne alerten med et komponent.
                }
            });
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