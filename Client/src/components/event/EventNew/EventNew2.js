//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css'
import {string} from "prop-types";
import EventService from "../../../services/EventService";


type State = {
    image: string;
}
type Props = {}

class EventNew2 extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            image: string
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
                        <input required type="text" class="form-control" id="eventnameinput" placeholder="" onChange={e => this.changeName(e)}/>
                    </div>
                </div>
                <div>
                    <button onClick={()=> this.back()} class="btn btn-success" id="backbtn">Tilbake</button>
                    <button onClick={()=> this.test()} class="btn btn-success" id="nextbtn">Neste</button>
                </div>
                {/*</form>*/}
            </div>
        )
    }
    back() {
        window.location='/newevent';
    }
    test() {
        if(typeof this.state.name != "string" || this.state.name.length <= 1) {
            // TODO bytt denne alerten
            alert("Ugyldig navn");
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
        EventService.postEvent(this.state.name, this.state.description, this.state.start, this.state.end).then(resp => {
            console.log(resp);
            if(resp.status === 200) {
                console.log("Arrangement oprettet");
                localStorage.setItem("curr_event", resp.data.insertId);
                // TODO redirect
            }
            else {
                alert("Kunne ikke oprette arrangement.");
                // TODO bytt ut denne alerten med et komponent.
            }

        });
    }
    changeName(e : any) {
        const target = e.target;
        let value: string = target.value;
        this.setState({name:value});
    }

}
export default EventNew2;