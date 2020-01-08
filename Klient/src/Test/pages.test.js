import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import AddArticle from "../pages/addArticle";
import Home from "../pages/index";
import EditArticle from "../pages/editArticle";
import RemoveArticle from "../pages/removeArticle";
import Sport from "../pages/sport";
import News from "../pages/nyheter";
import Culture from "../pages/kultur";

it("EditArticle renders without crashing", () => {
  const div = document.createElement("div");
  <HashRouter>
    ReactDOM.render(
    <EditArticle />, div);
  </HashRouter>;
  ReactDOM.unmountComponentAtNode(div);
});

it("Index page renders without crashing", () => {
  const div = document.createElement("div");
  <HashRouter>
    ReactDOM.render(
    <Home />, div);
  </HashRouter>;
  ReactDOM.unmountComponentAtNode(div);
});

it("Culture page renders without crashing", () => {
  const div = document.createElement("div");
  <HashRouter>
    ReactDOM.render(
    <Culture />, div);
  </HashRouter>;
  ReactDOM.unmountComponentAtNode(div);
});

it("Sport page renders without crashing", () => {
  const div = document.createElement("div");
  <HashRouter>
    ReactDOM.render(
    <Sport />, div);
  </HashRouter>;
  ReactDOM.unmountComponentAtNode(div);
});

it("News page renders without crashing", () => {
  const div = document.createElement("div");
  <HashRouter>
    ReactDOM.render(
    <News />, div);
  </HashRouter>;
  ReactDOM.unmountComponentAtNode(div);
});

it("Add article page renders without crashing", () => {
  const div = document.createElement("div");
  <HashRouter>
    ReactDOM.render(
    <AddArticle />, div);
  </HashRouter>;
  ReactDOM.unmountComponentAtNode(div);
});

it("Remove article page renders without crashing", () => {
  const div = document.createElement("div");
  <HashRouter>
    ReactDOM.render(
    <RemoveArticle />, div);
  </HashRouter>;
  ReactDOM.unmountComponentAtNode(div);
});
