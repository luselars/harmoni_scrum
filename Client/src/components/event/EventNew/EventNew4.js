//@flow
import React from 'react';
import { Component } from 'react';
import './stylesheet.css';
import { Artist, Event } from '../../../services/modelService';
import { PublicService } from '../../../services/publicService';
import { OrganiserService } from '../../../services/organiserService';
import DownloadFile from '../../DownloadFile/DownloadFile';
import UploadContract from '../../Upload/UploadContract';
import MoreInfo from '../../MoreInfo/MoreInfo';

type State = {
  event: Event,
  artists: Artist[],
};
type Props = {
  onSelectPage: any,
};

class EventNew4 extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      artists: [],
    };
  }
  componentDidMount() {
    // Check if the user is currently writing an event, if so load inputs with data
    if (localStorage.getItem('curr_event') != null) {
      console.log('Bruker i arr. henter data. id: ' + localStorage.getItem('curr_event'));
      OrganiserService.getEvent(localStorage.getItem('curr_event')).then(response => {
        let data = response.data;
        this.setState({ event: data });
        this.formatTime();
        OrganiserService.getArtists(data.event_id).then(resp => {
          this.setState({ artists: resp.data });
          console.log(this.state.artists);
        });
      });
    }
  }

  render() {
    return (
      <div className="createEvent" id="cardnewevent">
        <div className="form-row">
          <p>
            Legg til artister på arrangementet:
            <MoreInfo
              padding={'5px'}
              text={
                'Knytt artister til arrangementet med e-post. Hvis arrangementet er offentlig vil artistene vises til alle. Artister som legges til vil få en e-post om at de er lagt til i et arrangement.'
              }
            />
          </p>
        </div>
        <div className="form-group text-center ml-5 mr-5">
          <label htmlFor="inputEmail1" id="loginText">
            Artistens epost-addresse:
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="Skriv e-mail"
          />
          <button className="btn btn-success" onClick={() => this.invite()}>
            Inviter artist
          </button>
          {this.state.artists.map(artist => (
            <div>
              <p>Artist: {artist.email}</p>
              <div>
                <p>
                  Kontrakt: <br />
                  {artist.contract === null ? (
                    <UploadContract
                      reload={() => {
                        this.handleReload();
                      }}
                      artist={artist}
                      accept={'.pdf'}
                      message={'Last opp kontrakt'}
                      event_id={this.state.event.event_id}
                    />
                  ) : (
                    <p>
                      <DownloadFile fileName={artist.contract} />
                      <UploadContract
                        reload={() => {
                          this.handleReload();
                        }}
                        artist={artist}
                        accept={'.pdf'}
                        message={'Last opp annen kontrakt'}
                        event_id={this.state.event.event_id}
                      />
                    </p>
                  )}
                </p>
              </div>
              <br />
            </div>
          ))}
        </div>
        <div>
          <button onClick={() => this.back()} className="btn btn-success" id="backbtn">
            Tilbake
          </button>
          <button onClick={() => this.next()} className="btn btn-success" id="nextbtn">
            Neste
          </button>
        </div>
        {/*</form>*/}
      </div>
    );
  }
  handleReload = () => {
    console.log('RELOAD');
    this.componentDidMount();
  };
  invite() {
    let email = document.getElementById('email').value;
    PublicService.checkEmail(email).then(res => {
      console.log(res.data);
      if (res.data.length === 0 || res.data.type !== 'organiser') {
        OrganiserService.inviteArtist(email, this.state.event.event_id)
          .then(resp => {
            console.log(resp);
            console.log('RESP DATA MESSAGE: ' + resp.data.message);
            let text = '';
            if (resp.data.message === 'Added new user') {
              text =
                'Det er opprettet en bruker du kan bruke for å logge deg inn på Harmoni for å se flere detaljer. </p><p><b>Brukernavn: <b> ' +
                email +
                '</p><p><b>Passord: <b>' +
                resp.data.password;
            } else if (resp.data.message === 'Made user artist and added him/her to event') {
              text =
                'Din bruker er oppdatert til en artistbruker. Logg inn på Harmoni for å se flere detaljer.';
            } else {
              text = 'Logg inn på Harmoni for å se flere detaljer.';
            }
            OrganiserService.sendmail(email, this.state.event.name, text)
              .then(response => {
                console.log('Email sent');
                this.componentDidMount();
              })
              .catch(error => {
                console.log('error sendmail: ' + error);
              });

            this.componentDidMount();
          })
          .catch((error: Error) => alert('Artist allerede lagt til i arrangement'));
      }
    });
  }
  formatTime() {
    if (this.state.event.start != null) {
      let d = this.state.event.start.substring(0, 10);
      let h = this.state.event.start.substring(11, 16);
      this.state.event.start = d + ' ' + h + ':00';
    }
    if (this.state.event.end != null) {
      let d = this.state.event.end.substring(0, 10);
      let h = this.state.event.end.substring(11, 16);
      this.state.event.end = d + ' ' + h + ':00';
    }
  }
  back() {
    this.props.onSelectPage(3);
  }
  next() {
    this.props.onSelectPage(5);
  }
}
export default EventNew4;
