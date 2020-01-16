// @flow
import * as React from 'react';
import { Component } from 'react';
import { Collapse } from 'react-collapse';

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
      <div className="p-3">
        <div id="filterCard" className="card">
          <div className="card-body">
            <h2 className="mb-3">
              FILTER
              {this.state.status ? (
                <element className="dropdown" onClick={() => this.handleStatus()}>
                  <i className="arrow up"></i>
                </element>
              ) : (
                <element className="dropdown" onClick={() => this.handleStatus()}>
                  <i className="arrow down"></i>
                </element>
              )}
            </h2>
            <form onSubmit={this.handleSubmit}>
              <Collapse isOpened={this.state.status}>
                <div className="container bg-light">
                  <div className="col text-center border-bottom">
                    <h6 className="mb-3 text-success">SORTER ETTER...</h6>
                    <div className="d-flex m-2">
                      <label className="flex-fill" htmlFor="sortRadio1">
                        <input
                          type="radio"
                          id="sortRadio1"
                          value="e.start"
                          checked={this.state.sortOption === 'e.start'}
                          onChange={e => this.handleChangeSort(e)}
                        ></input>
                        Tid
                      </label>
                      <label className="flex-fill" htmlFor="sortRadio2">
                        <input
                          type="radio"
                          id="sortRadio2"
                          value="option2"
                          checked={this.state.sortOption === 'option2'}
                          onChange={e => this.handleChangeSort(e)}
                        ></input>
                        Alfabetisk
                      </label>
                      <label className="flex-fill" htmlFor="sortRadio3">
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
                  </div>
                  <div className="col text-center border-bottom">
                    <h6 className="mb-3 text-success">TYPE ARRANGEMENT</h6>
                    <div className="d-flex flex-wrap">
                      <label className="flex-fill" for="typeCheck1">
                        <input type="checkbox" id="typeCheck1"></input>
                        Rock
                      </label>
                      <label className="flex-fill" for="typeCheck2">
                        <input type="checkbox" id="typeCheck2"></input>
                        Pop
                      </label>
                      <label className="flex-fill" for="typeCheck3">
                        <input type="checkbox" id="typeCheck3"></input>
                        Klassisk
                      </label>
                    </div>
                  </div>
                  <div className="col text-center border-bottom">
                    <h6 className="mb-3 text-success">STED</h6>
                    <div className="d-flex flex-wrap">
                      <div className="flex-fill pr-2">
                        <label for="placeCheck1">
                          <input type="checkbox" id="placeCheck1"></input>
                          Trondheim Spektrum
                        </label>
                      </div>
                      <label className="flex-fill pr-2" for="placeCheck2">
                        <input type="checkbox" id="placeCheck2"></input>
                        Sukkerhuset
                      </label>
                      <label className="flex-fill pr-2" for="placeCheck3">
                        <input type="checkbox" id="placeCheck3"></input>
                        Olavshallen
                      </label>
                    </div>
                  </div>
                  <div className="col text-center border-bottom">
                    <h6 className="mb-3 text-success">PRIS</h6>
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
  }

  handleSubmit(event) {
    event.preventDefault();

    alert(`du trykket på velg, denne knappen gjør for øyeblikket ingenting`);
  }
}
