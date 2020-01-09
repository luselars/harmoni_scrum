// @flow
import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';


export default class Filter extends Component<Props, State>{
    render(){
        return(
            <div id="filterCard" class="card">
                <div class="card-body bg-light">
                    <div class="container bg-light">
                        <div class="col text-center border-bottom">
                            <h2 class="mb-3">FILTER</h2>
                            <h6 class="mb-3 text-success">SORTER ETTER...</h6>
                            <h6>Bokser</h6>
                        </div>
                        <div class="col text-center border-bottom">
                            <h6 class="mb-3 text-success">TYPE ARRANGEMENT</h6>
                            <h6>Bokser</h6>
                        </div>
                        <div class="col text-center border-bottom">
                            <h6 class="mb-3 text-success">STED</h6>
                            <h6>Bokser</h6>
                        </div>
                        <div class="col text-center">
                            <h6 class="mb-3 text-success">PRIS</h6>
                            <h6>Innputfelt</h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}