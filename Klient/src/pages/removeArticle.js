import React, { Component } from "react";
import Navbar from "../components/Navbar.js";
import { ArticleIdandTitleView } from "../components/ArticleIdandTitleView";
import ArticleService from "../ArticleService";

export default class RemoveArticle extends Component {
    constructor(props) {
        super(props);
        this.state = { artikkler: [] };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ArticleService.getArticles(0)
            .then(data => { this.setState({ artikkler: data.data }) })
            .catch(err => {
                console.log(err);
                return null;
            });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        // Input validering
        if (this.state.artikkelId == null || this.state.artikkelId == "") {
            document.getElementById("feedback").style.visibility = "visible";
            document.getElementById("feedback").innerHTML = "Vennligst skriv inn en Id";
        }
        else {
            let found = false;
            for (var i = 0; i < this.state.artikkler.length; i++) {
                if (this.state.artikkelId == this.state.artikkler[i].artikkelId) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                document.getElementById("feedback").style.visibility = "visible";
                document.getElementById("feedback").innerHTML = "Id matcher ingen av artikklene";
            }
            else {
                ArticleService.fjernArtikkel(this.state.artikkelId)
                    .then(response => { window.location = "/" })
            }
            event.preventDefault();
        }
    }
    render() {
        const { location } = this.props;
        return (
            <div>
                <header className="p-3">
                    <h1>Slett artikkel</h1>
                </header>
                <Navbar location={location} />
                <br />

                <form className="w-50 mx-auto" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="form-group mb-2">
                            <label type="text" class="form-control-plaintext" id="artikkelId">Artikkel id: </label>
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <input onChange={this.handleChange} name="artikkelId" type="text" className="form-control" id="artikkelId" placeholder="eks: 23" />
                            <h4 id="feedback" style={{ visibility: "hidden", color: "red", paddingLeft: "5px" }}>Noe gikk galt, vennligst sjekk input</h4>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary mb-2" type="submit">Slett</button>
                        </div>
                    </div>
                </form>
                {this.state.artikkler.length === 0 ?
                    (<h4>Laster inn artikkler...</h4>) :
                    (<div>
                        <h2 className="text-center">Artikler:</h2>
                        <ArticleIdandTitleView artikkler={this.state.artikkler}></ArticleIdandTitleView>
                    </div>)
                }
            </div>
        );
    }
}
