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
                            <div class="form-check text-left mb-3">
                                <input type="radio" class="form-check-input" id="sortRadio1" value="option1" checked></input>
                                <label class="form-check-label" for="sortRadio1">Tid</label>
                                <input type="radio" class="form-check-input" id="sortRadio2" value="option2" ></input>
                                <label class="form-check-label" for="sortRadio2">Alfabetisk</label>
                                <input type="radio" class="form-check-input" id="sortRadio3" value="option3" ></input>
                                <label class="form-check-label" for="sortRadio3">Størrelse</label>
                            </div>
                        </div>
                        <div class="col text-center border-bottom">
                            <h6 class="mb-3 text-success">TYPE ARRANGEMENT</h6>
                            <div class="form-check text-left mb-3">
                                <input type="checkbox" class="form-check-input" id="typeCheck1"></input>
                                <label class="form-check-label" for="typeCheck1">Rock</label>
                                <input type="checkbox" class="form-check-input" id="typeCheck2"></input>
                                <label class="form-check-label" for="typeCheck2">Pop</label>
                                <input type="checkbox" class="form-check-input" id="typeCheck3"></input>
                                <label class="form-check-label" for="typeCheck3">Klassisk</label>
                            </div>
                        </div>
                        <div class="col text-center border-bottom">
                            <h6 class="mb-3 text-success">STED</h6>
                            <div class="form-check text-left mb-3">
                            <input type="checkbox" class="form-check-input" id="placeCheck1"></input>
                                <label class="form-check-label" for="placeCheck1">Trondheim Spektrum</label>
                                <input type="checkbox" class="form-check-input" id="placeCheck2"></input>
                                <label class="form-check-label" for="placeCheck2">Sukkerhuset</label>
                                <input type="checkbox" class="form-check-input" id="placeCheck3"></input>
                                <label class="form-check-label" for="placeCheck3">Olavshallen</label>
                            </div>
                        </div>
                        <div class="col text-center border-bottom">
                            <h6 class="mb-3 text-success">PRIS</h6>
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-sizing-sm">Fra</span>
                                </div>
                                <input type="text" class="form-control" aria-label="Fra" aria-describedby="inputGroup-sizing-sm"></input>
                            </div>
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-sizing-sm">Til</span>
                                </div>
                                <input type="text" class="form-control" aria-label="Til" aria-describedby="inputGroup-sizing-sm"></input>
                            </div>
                        </div>
                        <div class="col text-center mt-3">
                            <button type="submit" class="btn btn-success">Velg</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}