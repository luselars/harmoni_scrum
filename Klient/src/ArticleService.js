// @flow
const axios = require("axios");
var testingUrl = ""; // For testing "http://localhost:8080"

export class Article {
  overskrift: string;
  innhold: string;
  fultInnhold: string;
  bilde: string;
  bildeAlt: string;
  kategori: number;
  viktighet: number;
}

export class Comment {
  innhold: string;
  navn: string;
}

export default class ArticleService {
  static async getArticles(kategori: Number) {
    return axios.get<Article[]>(
      testingUrl + "/Artikler/kategori/" + kategori.toString()
    );
  }

  static async getArticle(artikkelId: Number) {
    return axios.get<Article>(
      testingUrl + "/Artikler/" + artikkelId.toString()
    );
  }

  static async fjernArtikkel(artikkelId: Number) {
    return axios.delete<Article, void>(
      testingUrl + "/Artikler/" + artikkelId.toString()
    );
  }

  static async redigerArtikkel(state: Object) {
    return axios.put<Article, void>(
      testingUrl + "/Artikler/" + state.artikkelId.toString(),
      state
    );
  }

  static async addArticle(state: Object) {
    return axios.post<Article, void>(testingUrl + "/Artikler", state);
  }

  static async getAllComments() {
    return axios.get<Comment[]>(testingUrl + "/Kommentarer/");
  }

  static async sendLikeComment(kommentarId: number) {
    return axios.put<Comment, void>(
      testingUrl + "/Kommentarer/" + kommentarId.toString()
    );
  }

  static async sendLikeArticle(artikkelId: number) {
    return axios.put<number, void>(
      testingUrl + "/Artikler/Like/" + artikkelId.toString()
    );
  }

  static async sendComment(data: Object) {
    return axios.post<Comment, void>(testingUrl + "/Kommentarer", data);
  }
}
