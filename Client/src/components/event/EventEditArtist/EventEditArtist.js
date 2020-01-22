import * as React from 'react';
import { Component } from 'react';
import { Event, User } from '../../../services/modelService';
import './stylesheet.css';
import { UserService } from '../../../services/userService';

type State = {
  event: Event,
  user: User,
};

type Props = {
  match: { params: { id: number } },
};

export default class EventEditArtist extends Component<State, Props> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      user: new User(),
    };
  }

  render() {
    return (
      <div className="card eventeditartist">
        <p className="display-4 text-uppercase text-center m-4 border-bottom">endre riders</p>
        <p>Notes for {this.state.user.email}</p>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
    );
  }

  componentDidMount() {
    UserService.getMyProfile(this.props.match.params.id)
      .then(res => {
        let user: User = res.data[0];
        this.setState({ user: user });
      })
      .catch(error => console.error(error));
  }
}
