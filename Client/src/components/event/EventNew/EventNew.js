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

    }

    render() {
        return (
            <div class="createEvent">
                <h2>Opprett arrangement</h2>
                {/*<form>*/}
                    <div class="form-row">
                        <div class="col" id="coltitle">
                            <label id="eventnamelabel" for="eventname">Tittel</label>
                            <input required type="text" class="form-control" id="eventnameinput" placeholder="" onChange={e => this.changeName(e)}/>
                            <label id="eventdesclabel" htmlFor="eventdesc">Beskrivelse</label>
                            <textarea className={"form-control"} id={"eventdesc"}  rows="4" cols="50" onChange={e => this.changeDesc(e)}>
                            </textarea>
                            <label id="eventdatestart" htmlFor="start">Starttidspunkt</label>
                            <input type="date" id="start" name="start" max="2023-12-31" onChange={e => this.changeStart(e)}/>
                            <label id="eventdateend" htmlFor="end">Starttidspunkt</label>
                            <input type="date" id="end" name="end" max="2023-12-31" onChange={e => this.changeEnd(e)}/>
                        </div>
                    </div>
                    <div>
                    <button onClick={()=> this.test()} class="btn btn-success" id="nextbtn">Neste</button>
                    </div>
                {/*</form>*/}
            </div>
        )
    }
    test() {
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
            EventService.postEvent(this.state.name, this.state.description, this.state.start, this.state.end).then(resp => {
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
            console.log("Arr finnes, redirect");
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