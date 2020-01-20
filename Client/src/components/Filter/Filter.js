// @flow
import * as React from 'react';
import { Component } from 'react';
import { Collapse } from 'react-collapse';
import './stylesheet.css';
import { string } from 'prop-types';

export default class Filter extends Component<{}, { sortOption: string, status: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      sortOption: '',
      status: true,
    };
  }

  render() {
    console.log(this.state.status);
    console.log(window.screen.availWidth);
    return (
      <div id="filterCard" class="card">
        <div class="card-body bg-light">
          <h5 class="filtertitle">
            FILTER
            {this.state.status ? (
              <element class="dropdown" onClick={() => this.handleStatus()}>
                <i class="arrow up"></i>
              </element>
            ) : (
              <element className="dropdown" onClick={() => this.handleStatus()}>
                <i class="arrow down"></i>
              </element>
            )}
          </h5>
          <form onSubmit={this.handleSubmit}>
            <Collapse isOpened={this.state.status}>
              <div className="container bg-light">
                <div className="filtercategories col border-bottom">
                  <h6 className="mb-3 text-success">SORTER</h6>
                </div>
                <div className="sortlabel form-check text-left mb-3">
                  <label className="form-check-label" htmlFor="sortRadio1">
                    <input
                      type="radio"
                      id="sortRadio1"
                      value="e.start"
                      checked={this.state.sortOption === 'e.start'}
                      onChange={e => this.handleChangeSort(e)}
                    ></input>
                    Tid
                  </label>
                  <label className="form-check-label" htmlFor="sortRadio2">
                    <input
                      type="radio"
                      id="sortRadio2"
                      value="e.name"
                      checked={e => {
                        this.setState({ sortOption: e.value });
                      }}
                      onChange={e => this.handleChangeSort(e)}
                    ></input>
                    Alfabetisk
                  </label>
                  <label className="form-check-label" htmlFor="sortRadio3">
                    <input
                      type="radio"
                      id="sortRadio3"
                      value="option3"
                      checked={this.state.sortOption === 'option3'}
                      onChange={e => this.handleChangeSort(e)}
                    ></input>
                    Størrelse
                  </label>
                </div>
                <div className="filtercategories col border-bottom">
                  <h6 className="mb-3 text-success">STED</h6>
                </div>

                <div className="form-check text-left mb-3">
                  <input type="checkbox" class="form-check-input" id="placeCheck1"></input>
                  <label className="placecheck form-check-label" for="placeCheck1">
                    Trondheim Spektrum
                  </label>
                  <input type="checkbox" class="form-check-input" id="placeCheck2"></input>
                  <label className="placecheck form-check-label" for="placeCheck2">
                    Sukkerhuset
                  </label>
                  <input type="checkbox" class="form-check-input" id="placeCheck3"></input>
                  <label className="placecheck form-check-label" for="placeCheck3">
                    Olavshallen
                  </label>
                </div>

                <div className="col filtercategories border-bottom">
                  <h6 className="mb-3 text-success">PRIS</h6>
                </div>
                <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-sm">
                      Fra
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Fra"
                    aria-describedby="inputGroup-sizing-sm"
                  ></input>
                </div>
                <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-sm">
                      Til
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Til"
                    aria-describedby="inputGroup-sizing-sm"
                  ></input>
                </div>

                <div className="col text-center mt-3">
                  <button type="submit" className="btn btn-success">
                    Velg
                  </button>
                </div>
              </div>
            </Collapse>
          </form>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (window.screen.availWidth > 500) {
      this.setState({ status: true });
    } else {
      this.setState({ status: false });
    }
  }

  handleStatus() {
    if (this.state.status) {
      this.setState({ status: false });
    } else {
      this.setState({ status: true });
    }
  }

  handleChangeSort(e: any) {
    const target = e.target;
    let value: string = target.value;
    this.setState({ sortOption: value });
    this.props.setFilter(value);
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(`du trykket på velg, denne knappen gjør for øyeblikket ingenting`);
  }
}
