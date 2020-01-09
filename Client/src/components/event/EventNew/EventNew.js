//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css'
import UserService from "../../../services/UserService.js";
let path = require('path');


type State = {
}

type Props = {}

class EventNew extends Component<Props> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div class="createEvent">
                <h2>Opprett arrangement</h2>
                <form>
                    <div class="form-row">
                        <div class="col" id="coltitle">
                            <label id="eventnamelabel" for="eventname">Tittel</label>
                            <input type="text" class="form-control" id="eventnameinput" placeholder="" />
                            <label id="eventimg" for="eventimg">Bilde</label>
                            <input accept=".jpg, .jpeg, .png, .pdf" type="file" id="eventimg" name="recfile" />
                            <button onClick={() => this.publishFile()}>Last opp</button>
                        </div>
                        <div class="col" id="coldate">
                            <label id="eventdate" for="eventdate">Starttidspunkt</label>
                            <input type="date" id="start" name="trip-start" value={date} min={date} max="2023-12-31"></input>
                            <input type="time" id="appt" name="appt" value={time} min="00:00" max="23:59" required></input>
                            <label id="eventdate" for="eventdate">Slutttidspunkt</label>
                            <input type="date" id="start" name="trip-start" value={date} min={date} max="2023-12-31"></input>
                            <input type="time" id="appt" name="appt" value={time} min="00:00" max="23:59" required></input>
                        </div>
                    </div>
                    <div>
                    <button type="submit" class="btn btn-success" id="nextbtn">Neste</button>
                    </div>
                </form>
            </div>
        )
    }
    publishFile(): void {
        // Fetch the image from the form
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
        if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.pdf') {
            // post file to /files
            UserService.postFile(this.props.url, data).then(r => console.log(r));
        }
        else {
            // TODO are we using this alert. prob not
            alert("File not uploaded or file extension not supported.");
        }
    }
}

var today = new Date();
if (today.getMonth().toString.length === 1) {
    var date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
}
if (today.getDate().toString.length === 1) {
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + today.getDate();
}
if (today.getMonth().toString.length === 1 && today.getDate().toString.length === 1) {
    var date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate();
}
else {
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
}

var time = today.getHours() + ":" + today.getMinutes();
console.log(time)



export default EventNew;