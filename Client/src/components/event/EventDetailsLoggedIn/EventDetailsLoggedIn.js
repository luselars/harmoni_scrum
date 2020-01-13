//@flow

import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';

export default class EventDetailsLoggedIn extends Component<>{
    render() 
    {  
       return ( 
        <div id="loginBox">
            <div id="EventDetailsLITable">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                        <th class="text-right" scope="row">Arrangementnavn:</th>
                        <td class="text-left">Navn</td>
                        </tr>
                        <tr>
                        <th class="text-right" scope="row">Dato:</th>
                        <td class="text-left">kl 19:00, 15.01.1998</td>
                        </tr>
                        <tr>
                        <th class="text-right" scope="row">Sted:</th>
                        <td class="text-left">Trondheim Spektrum</td>
                        </tr>
                        <tr>
                        <th class="text-right" scope="row">Adresse:</th>
                        <td class="text-left">Klostergata 90, 7030 Trondheim</td>
                        </tr>
                        <tr>
                        <th class="text-right" scope="row">Lineup:</th>
                        <td class="text-left">Justin Bieber</td>
                        </tr>
                        <tr>
                        <th class="text-right" scope="row">Kontrakt(er):</th>
                        <td class="text-left">Kontrakt.pdf</td>
                        </tr>
                        <tr>
                        <th class="text-right" scope="row">Riders:</th>
                        <td class="text-left">Rider.pdf</td>
                        </tr>
                        <tr>
                        <th class="text-right" scope="row">Synlig for utenforstående:</th>
                        <td class="text-left">Ja</td>
                        </tr>
                        <tr>
                        <th class="text-right" scope="row">Status:</th>
                        <td class="text-left">Klar til å gjennomføre</td>
                        </tr>
                        <tr>
                        <th class="text-right" scope="row">Bilde:</th>
                        <td class="text-left"><img id="EventPicLI" src="https://i.ytimg.com/vi/5Cy_KvI2nME/maxresdefault.jpg" class="img-fluid" alt="Eventbilde"></img></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button class="btn btn-success bg-green"> ENDRE ARRANGEMENT </button>
        </div>
        )
    }
}