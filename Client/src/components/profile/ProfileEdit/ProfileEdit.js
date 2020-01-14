//@flow

import React from 'react';
import { Component } from 'react';
import { EventService } from '../../../services/EventService';

import './stylesheet.css';

type State = {
  name: string,
  email: string,
  tlf: string,
  image: string,
  descrition: string,
  address: string,
  password: string,
};

class ProfileEdit extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: 'test',
      email: 'test',
      tlf: '123',
      image: 'http://localhost:4000/user/file/profile.png',
      descrition: '',
      address: '',
      password: '',
    };
  }

  render() {
    return (
      <div className="card" id="editProfile">
        <div className="card-body">
          <h2 id="editTitle"> REDIGER PROFIL </h2>
          <img className="img-rounded w-25" id="picture" src={this.state.image} alt="Profilbilde" />
          <div className="form-check text-center my-3 p-2 border">
            <label className="form-check-label" for="upload">
              Profilbilde
            </label>
            <input
              className="file mr-6"
              accept=".jpg, .jpeg, .png"
              type="file"
              id="upload"
              name="recfile"
            />
          </div>
          <div className="form-group" id="name">
            <label for="nameInput">Navn: </label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={e => this.onChange(e)}
              value={this.state.name}
              id="nameInput"
            ></input>
          </div>
          <div className="form-group" id="phone">
            <label for="tlfInput">Telefonnummer: </label>
            <input
              type="text"
              className="form-control"
              name="tlf"
              onChange={e => this.onChange(e)}
              value={this.state.tlf}
              id="tlfInput"
            ></input>
          </div>
          <div className="form-group" id="email">
            <label for="emailInput">Epost: </label>
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={e => this.onChange(e)}
              value={this.state.email}
              id="emailInput"
            ></input>
          </div>
          <div className="form-group" id="password">
            <label for="passwordInput">Nåværende passord: </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={e => this.onChange(e)}
              value={this.state.password}
              id="passwordInput"
            ></input>
          </div>
          <div className="form-group" id="password">
            <label for="passwordInput">Nytt passord: </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={e => this.onChange(e)}
              value={this.state.password}
              id="passwordInput"
            ></input>
          </div>
            
          <div className="form-group" id="description">
            <label for="descritionInput">Beskrivelse</label>
            <textarea
              type="text"
              className="form-control"
              name="description"
              onChange={e => this.onChange(e)}
              value={this.state.descrition}
              id="descritionInput"
            ></textarea>
          </div>
          <div className="form-group" id="website">
            <label for="websiteInput">Nettside: </label>
            <input
              type="text"
              className="form-control"
              name="website"
              onChange={e => this.onChange(e)}
              value={this.state.email}
              id="websiteInput"
            ></input>
          </div>
          <iframe
            id="map"
            width="100%"
            height="300px"
            frameborder="0"
            src="https://www.google.com/maps/embed/v1/place?q=Brattoregata+4,+7010+Trondheim&key=AIzaSyC-75BBbNQpdG9lO2JararmVY5ps_xDAdk"
            allowfullscreen
          ></iframe>
          <div className="form-group" id="address">
            <label for="addressInput">Adresse: </label>
            <input
              type="text"
              className="form-control"
              name="address"
              onChange={e => this.onChange(e)}
              value={this.state.address}
              id="addressInput"
            ></input>
          </div>
          <button class="btn btn-success bg-green"> LAGRE </button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    //EventService.getEvent(this.props.match.params.id)
  }

  onChange(e: any) {
    let name: string = e.target.name;
    let value: string = e.target.value;
    this.setState({ [name]: value });
  }
}

export default ProfileEdit;
