import { Component } from "react";
import { ArticleView } from "../components/ArticleView";
import React from "react";

export default class Home extends Component {
    render() {
        return (
            <ArticleView title="Mini prosjekt" kategori="0" location={this.props.location} > </ArticleView>
        );
    }
}
