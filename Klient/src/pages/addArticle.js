import React, { Component } from "react";
import Navbar from "../components/Navbar.js";
import ArticleService from "../ArticleService.js";

export default class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.state = { kategori: "1", viktighet: "1" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    if (this.state.overskrift == null) {
      alert("Mangler overskrift.");
    } else if (this.state.innhold == null) {
      alert("Mangler innhold");
    } else if (this.state.fultInnhold == null) {
      alert("Mangler artikkel innhold");
    } else if (this.state.bilde == null) {
      alert("Mangler bilde");
    } else if (this.state.bildeAlt == null) {
      alert("Mangler bilde tekst");
    } else {
      ArticleService.addArticle(this.state).then(data => {
        window.location = "/";
      });
    }
    event.preventDefault();
  }
  render() {
    const { location } = this.props;
    return (
      <div>
        <header className="p-3">
          <h1>Legg til artikkel</h1>
        </header>
        <Navbar location={location} />
        <form className="w-75 mx-auto" onSubmit={this.handleSubmit}>
          <div class="form-group">
            <h2 id="feedback" style={{ visibility: "hidden", color: "red" }}>
              Noe gikk galt, vennligst sjekk input
            </h2>
          </div>
          <div class="form-group">
            <label for="formControlInput1">Overskrift</label>
            <input
              onChange={this.handleChange}
              name="overskrift"
              type="text"
              className="form-control"
              id="formControlInput1"
              placeholder="min artikkel"
            />
          </div>
          <div class="form-group">
            <label for="formControlInput2">Innhold</label>
            <input
              onChange={this.handleChange}
              name="innhold"
              type="text"
              className="form-control"
              id="formControlInput2"
              placeholder="min artikkel handler om..."
            />
          </div>
          <div class="form-group">
            <label for="formControlInput3">Artikkel tekst</label>
            <textarea
              onChange={this.handleChange}
              name="fultInnhold"
              type="text"
              className="form-control"
              id="formControlInput3"
              placeholder="min artikkel handler om..."
            />
          </div>
          <div class="form-group">
            <label for="formControlInput4">Bilde url</label>
            <input
              onChange={this.handleChange}
              name="bilde"
              type="text"
              className="form-control"
              id="formControlInput3"
              placeholder="http://eksempel.com/mittBilde.jpg"
            />
          </div>
          <div class="form-group">
            <label for="formControlInput5">Bilde tekst</label>
            <input
              onChange={this.handleChange}
              name="bildeAlt"
              type="text"
              className="form-control"
              id="formControlInput4"
              placeholder="beskriv bildet"
            />
          </div>
          <div class="form-group">
            <label for="formControlSelect1">Kategori</label>
            <select
              className="form-control"
              name="kategori"
              id="formControlSelect1"
              value={this.state.kategori}
              onChange={this.handleChange}
            >
              <option value="1"> Sport</option>
              <option value="2"> Nyheter</option>
              <option value="3"> Kultur</option>
            </select>
          </div>
          <div class="form-group">
            <label for="formControlSelect2">Viktighet</label>
            <select
              className="form-control"
              name="viktighet"
              id="formControlSelect2"
              value={this.state.viktighet}
              onChange={this.handleChange}
            >
              <option value="1"> Svært viktig</option>
              <option value="2"> Middels viktig</option>
              <option value="3"> Lite viktig</option>
            </select>
          </div>
          <div className="text-center">
            <button className="btn btn-primary" type="submit">
              Send inn
            </button>
          </div>
        </form>
      </div>
    );
  }
}
