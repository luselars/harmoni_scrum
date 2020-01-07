import { Component } from "react";
import { ArticleView } from "../components/ArticleView.js";
import React from "react";

export default class News extends Component {
    render() {
        return (
            <ArticleView title="Nyheter" kategori="2" location={this.props.location}> </ArticleView>
        );
    }
}
