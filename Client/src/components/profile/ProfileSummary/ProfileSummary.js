// @flow
import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { User } from '../../../services/modelService';
import { UserService } from '../../../services/userService';

type State = {
  user: User,
};

type Props = {
  match: { params: { id: number } },
};

export default class ProfileSummary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: new User('', ''),
    };
  }
  render() {
    return (
      <div id="summaryCard" class="card">
        <div class="card-body bg-light">
          <div class="container bg-light">
            {this.state.user.image === null ? (
              <img
                src="http://localhost:4000/public/file/profile.png"
                class="img-rounded w-100"
                alt="Profilbilde"
              />
            ) : (
              <img
                src={'http://localhost:4000/public/file/' + this.state.user.image}
                class="img-rounded w-100"
                alt="Profilbilde"
              />
            )}
          </div>
          <div class="col text-center border-bottom">
            <h5 class="mb-3">{this.state.user.name}</h5>
            <div class="col text-center border-bottom"></div>
            <h6 className="mb-3 text-success">SORTER ETTER...</h6>
            <div className="form-check text-left mb-3">
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
                  value="option2"
                  checked={this.state.sortOption === 'option2'}
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
          </div>
          <div className="col text-center border-bottom">
            <h6 className="mb-3 text-success">TYPE ARRANGEMENT</h6>
            <div className="form-check text-left mb-3">
              <input type="checkbox" class="form-check-input" id="typeCheck1"></input>
              <label className="form-check-label" for="typeCheck1">
                Rock
              </label>
              <input type="checkbox" class="form-check-input" id="typeCheck2"></input>
              <label className="form-check-label" for="typeCheck2">
                Pop
              </label>
              <input type="checkbox" class="form-check-input" id="typeCheck3"></input>
              <label className="form-check-label" for="typeCheck3">
                Klassisk
              </label>
            </div>
          </div>
          <div className="col text-center border-bottom">
            <h6 className="mb-3 text-success">STED</h6>
            <div className="form-check text-left mb-3">
              <input type="checkbox" class="form-check-input" id="placeCheck1"></input>
              <label className="form-check-label" for="placeCheck1">
                Trondheim Spektrum
              </label>
              <input type="checkbox" class="form-check-input" id="placeCheck2"></input>
              <label className="form-check-label" for="placeCheck2">
                Sukkerhuset
              </label>
              <input type="checkbox" class="form-check-input" id="placeCheck3"></input>
              <label className="form-check-label" for="placeCheck3">
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
      </div>
    );
  }

  componentDidMount() {
    UserService.getMyProfile()
      .then(res => {
        let user: any = res.data;
        console.log(user);
        this.setState({ user: user });
      })
      .catch(error => console.error(error));
  }
}
