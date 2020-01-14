// @flow
import axios, {AxiosPromise} from 'axios';
const url_base = "http://localhost:4000";

export class User
{
    constructor(){
        this.password = "";
        this.email = "";
        this.name = "";
        this.tlf = "";
        this.description = "";
    }
    password: string;
    email: string;
    name: string;
    tlf: string;
    description: string;
}

export class UserService {
    static getUser() : AxiosPromise<User> {
        let url = url_base + "/user";
        let token = localStorage.getItem("token");
        return axios.get(url, {token: token}).then(response => {return response});
    }
    static logIn(email : string, password : string) {
        let url = url_base + "/public/login";
        return axios.post<Object>(url, {"username": email, "password": password}).then(response => {localStorage.setItem("token", response.data.jwt)});
    }

    static newUser(email : string, name : string, password : string, image: string, tlf: string, description: string) {
        let url = url_base + "/public/register/user";
        return axios.post<Object>(url, {"email": email, "name": name, "password": password, "image": image, "tlf": tlf, "description": description}).then(response => {localStorage.setItem("token", response.data.jwt)});
    }

    static newOrganiser(email : string, name : string, password : string, image: string, tlf: string, description: string, address: string, website : string) {
        let url = url_base + "/public/register/organiser";
        return axios.post<Object>(url, {"email": email, "name": name, "password": password, "image": image, "tlf": tlf, "description": description, "address" : address, "website" : website}).then(response => {localStorage.setItem("token", response.data.jwt)});
    }

    static postFile(url: string, data: FormData) {
        console.log(url);
        console.log(data);
        return axios.post(url, data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            // then something maybe
            console.log("Response:");
            console.log(response);
        }).catch((error) => {
            //handle error
            console.log("Error");
            console.log(error);
            // TODO change this alert to component-alert
            // alert('Error when uploading file.');
        });
    }
}

export class Organiser
{
    constructor(organiser_email: string, name: string) {
        this.organiser_email = organiser_email;
        this.name = name;
    }
    organiser_email: string;
    name: string;
    image: string;
    description: string;
    tlf: string;
    website: string;
    address: string;
    password: string;
}