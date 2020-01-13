//@flow
import React from "react";
import { Component } from "react";
import "./stylesheet.css";
import { string } from "prop-types";
import Upload from "../../Upload/Upload";
import { EventService } from "../../../services/EventService";
import { Event } from "../../../services/EventService";
let path = require("path");

type State = {
  event: Event
};
type Props = {};

class EventNew2 extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event()
    };
  }
  componentDidMount(): * {
    // See if the user is actually in the process of creating an event, if not send to /newevent
    if (localStorage.getItem("curr_event") === null) {
      // TODO bytt alert
      alert("Du må oprette et event for å være her eller noe");
      window.location = "/newevent";
    } else {
      EventService.getEvent(localStorage.getItem("curr_event")).then(
        response => {
          let data = response.data[0];
          this.setState({ event: data });
          console.log(this.state.event);
        }
      );
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
            <Upload
              url={"http://localhost:4000/organiser/eventimage"}
              accept={".jpg, .png, .jpeg"}
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => this.back()}
            class="btn btn-success"
            id="backbtn"
          >
            Tilbake
          </button>
          <button
            onClick={() => this.next()}
            class="btn btn-success"
            id="nextbtn"
          >
            Neste
          </button>
        </div>
        {/*</form>*/}
      </div>
    );
  }
  back() {
    window.location = "/newevent";
  }
  next() {
    let element = document.getElementById("upload");
    //Checking the file extension, if it is anything other than .pdf, .png, .jpg or .jpeg return an alert
    let fullPath = element.value;
    let ext = path.extname(fullPath);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      //TODO change alert
      alert("Ikke gyldig filtype");
      return;
    }
    const file = element.files[0];
    const reader = new FileReader();
    let temp_event = this.state.event;
    reader.addEventListener(
      "load",
      function() {
        // send here
        temp_event.image = reader.result;
        EventService.updateEvent(temp_event).then(resp => {
          console.log(resp);
          if (resp.status === 200) {
            console.log("Arrangement oppdatert");
            // window.location = '/newevent3';
          } else {
            alert("Kunne ikke oppdatere arrangement.");
            // TODO bytt ut denne alerten med et komponent.
          }
        });
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }
}
export default EventNew2;
