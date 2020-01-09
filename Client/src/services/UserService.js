// @flow
import axios from'axios';
// let testingUrl = ""; // For testing "http://localhost:8080"
const url_base = "http://localhost:4000";

export default class UserService {
    static test(url: string) {
        return axios.post(url).then(response => response.data);
    }
    // TODO auth
    static getFile(url: string, file_id: string) {
        url = url_base + url + "/" + file_id;
        return axios.get(url).then(response => response.data);
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
