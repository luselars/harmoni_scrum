import React from "react";
import { Component } from "react";
import { CommentSection, Comment } from "./CommentSection.js";
import ArticleService from "../ArticleService";

export class ArtikkelModalContainer extends Component {
  state = {
    kommentarer: [],
    artikkeler: this.props.artikkeler
  };
  componentDidMount() {
    this.getComments(this.props.artikkelId);
  }

  async getComments(artikkelId) {
    ArticleService.getAllComments()
      .then(data => {
        this.setState({ kommentarer: data.data });
        console.log(data.data);
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  render() {
    return this.state.artikkeler.map(artikkel => (
      <ArtikkelModal
        artikkel={artikkel}
        kommentarer={this.state.kommentarer}
      ></ArtikkelModal>
    ));
  }
}

class ArtikkelModal extends Component {
  state = {
    artikkel: this.props.artikkel,
    kommentarer: this.props.kommentarer
  };

  saveComment(artikkelId) {
    var kommentarText = document.getElementById("nyComment" + artikkelId).value;
    if (kommentarText != "") {
      const data = {
        artikkelId: artikkelId,
        innhold: kommentarText
      };
      ArticleService.sendComment(data)
        .then(function(response) {
          alert("kommentar sendt!");
          var newComment = {
            innhold: kommentarText,
            navn: "Anonym",
            kommentarId: response.data.insertId
          };
          window.location.reload();
          this.setState({ newComment: newComment });
          return response;
        })
        .catch(function(error) {
          return error;
        });
    }
  }

  likeArtikkel(artikkelId) {
    var likes = document.getElementById("artikkelLikes" + artikkelId);
    if (
      document.getElementById("articleLikeButton" + artikkelId).disabled == true
    ) {
      return;
    }
    likes.innerHTML = "Likes: " + (parseInt(likes.innerHTML.split(" ")[1]) + 1);
    document.getElementById("articleLikeButton" + artikkelId).disabled = true;
    localStorage.setItem("article" + artikkelId, "true");
    ArticleService.sendLikeArticle(artikkelId);
  }

  checkIfArticleAlreadyLiked(artikkelId) {
    for (var i = 0; i < localStorage.length; i++) {
      var localStorageKey = localStorage.key(i);
      if (localStorageKey == "article" + artikkelId) {
        console.log("articleLikeButton" + artikkelId);
        document.getElementById(
          "articleLikeButton" + artikkelId
        ).disabled = true;
      }
    }
  }

  componentDidMount() {
    this.checkIfArticleAlreadyLiked(this.props.artikkel.artikkelId);
  }

  render() {
    var artikkel = this.props.artikkel;
    var kommentarer = this.props.kommentarer;
    console.log(this.state.newComment);
    return (
      <div
        className="modal fade"
        id={"artikkel" + artikkel.artikkelId}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {artikkel.overskrift}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-header">
              <h5 id={"artikkelLikes" + artikkel.artikkelId}>
                Likes: {artikkel.likes}
              </h5>
              <button
                id={"articleLikeButton" + artikkel.artikkelId}
                type="button"
                className="btn bg-success text-white"
                aria-label="Like"
                onClick={() => this.likeArtikkel(artikkel.artikkelId)}
              >
                Like
              </button>
            </div>
            <div className="modal-body pb-0">
              <img
                className="img-thumbnail rounded"
                src={artikkel.bilde}
                alt={artikkel.bildeAlt}
              />
              <p className="mb-0">På bildet: {artikkel.bildeAlt}</p>
            </div>
            <div className="modal-body">{artikkel.fultInnhold}</div>
            <div id="commentSection" className="modal-footer">
              {kommentarer.length === 0 ? (
                <div className="mr-auto">Ingen kommentarer</div>
              ) : (
                <div className="mr-auto">
                  <CommentSection
                    newComment={this.state.newComment}
                    id={"CommentSection" + artikkel.artikkelId}
                    artikkelId={artikkel.artikkelId}
                    kommentarer={kommentarer}
                  ></CommentSection>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <input
                className="form-control"
                placeholder="Din kommentar"
                id={"nyComment" + artikkel.artikkelId}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.saveComment(artikkel.artikkelId)}
              >
                Lagre
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Lukk
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
