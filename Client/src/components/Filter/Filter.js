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
      sortAlt: ['', ''],
    };
  }

  render() {
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
                      value="time"
                      checked={this.state.sortOption === 'time'}
                      onChange={e => this.handleChangeSort(e)}
                    ></input>
                    Tid
                  </label>
                  <label className="form-check-label" htmlFor="sortRadio2">
                    <input
                      type="radio"
                      id="sortRadio2"
                      value="alphabetical"
                      checked={this.state.sortOption === 'alphabetical'}
                      onChange={e => this.handleChangeSort(e)}
                    ></input>
                    Alfabetisk
                  </label>
                  <label className="form-check-label" htmlFor="sortRadio3">
                    <input
                      type="radio"
                      id="sortRadio3"
                      value="price"
                      checked={this.state.sortOption === 'price'}
                      onChange={e => this.handleChangeSort(e)}
                    ></input>
                    Pris
                  </label>
                </div>
                <div className="filtercategories col border-bottom">
                  <h6 className="mb-3 text-success">ALTERNATIVER</h6>
                </div>

                <div className="form-check text-left mb-3">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="placeCheck1"
                    value="viewOld"
                    checked={this.state.sortAlt[0] === 'viewOld'}
                    onChange={e => this.handleChangeAlt(e)}
                  ></input>
                  <label className="placecheck form-check-label" for="placeCheck1">
                    Se eldre arragementer (1 måned gamle)
                  </label>
                </div>
                <div className="form-check text-left mb-3">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="placeCheck2"
                    value="test"
                    checked={this.state.sortAlt[1] === 'test'}
                    onChange={e => this.handleChangeAlt(e)}
                  ></input>
                  <label className="placecheck form-check-label" for="placeCheck2">
                    test
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
    let value: string = e.target.value;
    this.setState({ sortOption: value });
    this.props.handleFilterChange(value);
  }

  handleChangeAlt(e: any) {
    let value: string = e.target.value;
    if (value == 'viewOld') {
      let newValue = this.state.sortAlt[0] === '' ? value : '';
      this.state.sortAlt[0] = newValue;
    }
    if (value == 'test') {
      let newValue = this.state.sortAlt[1] === '' ? value : '';
      this.state.sortAlt[1] = newValue;
    }
    this.props.handleFilterChange(this.state.sortAlt);
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(`du trykket på velg, denne knappen gjør for øyeblikket ingenting`);
  }
}
