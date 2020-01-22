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
      sortRadio1: 'Tid ↓',
      sortRadio2: 'Alfabetisk ↓',
      sortRadio3: 'Pris ↓',
      status: true,
      sortAlt: ['', ''],
    };
  }

  render() {
    return (
      <div id="filterCard" className="card">
        <div className="card-body bg-light">
          <h5 className="filtertitle">
            FILTER
            {this.state.status ? (
              <element class="dropdown" onClick={() => this.handleStatus()}>
                <i className="arrow up"></i>
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
                  <input
                    type="button"
                    id="sortRadio1"
                    value={this.state.sortRadio1}
                    onClick={e => this.handleChangeSort(e)}
                  ></input>
                  <input
                    type="button"
                    id="sortRadio2"
                    value={this.state.sortRadio2}
                    onClick={e => this.handleChangeSort(e)}
                  ></input>
                  <input
                    type="button"
                    id="sortRadio3"
                    value={this.state.sortRadio3}
                    onClick={e => this.handleChangeSort(e)}
                  ></input>
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
                    type="number"
                    className="form-control"
                    onChange={e => this.handleChangeMinPrice(e)}
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
                    type="number"
                    className="form-control"
                    onChange={e => this.handleChangeMaxPrice(e)}
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
    if (value.charAt(value.length - 1) == '↓') {
      value = value.substring(0, value.length - 1) + '↑';
      this.setState();
    } else {
      value = value.substring(0, value.length - 1) + '↓';
    }
    if (e.target.id == 'sortRadio1') {
      this.setState({ sortRadio1: value });
    } else if (e.target.id == 'sortRadio2') {
      this.setState({ sortRadio2: value });
    } else if (e.target.id == 'sortRadio3') {
      this.setState({ sortRadio3: value });
    } else {
      console.log('Ukjent id: ' + e.target.id);
    }
    this.props.handleFilterChange(e.target.value);
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
    this.props.handleFilterAlternativChange(this.state.sortAlt);
  }

  handleChangeMinPrice(e: any) {
    let price = e.target.value;
    this.props.handleFilterPriceChange(price, 'min');
  }
  handleChangeMaxPrice(e: any) {
    let price = e.target.value;
    this.props.handleFilterPriceChange(price, 'max');
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(`du trykket på velg, denne knappen gjør for øyeblikket ingenting`);
  }
}
