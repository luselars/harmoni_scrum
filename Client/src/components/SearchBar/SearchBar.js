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
        <div class="input-group md-form form-sm form-1 pl-0">
          <div class="input-group-prepend">
            <span
              onClick={() => this.post()}
              class="input-group-text purple lighten-3"
              id="basic-text1"
            >
              <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"></link>
              <i class="fa fa-search" aria-hidden="true"></i>
            </span>
          </div>
          <input
            class="form-control my-0 py-1"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
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
