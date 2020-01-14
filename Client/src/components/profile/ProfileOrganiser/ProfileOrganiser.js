// @flow
import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';

import { EventService } from '../../../services/EventService';

export default class ProfileOrganiser extends Component<
  {},
  {
    organiser_email: string,
    name: string,
    image: string,
    website: string,
    eventsFinished: number,
    eventsComming: number,
    address: string,
  },
> {
  constructor(props: any) {
    super(props);
    this.state = {
      organiser_email: 'Mail',
      name: 'Navn',
      image: '',
      website: 'www.test.no',
      eventsFinished: 0,
      eventsComming: 0,
      address: '',
      id: 0,
    };
  }
  render() {
    return (
      <div id="profileOrganiserCard" class="card ">
        <div class="card-body bg-light">
          <div class="container bg-light">
            <div class="row justify-content-md-center my-5 align-items-center border-bottom pb-5">
              <div class="col-4 text-center">
                <img
                  src="http://localhost:4000/user/file/profile.png"
                  class="img-rounded w-100"
                  alt="Profilbilde"
                ></img>
              </div>
              <div class="col text-center">
                <h2 class="mb-3">{this.state.name}</h2>
                <h5>{this.state.organiser_email}</h5>
                <h5>{this.state.website}</h5>
              </div>
            </div>
            <div class="row justify-content-md-center mt-y align-items-center">
              <div class="col-4 text-center">
                <button 
                  class="btn btn-success bg-green mb-4" 
                  onClick={() => (window.location.href = '/editprofile')}
                > 
                  OPPRETT ARRANGEMENT 
                </button>
                <button
                  class="btn btn-success bg-green mb-4"
                  onClick={() => (window.location.href = '/editprofile')}
                >
                  REDIGER PROFIL
                </button>
                <button 
                  class="btn btn-success bg-green" 
                  onClick={() => (window.location.href = '/deleteprofile')}
                > 
                  SLETT PROFIL 
                </button>
              </div>
              <div class="col text-center">
                <h5 class="mb-3 text-success">ARRANGEMENTER</h5>
                {
                  //if ((this.state.eventsComming + this.state.eventsFinished) > 0)
                }
                <p>Du har {this.state.eventsComming} kommende arrangementer.</p>
                <p>Du har gjennomført {this.state.eventsFinished} arrangementer.</p>
                <button
                  class="btn btn-success bg-green"
                  onClick={() => (window.location.href = '/events/' + this.state.id)}
                >
                  {' '}
                  SE ARRANGEMENTER{' '}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    EventService.getOrganiser(window.localStorage.getItem("token"))
      .then(res => {
        let organsier: any = res.data;
        console.log(organsier[0]);
        this.setState({
          organiser_email: organsier[0].organiser_email,
          name: organsier[0].name,
          image: 'http://localhost:4000/user/file/' + organsier[0].image,
          website: organsier[0].website,
          eventsFinished: organsier[0].eventsFinished,
          eventsComming: organsier[0].eventsComming,
          address: organsier[0].address,
        });
      })

      .catch(error => console.error(error));
  }
}
