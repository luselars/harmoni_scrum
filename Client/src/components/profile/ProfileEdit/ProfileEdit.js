//@flow

import React from 'react';
import { Component } from 'react';
import { OrganiserService } from '../../../services/organiserService';
import { PublicService } from '../../../services/publicService';
import { Organiser } from '../../../services/modelService';
import './stylesheet.css';
let path = require('path');
let mail: string;
let imagePrev: string = '   ';

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

//Component for editing ograniser profile
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
      <div>
        {/*Modals for deleting profile and cancelling event*/}
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            <div className="modalbody">
              <p className="border-bottom">Vil du slette profilen?</p>
              <button className="btn btn-success modalbtn" id="cancel">
                Avbryt
              </button>
              <button className="btn btn-secondary modalbtn" onClick={() => this.delete()}>
                Slett
              </button>
            </div>
          </div>
        </div>
        <form onSubmit={e => this.post(e)} className="card" id="editProfile">
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          ></link>
          <div className="card-body m-2 m-md-5 text-center">
            <p className="display-4"> REDIGER PROFIL </p>
            <img
              className="img rounded-circle p-md-0 p-4"
              id="picture"
              alt="Profilbilde"
              src={
                this.state.image
                  ? 'http://localhost:4000/public/file/' + this.state.image
                  : 'http://localhost:4000/public/file/profile.png'
              }
            />
            <div className="form-check text-center my-3 p-2 border">
              <label className="form-check-label" for="upload">
                Profilbilde
              </label>
              <input
                className="file mr-6"
                accept=".jpg, .jpeg, .png"
                type="file"
                name="image"
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
                defaultValue={this.state.name}
                id="nameInput"
                required
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
                type="email"
                className="form-control"
                name="organiser_email"
                onChange={e => this.onChange(e)}
                defaultValue={this.state.organiser_email}
                id="emailInput"
                required
              ></input>
            </div>
            <div className="form-group" id="password">
              <label for="passwordInput">Nåværende passord: </label>
              <label for="passwordError" id="labelPasswordError" className="text-danger"></label>
              <input
                type="password"
                autocomplete="new-password"
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
              <label for="descritionInput">Beskrivelse:</label>
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
                onChange={e => this.onChange(e)}
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
                onChange={e => this.onChange(e)}
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
                onChange={e => this.onChange(e)}
                defaultValue={this.state.postal}
                id="postalInput"
              ></input>
            </div>
            <input
              type="submit"
              class="btn btn-success w-50 mx-auto d-block m-2"
              value="Lagre"
            ></input>
            <a href="/profile">
              <button type="button" class="btn btn-secondary w-50 mx-auto d-block m-2">
                Tilbake
              </button>
            </a>
            <button
              type="button"
              className="btn btn-secondary w-50 mx-auto d-block m-2"
              id="deleteprofilebtn"
              onClick={() => this.deletebtn()}
            >
              <i className="fa fa-trash" aria-hidden="true"></i> Slett
            </button>
          </div>
        </form>
      </div>
    );
  }
  componentDidMount() {
    OrganiserService.getOrganiser().then(res => {
      console.log(res.data);
      let organiser: Organiser = res.data;
      this.setState({
        organiser_id: organiser.organiser_id,
        name: organiser.name,
        organiser_email: organiser.organiser_email,
        image: organiser.image,
        description: organiser.description,
        website: organiser.website,
        address: organiser.address,
        tlf: organiser.tlf,
      });
      mail = this.state.organiser_email;
      if (this.state.image != null) imagePrev = this.state.image;
      var a = this.state.address;
      var res = a.split('#');
      var nr = parseInt(res[1], 10);
      if (res[2] === 'undefined') {
        this.setState({ postal: '' });
      } else {
        this.setState({ postal: res[2] });
      }
      this.setState({
        streetAddress: res[0],
        postalcode: nr,
      });
      console.log(
        this.state.streetAddress + ', ' + this.state.postalcode + ', ' + this.state.postal,
      );
    });
  }

  //Sets style to modal
  deletebtn() {
    var btn = document.getElementById('deleteprofilebtn');
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName('close')[0];
    var cancel = document.getElementById('cancel');
    modal.style.display = 'block';
    span.onclick = function() {
      modal.style.display = 'none';
    };
    cancel.onclick = function() {
      modal.style.display = 'none';
    };
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  //Deletes event
  delete() {
    OrganiserService.deleteOrganiser(this.state.organiser_id)
      .then(response => {
        localStorage.removeItem('token');
        window.location = '/deletedprofile';
      })
      .catch(error => console.error(error));
  }

  onChange(e: any) {
    let name: string = e.target.name;
    let value: string = e.target.value;
    this.setState({ [name]: value });
  }

  edit(changePassword: boolean) {
    if (this.state.newPassword.length < 8 && changePassword) {
      document.getElementById('labelPasswordError').innerHTML = '';
      document.getElementById('labelNewPasswordError').innerHTML = 'Må være mer enn 8 tegn';
    } else {
      document.getElementById('labelPasswordError').innerHTML = '';
      document.getElementById('labelNewPasswordError').innerHTML = '';
      // Image
      let imageUpload = document.getElementById('upload');
      if (imageUpload.value !== '') {
        console.log('imgae: ' + imageUpload.value);
        let fullPath: any = imageUpload.value;
        let ext = path.extname(fullPath).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
          alert('Ikke gyldig filtype');
          return;
        }
        const file = imageUpload.files[0];
        const reader = new FileReader();
        const state2 = this.state;
        reader.addEventListener(
          'load',
          function() {
            state2.image = reader.result;
            if (changePassword) state2.password = state2.newPassword;
            OrganiserService.editOrganiser(state2).then(response => {
              window.location = '/profile';
            });
          },
          false,
        );
        if (file) {
          reader.readAsDataURL(file);
        } else {
          this.editPost(this.state, changePassword);
        }
      } else {
        this.editPost(this.state, changePassword);
      }
    }
  }

  editPost(state: Object, changePassword: boolean) {
    if (changePassword) state.password = state.newPassword;
    OrganiserService.editOrganiser(state).then(response => {
      window.location = '/profile';
    });
  }

  post(event: any) {
    event.preventDefault();
    this.state.address =
      this.state.streetAddress + '#' + this.state.postalcode + '#' + this.state.postal;
    {
      this.state.newPassword.length === 0 && this.state.password.length === 0
        ? this.edit(false)
        : PublicService.logIn(mail, this.state.password)
            .then(response => {
              console.log('Response: ' + response.data.jwt);
              this.edit(true);
            })
            .catch(error => {
              console.log('error: ' + error);
              document.getElementById('labelPasswordError').innerHTML = 'Feil passord';
              document.getElementById('labelNewPasswordError').innerHTML = '';
            });
    }
  }
}

export default ProfileEdit;
