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

/**Component for fourth page on creating a new event */
class EventNew4 extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: new Event(),
      artists: [],
    };
  }
  /**Gets from the localStorage. Gets event and artist*/
  componentDidMount() {
    // Check if the user is currently writing an event, if so load inputs with data
    if (localStorage.getItem('curr_event') != null) {
      OrganiserService.getEvent(localStorage.getItem('curr_event')).then(response => {
        let data = response.data;
        this.setState({ event: data });
        OrganiserService.getArtists(data.event_id).then(resp => {
          this.setState({ artists: resp.data });
        });
      });
    }
  }

  render() {
    return (
      <div>
        <div className="form-row justify-content-center">
          <div id="col-12">
            <form onSubmit={e => this.invite(e)}>
              <h4 className="text-center">
                Legg til artister på arrangementet
                <MoreInfo
                  padding={'5px'}
                  text={
                    'Knytt artister til arrangementet med e-post. Hvis arrangementet er offentlig vil artistene vises til alle. Artister som legges til vil få en e-post om at de er lagt til i et arrangement.'
                  }
                />
              </h4>
              <p id="alert" style={{ color: 'red' }} hidden="true">
                Eposten er i bruk av en annen arrangør
              </p>

              <div className="text-center">
                <small id="artistOptional" className="text-muted text-center mb-2">
                  Valgfritt
                </small>
              </div>
              <input
                type="email"
                name="email"
                className="form-control w-100"
                id="email"
                placeholder="Skriv e-mail..."
                required
              />

              <button type="submit" className="btn btn-success col-sm-4 mb-2 d-block mx-auto ">
                Inviter
              </button>
            </form>
            {this.state.artists.length > 0 ? (
              <table className="table table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Artist</th>
                    <th scope="col">Kontrakt</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.artists.map(artist => (
                    <tr>
                      <td scope="row">{artist.email}</td>
                      <td>
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <button
          onClick={() => this.next()}
          type="button"
          className="btn btn-success col-sm-3 m-2 d-block mx-auto "
          id="nextbtn"
        >
          Neste
        </button>
        <button
          onClick={() => this.back()}
          type="button"
          className="btn btn-secondary col-sm-3 m-2 d-block mx-auto "
          id="backbtn"
        >
          Tilbake
        </button>
      </div>
    );
  }
  /**Reloads page*/
  handleReload = () => {
    this.componentDidMount();
  };

  /**Checks if email already exist.*/
  invite(event) {
    // $FlowFixMe
    document.getElementById('alert').hidden = true;
    event.preventDefault();
    let email = document.getElementById('email').value;
    document.getElementById('email').value = '';
    PublicService.checkEmail(email).then(res => {
      if (res.data.length === 0) {
        this.addArtist(email);
      } else if (res.data[0].type !== 'organiser') {
        this.addArtist(email);
      } else {
        // $FlowFixMe
        document.getElementById('alert').hidden = false;
        window.scrollTo(0, 0);
      }
    });
  }
  /**Sends email to artist added to event */
  addArtist(email) {
    OrganiserService.inviteArtist(email, this.state.event.event_id)
      .then(resp => {
        let text = '';
        if (resp.data.message === 'Added new user') {
          text =
            ' som artist. Det er opprettet en bruker du kan bruke for å logge deg inn på Harmoni for å se flere detaljer. </p><p><b>Brukernavn: <b> ' +
            email +
            '</p><p><b>Passord: <b>' +
            resp.data.password;
        } else if (resp.data.message === 'Made user artist and added him/her to event') {
          text =
            ' som artist. Din bruker er oppdatert til en artistbruker. Logg inn på Harmoni for å se flere detaljer.';
        } else {
          text = ' som artist. Logg inn på Harmoni for å se flere detaljer.';
        }
        OrganiserService.sendmail(email, this.state.event.name, text)
          .then(response => {
            this.componentDidMount();
          })
          .catch(error => {});

        this.componentDidMount();
      })
      .catch((error: Error) => alert('Artist allerede lagt til i arrangement'));
  }
  /**Returns to previous page */
  back() {
    this.props.onSelectPage(3);
  }

  /**Sends user to next page */
  next() {
    this.props.onSelectPage(5);
  }
}
export default EventNew4;
