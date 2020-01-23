//@flow

import React from 'react';
import { Component } from 'react';
import { UserService } from '../../../services/userService';
import { PublicService } from '../../../services/publicService';
import { User } from '../../../services/modelService';
import './stylesheet.css';
let path = require('path');
let mail: string;
let imagePrev: string = '   ';

type State = {
  user_id: number,
  name: string,
  email: string,
  image: string,
  password: string,
  description: string,
  tlf: string,
  newPassword: string,
  artist_name: string,
};

class ProfileEditUser extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      user_id: 0,
      name: '',
      email: '',
      image: '',
      password: '',
      description: '',
      tlf: '',
      newPassword: '',
      artist_name: '',
    };
  }

  render() {
    return (
      <div>
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
          <div className="card-body m-5">
            <h2 id="editTitle"> REDIGER PROFIL </h2>
            {this.state.image === undefined || this.state.image === null ? (
              <img
                src="http://localhost:4000/public/file/profile.png"
                class="img rounded-circle w-50 mx-auto d-block"
                id="picture"
                alt="Profilbilde"
              />
            ) : (
              <img
                src={'http://localhost:4000/public/file/' + this.state.image}
                class="img rounded-circle w-50 mx-auto d-block"
                id="picture"
                alt="Profilbilde"
              />
            )}
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
                defaultValue={this.state.name}
                id="nameInput"
                required
              ></input>
            </div>
            {this.state.artist_name !== null ? (
              <div className="form-group" id="name">
                <label for="artistnameInput">Artistnavn: </label>
                <input
                  type="text"
                  className="form-control"
                  name="artist_name"
                  onChange={e => this.onChange(e)}
                  defaultValue={this.state.artist_name}
                  id="artistnameInput"
                  required
                ></input>
              </div>
            ) : (
              <div></div>
            )}
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
                name="email"
                onChange={e => this.onChange(e)}
                defaultValue={this.state.email}
                id="emailInput"
                required
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
              className="btn btn-secondary w-50 mx-auto d-block m-2"
              type="button"
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
    UserService.getMyProfile().then(res => {
      console.log(res.data[0]);
      let user: User = res.data[0];
      this.setState({
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        image: user.image,
        description: user.description,
        tlf: user.tlf,
        artist_name: user.artist_name,
      });
      mail = this.state.email;
      if (this.state.image !== null) imagePrev = this.state.image;
      console.log('image: ' + this.state.email);
    });
  }

  deletebtn() {
    var btn = document.getElementById('deleteprofilebtn');
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName('close')[0];
    var cancel = document.getElementById('cancel');
    console.log(this.state.user_id);
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

  delete() {
    console.log('hei');
    UserService.deleteUser(this.state.user_id)
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

  //TODO delete old profile pic <3
  edit(changePassword: boolean) {
    if (this.state.newPassword.length < 8 && changePassword) {
      document.getElementById('labelPasswordError').innerHTML = '';
      document.getElementById('labelNewPasswordError').innerHTML = 'Må være mer enn 8 tegn';
    } else {
      document.getElementById('labelPasswordError').innerHTML = '';
      document.getElementById('labelNewPasswordError').innerHTML = '';

      // Image
      let element = document.getElementById('upload');
      if (element.value !== '') {
        let fullPath: any = element.value;
        let ext = path.extname(fullPath).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
          //TODO change alert
          alert('Ikke gyldig filtype');
          return;
        }
        const file = element.files[0];
        const reader = new FileReader();
        const state2 = this.state;
        reader.addEventListener(
          'load',
          function() {
            state2.image = reader.result;
            if (changePassword) state2.password = state2.newPassword;
            UserService.editUser(state2).then(response => {
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
    alert('heeeeeeelllo' + state.artist_name);

    if (changePassword) state.password = state.newPassword;
    UserService.editUser(state)
      .then(UserService.editArtistname(state.artist_name).then(alert('hei')))
      .then(response => {
        window.location = '/profile';
        console.log('done');
      })
      .catch(error => {
        console.log('error: ' + error);
      });
  }

  post(event: any) {
    event.preventDefault();
    {
      this.state.newPassword.length === 0 && this.state.password.length === 0
        ? this.edit(false)
        : PublicService.logIn(mail, this.state.password)
            .then(response => {
              console.log('Response: ' + response.data.jwt);
              this.edit(true, true);
            })
            .catch(error => {
              console.log('error: ' + error);
              document.getElementById('labelPasswordError').innerHTML = 'Feil passord';
              document.getElementById('labelNewPasswordError').innerHTML = '';
            });
    }
  }
}

export default ProfileEditUser;
