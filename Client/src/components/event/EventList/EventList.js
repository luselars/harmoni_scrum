// @flow

import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import events from '../../data.js';

export default class EventList extends Component<Props, State>{
    render(){
        return(
            <div>
            {(events).map(event => (
            <div id="eventcard" class="card">
                <div class="card-body bg-light">
                    <div class="container bg-light">
                        <div class="row justify-content-md-center align-items-center">
                            <div id="date" class="col-2 text-center">
                                <h3>{event.start.slice(8, 10)}</h3>
                                <h3>{event.start.slice(5, 7)}</h3>
                            </div>
                            <div class="col-8">
                                <h5>{event.name}</h5>
                                <p>{event.venue}</p>
                                <p>kl {event.start.slice(11,16)} den {event.start.slice(8,10)}/{event.start.slice(5,7)}/{event.start.slice(0,4)}</p>
                            </div>
                            <div class="col text-right">
                                <button class="btn btn-success bg-green"> Mer info </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </div>
        )
    }
}