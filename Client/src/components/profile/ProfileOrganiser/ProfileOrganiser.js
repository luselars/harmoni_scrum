// @flow
import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';

export default class ProfileOrganiser extends Component<Props, State>{
    render(){
        return(
            <div class="card ">
                <div class="card-body bg-light">
                    <div class="container bg-light">
                        <div class="row justify-content-md-center my-5 align-items-center border-bottom pb-5">
                            <div class="col-4 text-center">
                                <img src="" class="img-rounded" alt="Profilbilde"></img>  
                            </div>
                            <div class="col text-center">
                                <h2 class="mb-3">Arrangementnavn</h2>
                                <h5>email@hotmewfa.com</h5>
                                <h5>https://www.sukkerhuset.no/</h5>
                            </div>
                        </div>
                        <div class="row justify-content-md-center mt-y align-items-center">
                            <div class="col-4 text-center">
                                <button class="btn btn-success bg-green mb-4"> OPPRETT ARRANGEMENT </button>
                                <button class="btn btn-success bg-green mb-4"> REDIGER PROFIL </button>
                                <button class="btn btn-success bg-green"> SLETT PROFIL </button>
                            </div>
                            <div class="col text-center">
                                <h5 class="mb-3 text-success">ARRANGEMENTER</h5>
                                <p>Du har 3 kommende arrangementer.</p>
                                <p>Du har gjennomført 4 arrangementer.</p>
                                <button class="btn btn-success bg-green"> SE ARRANGEMENTER </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}