//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css'
import $ from 'jquery'

type State = {
}

type Props = {}

class EventNew extends Component<Props> {
    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div class="createEvent">
                <h2>Opprett arrangement</h2>
                <form>
                    <div class="form-row">
                        <div class="col">
                            <label for="eventname">Tittel</label>
                            <input type="text" class="form-control" id="eventname" placeholder="" />
                        </div>
                    </div>
                    
                </form>
            </div>
        )
    }
}


export default EventNew;