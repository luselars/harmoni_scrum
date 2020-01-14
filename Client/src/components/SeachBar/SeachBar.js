//@flow

import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { OrganiserService } from '../../services/organiserService';
import { PublicService } from '../../services/publicService';

export default class SearchBar extends Component<{}, { search: string }> {
  constructor(props: any) {
    super(props);
    this.state = { search: '' };
  }

  render() {
    return (
      <div className="input-group my-3 " id="searchBox">
        <input
          type="text"
          className="form-control"
          placeholder="Søk her..."
          onChange={e => this.onChange(e)}
          name="search"
        ></input>
        <div className="input-group-append">
          <button onClick={() => this.post()} className="btn btn-outline-secondary" type="button">
            Search
          </button>
        </div>
      </div>
    );
  }

  onChange(e: any) {
    const target = e.target;
    let value: string = target.value;
    this.setState({ search: value });
    console.log(this.state.search);
  }

  post() {
    if (this.state.search.length !== 0) {
      PublicService.searchEvent('#' + this.state.search + '#').then();
    }
  }
}
