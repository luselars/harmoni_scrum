import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle';

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">Hjem</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink isActive={window.location.pathname.includes("sport")} activeClassName="nav-link active bg-white font-weight-bold" className="nav-link" to="/sport" > Sport</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink isActive={window.location.pathname.includes("nyheter")} activeClassName="nav-link active bg-white font-weight-bold" className="nav-link" to="/nyheter" > Nyheter</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink isActive={window.location.pathname.includes("kultur")} activeClassName="nav-link active bg-white font-weight-bold" className="nav-link" to="/kultur" > Kultur</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink isActive={window.location.pathname.includes("addArticle")} activeClassName="nav-link active bg-white font-weight-bold" className="nav-link" to="/addArticle" > Legg til artikkel</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink isActive={window.location.pathname.includes("editArticle")} activeClassName="nav-link active bg-white font-weight-bold" className="nav-link" to="/editArticle" > Rediger artikkel</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink isActive={window.location.pathname.includes("removeArticle")} activeClassName="nav-link active bg-white font-weight-bold" className="nav-link" to="/removeArticle" > Slett artikkel</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}