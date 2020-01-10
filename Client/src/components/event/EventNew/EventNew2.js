//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css'
import {string} from "prop-types";
import Upload from "../../Upload/Upload";
import EventService from "../../../services/EventService";
import Event from "../../../services/EventService";
let path = require('path');


type State = {
    image: string;
    event: Event;
}
type Props = {}

class EventNew2 extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            image: string,
            event: Event
        }
    }
    componentDidMount(): * {
        // See if the user is actually in the process of creating an event, if not send to /newevent
        if(localStorage.getItem("curr_event") === null) {
            // TODO bytt alert
            alert("Du må oprette et event for å være her eller noe");
            window.location='/newevent';
        }
        else {
            this.state.event = EventService.getEvent(localStorage.getItem("curr_event"));
        }
    }

    render() {
        return (
            <div class="createEvent">
                <h2>Opprett arrangement</h2>
                {/*<form>*/}
                <div class="form-row">
                    <div class="col" id="coltitle">
                        <p>Last opp bilde</p>
                        <Upload url={"http://localhost:4000/organiser/eventimage"} accept={".jpg, .png, .jpeg"}/>
                    </div>
                </div>
                <div>
                    <button onClick={()=> this.back()} class="btn btn-success" id="backbtn">Tilbake</button>
                    <button onClick={()=> this.next()} class="btn btn-success" id="nextbtn">Neste</button>
                </div>
                {/*</form>*/}
            </div>
        )
    }
    back() {
        window.location='/newevent';
    }
    next() {
        // Check file extension
        // Fetch the file from the form
        let data = new FormData();
        let element = document.getElementById('upload');
        // Flow-hack to allow the use of .files[0] and .value on the input-element
        /*::
           if (!(element instanceof HTMLInputElement)) {
             throw new Error('element is not of type HTMLInputElement');
           }
       */
        let blob = element.files[0];
        data.append("recfile" , blob);

        //Checking the file extension, if it is anything other than .pdf, .png, .jpg or .jpeg return an alert
        let fullPath = element.value;
        let ext = path.extname(fullPath);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            //TODO change alert
            alert("Ikke gyldig filtype");
            return;
        }
        EventService.updateEvent(this.state.event, data);

        // post file to /files
        // UserService.postFile("http://localhost:4000/user/file", data).then(r => console.log(r));
        // EventService.postEvent(this.state.name, this.state.description, this.state.start, this.state.end).then(resp => {
        //     console.log(resp);
        //     if(resp.status === 200) {
        //         console.log("Arrangement oprettet");
        //         localStorage.setItem("curr_event", resp.data.insertId);
        //         // TODO redirect
        //     }
        //     else {
        //         alert("Kunne ikke oprette arrangement.");
        //         // TODO bytt ut denne alerten med et komponent.
        //     }
        //
        // });
    }
    changeName(e : any) {
        const target = e.target;
        let value: string = target.value;
        this.setState({name:value});
    }

}
export default EventNew2;