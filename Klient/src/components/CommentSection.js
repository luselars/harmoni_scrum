import React from "react";
import { Component } from "react";
import ArticleService from "../ArticleService";

export class CommentSection extends Component {
    loadingComments = true;
    state = {
        relevantComments: []
    }
    componentDidMount() {
        this.props.kommentarer.map(comment => {
            if (comment.artikkelId === this.props.artikkelId) {
                this.state.relevantComments.push(comment);
            }
        });
        console.log(this.props.newComment);
        if (this.props.newComment != null) {
            this.state.relevantComments.push(this.props.newComment);
        }
        this.loadingComments = false;
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                {this.loadingComments ? (<div> Loading...</div >) :
                    (<div >
                        {this.state.relevantComments.length === 0 ?
                            (<h4>Ingen kommentarer</h4>) :
                            (<div>
                                <h3>Kommentarer:</h3>
                                {this.state.relevantComments.map(comment => { return (<Comment comment={comment}></Comment>) })}
                            </div>)
                        }
                    </div>)
                }
            </div>)
    }
}

export class Comment extends Component {
    render() {
        var comment = this.props.comment;
        return (
            <div className="card min-w-100">
                <div className="container-fluid">
                    <div>
                        <p className="sm">{comment.innhold}</p>
                    </div>
                    <div className="row ml-2">
                        <p className="sm">Bruker: </p>
                        <p className="sm">{comment.navn}</p>
                        <div className="row ml-auto mr-1">
                            <LikeButtonComment comment={comment}></LikeButtonComment>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

class LikeButtonComment extends Component {
    likeComment(kommentarId) {
        var likes = document.getElementById("kommentarLikes" + kommentarId);
        if (document.getElementById("likeKnapp" + kommentarId).disabled == true) {
            return;
        }
        likes.innerHTML = parseInt(likes.innerHTML) + 1;
        document.getElementById("likeKnapp" + kommentarId).disabled = true;
        localStorage.setItem('comment' + kommentarId, 'true');
        ArticleService.sendLikeComment(kommentarId);
    }

    checkLikedComments() {
        for (var i = 0; i < localStorage.length; i++) {
            var localStorageKey = localStorage.key(i);
            if (localStorageKey == "comment" + this.props.comment.kommentarId) {
                console.log("likeKnapp" + this.props.comment.kommentarId)
                document.getElementById("likeKnapp" + this.props.comment.kommentarId).disabled = true;
            }
        }
    }

    componentDidMount() { this.checkLikedComments() }

    render() {
        return (
            <button className="btn sm bg-success text-white float-md-left" id={"likeKnapp" + this.props.comment.kommentarId} type="button" onClick={() => this.likeComment(this.props.comment.kommentarId)} aria-label="Like">
                <div className="row ml-1 mr-1 mb-0">
                    <p className="sm mb-0">Likes: </p>
                    <p className="sm mb-0" id={"kommentarLikes" + this.props.comment.kommentarId}>{this.props.comment.likes}</p>
                </div>
            </button>
        )
    }
}