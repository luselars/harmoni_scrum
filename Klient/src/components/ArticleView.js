import React from "react";
import Navbar from "./Navbar.js";
import { ArtikkelModalContainer } from "./ArtikkelModalContainer.js";
import { Component } from "react";
import ArticleService from "../ArticleService.js";

export class ArticleView extends Component {
    state = {
        articles: []
    }
    componentDidMount() {
        var kategoriId = this.props.kategori;
        ArticleService.getArticles(kategoriId)
            .then(data => { this.setState({ articles: data.data }) })
            .catch(err => {
                console.log(err);
                return null;
            });
        setInterval(() => {
            ArticleService.getArticles(kategoriId)
                .then(data => { this.setState({ articles: data.data }) })
                .catch(err => {
                    console.log(err);
                    return null;
                });
        }, 10000);
    }
    render() {
        return (
            <div>
                <header className="p-3">
                    <h1>{this.props.title}</h1>
                </header>
                <Navbar location={this.props.location} />
                {this.state.articles.length === 0 ?
                    (<div>Loading...</div>) :
                    (<div><div className="card-columns">
                        {this.state.articles.map(temp => artikkelCard(temp))}
                    </div>
                        <div className="ticker-wrap">
                            <div className="ticker" id="liveFeed">
                                {this.state.articles.map(temp => tickerItem(temp))}
                            </div>
                        </div>
                        <div>
                            <ArtikkelModalContainer artikkeler={this.state.articles}></ArtikkelModalContainer>
                        </div>
                    </div>)

                }
            </div >
        );
    }
}

function tickerItem(artikkel) {
    return (
        <div className="ticker__item">
            {artikkel.innleggelseTid.split("T")[1].substring(0, 5)} {artikkel.overskrift}
        </div>
    );
}

function artikkelCard(artikkel) {
    let kategorier = ["Sport", "Nyheter", "Kultur"];
    let viktigheter = ["Svært viktig", "Middels viktig", "Lite viktig"];
    return (
        <div className="card m-3">
            <img
                className="card-img-top img-fluid"
                src={artikkel.bilde}
                alt={artikkel.bildeAlt}
            ></img>
            <div className="card-block">
                <h4 className="card-title text-center custom-title-movies">
                    <a>
                        {artikkel.overskrift}
                    </a>
                </h4>
                <p className="card-text text-center custom-title-movies">{artikkel.innhold}</p>
                <div className="col-sm-12 text-center">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#artikkel" + artikkel.artikkelId}>Les mer</button>
                </div>
                <p className="card-text custom-title-movies text-center">
                    <small className="text-muted">
                        Kategori: {kategorier[artikkel.kategoriId - 1]}
                    </small>
                    <br />
                    <small className="text-muted">
                        Viktighet: {viktigheter[artikkel.viktighet - 1]}
                    </small>
                    <br />
                    <small className="text-muted">
                        Lagt ut: {artikkel.innleggelseTid.split("T")[0].split("-")[2] + "." + artikkel.innleggelseTid.split("T")[0].split("-")[1] + "." + artikkel.innleggelseTid.split("T")[0].split("-")[0] + " kl: " + artikkel.innleggelseTid.split("T")[1].substring(0, 5)}
                    </small>
                </p>
            </div>
        </div>
    );
}