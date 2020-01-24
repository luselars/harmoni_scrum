// @flow
import * as React from 'react';
import { Component } from 'react';
import { Collapse } from 'react-collapse';
import './stylesheet.css';

type State = {
  sortRadio1: string,
  sortRadio2: string,
  sortRadio3: string,
  status: boolean,
  sortAlt: [string, string],
};

// TODO
// Når filteret er sortert på pris, og så endrer de andre faktorene seg beholder filteret prissortering.
// Når en trykker tilbake fra et arrangement burde sortering være lik som før en trykker på det.
// Når en trykker tilbake fra et arrangement burde en routes til riktig sidetall på sorteringen som brukeren var på.
export default class Filter extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    let sortAlt = ['', ''];
    let minprice = 0;
    let maxprice = 0;
    if (localStorage.getItem('viewOld') === 'true') sortAlt[0] = 'viewOld';
    if (localStorage.getItem('viewCanceled') === 'true') sortAlt[1] = 'viewCanceled';
    if (localStorage.getItem('minprice') != null)
      minprice = parseInt(localStorage.getItem('minprice'));
    if (localStorage.getItem('maxprice') != null)
      maxprice = parseInt(localStorage.getItem('maxprice'));

    this.state = {
      sortRadio1: 'Tid ↓',
      sortRadio2: 'Alfabetisk ↓',
      sortRadio3: 'Pris ↓',
      status: true,
      sortAlt: sortAlt,
      minprice: minprice,
      maxprice: maxprice,
    };
  }

  render() {
    return (
      <div id="filterCard" class="card mt-2">
        <div class="card-body bg-light">
          <h5 class="filtertitle">
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
                    className="filtersortbtn"
                    type="button"
                    id="sortRadio1"
                    value={this.state.sortRadio1}
                    onClick={e => this.handleChangeSort(e)}
                  ></input>
                  <input
                    className="filtersortbtn"
                    type="button"
                    id="sortRadio2"
                    value={this.state.sortRadio2}
                    onClick={e => this.handleChangeSort(e)}
                  ></input>
                  <input
                    className="filtersortbtn"
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
                    Tidligere arragementer
                  </label>
                </div>
                <div className="form-check text-left mb-3">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="placeCheck2"
                    value="viewCanceled"
                    checked={this.state.sortAlt[1] === 'viewCanceled'}
                    onChange={e => this.handleChangeAlt(e)}
                  ></input>
                  <label className="placecheck form-check-label" for="placeCheck2">
                    Avlyste arragementer
                  </label>
                </div>
                <div className="col filtercategories border-bottom">
                  <h6 className="mb-3 text-success">PRIS</h6>
                </div>
                <div className="input-group pricegroup my-3 " id="searchBox2">
                  <div class="input-group md-form form-sm form-1 pl-0">
                    <div class="input-group-prepend">
                      <span class="input-group-text purple lighten-3" id="basic-text1">
                        <link
                          rel="stylesheet"
                          href="path/to/font-awesome/css/font-awesome.min.css"
                        ></link>
                        Fra
                      </span>
                    </div>
                    <input
                      className="form-control my-0 py-1"
                      onChange={e => this.handleChangeMinPrice(e)}
                      value={this.state.minprice}
                      type="text"
                      placeholder="Søk..."
                      aria-label="Search"
                    />
                  </div>
                </div>
                <div className="input-group pricegroup my-3 " id="searchBox2">
                  <div class="input-group md-form form-sm form-1 pl-0">
                    <div class="input-group-prepend">
                      <span class="input-group-text purple lighten-3" id="basic-text1">
                        <link
                          rel="stylesheet"
                          href="path/to/font-awesome/css/font-awesome.min.css"
                        ></link>
                        Til
                      </span>
                    </div>
                    <input
                      className="form-control my-0 py-1"
                      onChange={e => this.handleChangeMinPrice(e)}
                      value={this.state.maxprice}
                      type="text"
                      placeholder="Søk..."
                      aria-label="Search"
                    />
                  </div>
                </div>
                <div className="col text-center mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.nullstill();
                    }}
                    className="btn btn-success"
                  >
                    Nullstill
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
    console.log(window.screen.availWidth);
    if (window.screen.availWidth > 600) {
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
    if (value.charAt(value.length - 1) === '↓') {
      value = value.substring(0, value.length - 1) + '↑';
      this.setState();
    } else {
      value = value.substring(0, value.length - 1) + '↓';
    }
    if (e.target.id === 'sortRadio1') {
      this.setState({ sortRadio1: value });
    } else if (e.target.id === 'sortRadio2') {
      this.setState({ sortRadio2: value });
    } else if (e.target.id === 'sortRadio3') {
      this.setState({ sortRadio3: value });
    } else {
      console.log('Ukjent id: ' + e.target.id);
    }
    this.props.handleFilterChange(e.target.value);
  }

  handleChangeAlt(e: any) {
    let value: string = e.target.value;
    if (value === 'viewOld') {
      let newValue = this.state.sortAlt[0] === '' ? value : '';
      this.state.sortAlt[0] = newValue;
    }
    if (value === 'viewCanceled') {
      let newValue = this.state.sortAlt[1] === '' ? value : '';
      this.state.sortAlt[1] = newValue;
    }
    this.props.handleFilterAlternativChange(this.state.sortAlt);
  }

  handleChangeMinPrice(e: any) {
    let price = e.target.value;
    this.setState({ minprice: price });
    this.props.handleFilterPriceChange(price, 'min');
  }
  handleChangeMaxPrice(e: any) {
    let price = e.target.value;
    this.setState({ maxprice: price });
    this.props.handleFilterPriceChange(price, 'max');
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(`du trykket på velg, denne knappen gjør for øyeblikket ingenting`);
  }
  nullstill() {
    localStorage.removeItem('sortType');
    localStorage.removeItem('viewCanceled');
    localStorage.removeItem('viewOld');
    localStorage.removeItem('page');
    localStorage.removeItem('minprice');
    localStorage.removeItem('maxprice');
    window.location = '/';
  }
}
