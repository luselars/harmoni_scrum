// @flow
import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import {string} from "prop-types";


export default class Filter extends Component<{},{sortOption: string}>{


    constructor(props: any) {
        super(props)
        this.state = {
            sortOption: ''
        }
    }


    render(){
        return(
            <div id="filterCard" class="card">
                <div class="card-body bg-light">
                    <form onSubmit={this.handleSubmit}>
                        <div class="container bg-light">
                            <div class="col text-center border-bottom">
                                <h2 class="mb-3">FILTER</h2>
                                <h6 class="mb-3 text-success">SORTER ETTER...</h6>
                                <div class="form-check text-left mb-3">

                                        <ul>
                                            <li>
                                                <input type="radio" id="sortRadio1" value="option1"
                                                       checked={this.state.sortOption === "option1"} onChange={e => this.handleChangeSort(e)}></input>
                                                <label className="form-check-label" htmlFor="sortRadio1">Tid</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="sortRadio2" value="option2"
                                                       checked={this.state.sortOption === "option2"} onChange={e => this.handleChangeSort(e)}></input>
                                                <label className="form-check-label" htmlFor="sortRadio2">Alfabetisk</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="sortRadio3" value="option3"
                                                       checked={this.state.sortOption === "option3"} onChange={e => this.handleChangeSort(e)}></input>
                                                <label className="form-check-label" htmlFor="sortRadio3">Størrelse</label>
                                            </li>
                                        </ul>

                                </div>h..
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
                    </form>
                </div>
            </div>
        )
    }

    handleChangeSort(e : any) {
        const target = e.target;
        let value: string = target.value;
        this.setState({sortOption: value});
}

    handleSubmit(event) {
        event.preventDefault();

        alert(`You chose the ${this.state.size} pizza.`);
    }

}