import React from "react";
import { Component } from "react";

export class ArticleIdandTitleView extends Component {
    state = {
        artikkler: this.props.artikkler
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">{this.state.artikkler.map(temp => artikkelTitleCard(temp))}</div>
                </div>
            </div >
        );
    }
}

function artikkelTitleCard(artikkel) {
    return (
        <div className="col-sm-4 my-3">
            <div className="card">
                <h4>
                    Artikkel id: {artikkel.artikkelId}
                </h4>
                <h3>
                    {artikkel.overskrift}
                </h3>
            </div>
        </div>
    );
}