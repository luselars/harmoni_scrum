// @flow
import * as React from 'react';
import { Component } from 'react';
import { string } from 'prop-types';
import { PublicService } from '../../services/publicService.js';

//Component for the feedback-function
export default class Feedback extends Component<{}, { email: string, feedbacktext: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: string,
      feedbacktext: string,
    };
  }
  render() {
    return (
      <div className="card profilecard container bg-light p-2">
        <p className="display-4 text-uppercase text-center mt-4">Feedback</p>
        <p className="text-center">
          Send inn ris og ros, klager eller tilbakemeldinger!<br></br> Vi svarer deg på mail så fort
          som mulig.
        </p>
        <form onSubmit={e => this.sendFeedback(e)}>
          <div class="form-group text-center ml-5 mr-5">
            <label for="inputEmail1">Din epost-adresse:</label>
            <input
              type="email"
              onChange={e => this.changeEmail(e)}
              name="email"
              class="form-control"
              id="inputEmail1"
              aria-describedby="emailHelp"
              placeholder="Skriv e-post"
              required
            ></input>
          </div>
          <div class="form-group text-center ml-5 mr-5">
            <label for="exampleFormControlTextarea1">Din tilbakemelding:</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="4"
              placeholder="Skriv inn din tilbakemelding"
              onChange={e => this.changeFeedback(e)}
            ></textarea>
          </div>
          <div class="form-group text-center ml-5 mr-5">
            <button
              type="submit"
              class="btn btn-success mr-3 ml-3"
              placeholder="Skriv tilbakemelding"
            >
              Send feedback
            </button>
          </div>
        </form>
      </div>
    );
  }
  //Sets the email state
  changeEmail(e: any) {
    const target = e.target;
    let value: string = target.value;
    this.setState({ email: value });
  }

  //Sets the feedback state
  changeFeedback(e: any) {
    const target = e.target;
    let value: string = target.value;
    this.setState({ feedbacktext: value });
  }

  //Sends feedback by email
  sendFeedback(e: any) {
    e.preventDefault();
    PublicService.feedback(this.state.email, this.state.feedbacktext)
      .then(response => {
        console.log('Email sent');
        window.location = '/feedbackregistered';
      })
      .catch(error => {
        console.log('error sendFeedback: ' + error);
      });
  }
}
