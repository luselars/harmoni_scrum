//@flow

import React from 'react';
import { Component } from 'react';
import { OrganiserService } from '../../../services/organiserService';
import { PublicService } from '../../../services/publicService';
import { Organiser } from '../../../services/modelService';
import './stylesheet.css';

type State = {
  organiser_id: number,
  name: string,
  organiser_email: string,
  image: string,
  password: string,
  description: string,
  website: string,
  address: string,
  tlf: string,
  newPassword: string,
  streetAddress: string,
  postalcode: number,
  postal: string,
};

class ProfileEdit extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      organiser_id: 0,
      name: '',
      organiser_email: '',
      image: '',
      password: '',
      description: '',
      website: '',
      address: '',
      tlf: '',
      newPassword: '',
      streetAddress: '',
      postalcode: 0,
      postal: '',
    };
  }

  render() {
    return (
      <div className="card" id="editProfile">
        <div className="card-body m-5">
          <h2 id="editTitle"> REDIGER PROFIL </h2>
          <img
            className="img-rounded w-25"
            id="picture"
            alt="Profilbilde"
            src={
              'http://localhost:4000/public/file/' + this.state.image == undefined
                ? 'profile.png'
                : this.state.image
            }
          />
          {/*<div className="form-check text-center my-3 p-2 border">
            <label className="form-check-label" for="upload">
              Profilbilde
            </label>
            <input
              className="file mr-6"
              accept=".jpg, .jpeg, .png"
              type="file"
              id="imageInput"
              name="image"
            />
    </div>*/}
          <div className="form-group" id="name">
            <label for="nameInput">Navn: </label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={e => this.onChange(e)}
              defaultValue={this.state.name}
              id="nameInput"
            ></input>
          </div>
          <div className="form-group" id="phone">
            <label for="tlfInput">Telefonnummer: </label>
            <input
              type="tel"
              className="form-control"
              name="tlf"
              onChange={e => this.onChange(e)}
              defaultValue={this.state.tlf}
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
              defaultValue={this.state.organiser_email}
              id="emailInput"
            ></input>
          </div>
          <div className="form-group" id="password">
            <label for="passwordInput">Nåværende passord: </label>
            <label for="passwordError" id="labelPasswordError" className="text-danger"></label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={e => this.onChange(e)}
              id="passwordInput"
            ></input>
          </div>
          <div className="form-group" id="password">
            <label for="passwordNewInput">Nytt passord: </label>
            <label for="passwordError" id="labelNewPasswordError" className="text-danger"></label>
            <input
              type="password"
              className="form-control"
              name="newPassword"
              onChange={e => this.onChange(e)}
              id="passwordNewInput"
            ></input>
          </div>

          <div className="form-group" id="description">
            <label for="descritionInput">Beskrivelse</label>
            <textarea
              type="text"
              className="form-control"
              name="description"
              onChange={e => this.onChange(e)}
              defaultValue={this.state.description}
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
              defaultValue={this.state.website}
              id="websiteInput"
            ></input>
          </div>

          <iframe
            id="map"
            width="100%"
            height="300px"
            frameborder="0"
            src={
              'https://www.google.com/maps/embed/v1/place?q=' +
              this.state.streetAddress +
              ',+' +
              this.state.postalcode +
              '+' +
              this.state.postal +
              '&key=AIzaSyC-75BBbNQpdG9lO2JararmVY5ps_xDAdk'
            }
            allowfullscreen
          ></iframe>
          <div className="form-group" id="address">
            <label for="streetAddressInput">Adresse: </label>
            <input
              type="text"
              className="form-control"
              name="streetAddress"
              onChange={e => this.onChangeAddress(e)}
              defaultValue={this.state.streetAddress}
              id="streetAddressInput"
            ></input>
          </div>
          <div className="form-group" id="postalcode">
            <label for="postalcodeInput">Postnummer: </label>
            <input
              type="number"
              className="form-control"
              name="postalcode"
              onChange={e => this.onChangeAddress(e)}
              value={this.state.postalcode}
              id="postalcodeInput"
            ></input>
          </div>
          <div className="form-group" id="postal">
            <label for="postalInput">Poststed: </label>
            <input
              type="text"
              className="form-control"
              name="postal"
              onChange={e => this.onChangeAddress(e)}
              defaultValue={this.state.postal}
              id="postalInput"
            ></input>
          </div>
          <input type="submit" class="btn btn-success bg-green" onClick={() => this.post()}>
            {' '}
            LAGRE{' '}
          </input>
        </div>
      </div>
    );
  }
  componentDidMount() {
    OrganiserService.getOrganiser().then(res => {
      console.log(res.data);
      let organiser: Organiser = res.data;
      this.setState({
        organiser_id: organiser.organiser_id_,
        name: organiser.name,
        organiser_email: organiser.organiser_email,
        image: organiser.image,
        description: organiser.description,
        website: organiser.website,
        address: organiser.address,
        tlf: organiser.tlf,
      });
      var a = this.state.address + ' ';
      var res = a.split('#');
      var nr = parseInt(res[1], 10);
      console.log('postnr: ' + nr);
      this.setState({
        streetAddress: res[0],
        postalcode: nr,
        postal: res[2],
      });
      console.log(
        this.state.streetAddress + ', ' + this.state.postalcode + ', ' + this.state.postal,
      );
    });
  }

  onChange(e: any) {
    let name: string = e.target.name;
    let value: string = e.target.value;
    this.setState({ [name]: value });
    console.log(this.state.image);
  }
  onChangeAddress(e: any) {
    let name: string = e.target.name;
    let value: string = e.target.value;
    this.setState({ [name]: value });
    this.setState({
      address: this.state.streetAddress + '#' + this.state.postalcode + '#' + this.state.postal,
    });
    console.log(this.state.address);
    console.log('delt: ' + this.state.streetAddress + this.state.postalcode + this.state.postal);
  }

  edit(correct: boolean, changePassword: boolean) {
    console.log('reg');
    console.log(correct);
    if (!correct && changePassword) {
      document.getElementById('labelPasswordError').innerHTML = 'Feil passord';
      document.getElementById('labelNewPasswordError').innerHTML = '';
    } else {
      if (this.state.newPassword.length < 8 && changePassword) {
        document.getElementById('labelPasswordError').innerHTML = '';
        document.getElementById('labelNewPasswordError').innerHTML = 'Må være mer enn 8 tegn';
        console.log('inne: ' + this.state.newPassword);
      } else {
        document.getElementById('labelPasswordError').innerHTML = '';
        document.getElementById('labelNewPasswordError').innerHTML = '';
        this.setState({ password: this.state.newPassword });
        let editedOrangiser: Organiser = new Organiser(this.state.organiser_email, this.state.name);
        editedOrangiser.tlf = this.state.tlf;
        editedOrangiser.website = this.state.website;
        editedOrangiser.address = this.state.address;
        editedOrangiser.organiser_id_ = this.state.organiser_id;
        editedOrangiser.image = this.state.image;
        editedOrangiser.description = this.state.description;
        if (changePassword) editedOrangiser.password = this.state.password;

        OrganiserService.editOrganiser(editedOrangiser).then(response => {
          window.location = '/profile';
        });
      }
    }
  }

  post() {
    console.log(this.state.newPassword);
    {
      this.state.newPassword.length === 0 && this.state.password.length === 0
        ? this.edit(false, false)
        : PublicService.logIn(this.state.organiser_email, this.state.password)
            .then(response => {
              console.log('Response: ' + response.data.jwt);
              this.edit(true, true);
            })
            .catch(error => {
              console.log('error: ' + error);
              this.edit(false, true);
            });
    }
  }
}

export default ProfileEdit;
