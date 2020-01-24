//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import EventNew from './EventNew';
import EventNew2 from './EventNew2';
import EventNew3 from './EventNew3';
import EventNew7 from './EventNew7';
import EventNew6 from './EventNew6';
import EventNew5 from './EventNew5';
import EventNew4 from './EventNew4';

type Props = {
  edit: boolean,
};
type State = {
  page: number,
};

/**Component  */
class EditEvent extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 7,
    };
  }
  handlePage = (page: number) => {
    this.setState({ page: page });
  };
  componentDidMount(): * {}

  render() {
    return (
      <div className="card" id="cardnewevent">
        <div className="createEvent">
          {this.props.edit ? (
            <p className="display-4">Rediger arrangement</p>
          ) : (
            <p className="display-4">Opprett arrangement</p>
          )}
          {
            {
              1: <EventNew onSelectPage={this.handlePage} />,
              2: <EventNew2 onSelectPage={this.handlePage} />,
              3: <EventNew3 onSelectPage={this.handlePage} />,
              4: <EventNew4 onSelectPage={this.handlePage} />,
              5: <EventNew5 onSelectPage={this.handlePage} />,
              6: <EventNew6 onSelectPage={this.handlePage} />,
              7: <EventNew7 onSelectPage={this.handlePage} />,
            }[this.state.page]
          }
        </div>
      </div>
    );
  }
}

export default EditEvent;
