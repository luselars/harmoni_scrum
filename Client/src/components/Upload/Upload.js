//@flow
import React from 'react';
import {Component} from 'react';
import FormData from 'form-data'
import UserService from "../../services/UserService.js";
let path = require('path');


type Props= {}
// TODO fix this so the url is passed as a prop.
const url = "/user/file"; // temp

class Upload extends Component<Props> {
    // Useless constructor just now, will be used when props is introduced.
    constructor(props: any){
        super(props);
    }
    render() {
        return (
            <div>
                <p>Upload file:</p>
                <input accept=".jpg, .jpeg, .png" type="file" id="upload" name="sampleFile"/>
                <button onClick={() => this.publishFile()}>Upload</button>
            </div>
        )
    }
    // }
    // Method to publish the file.
    // Only .pdf, .jpg, .jpeg and .png images are accepted.
    // TODO ALLOW ACCESS CROSS ORIGIN
    publishFile(): void{
        // Fetch the image from the form
        let data = new FormData();
        let element = document.getElementById('upload');
        // Flow-hack to allow the use of .files[0] and .value on the input-element
        /*::
           if (!(element instanceof HTMLInputElement)) {
             throw new Error('element is not of type HTMLInputElement');
           }
       */
        let blob = element.files[0];
        data.append("file" , blob);

        //Checking the file extension, if it is anything other than .pdf, .png, .jpg or .jpeg return an alert
        let fullPath = element.value;
        let ext = path.extname(fullPath);
        if(ext === '.png' || ext === '.jpg' || ext === 'jpeg' || ext === 'pdf') {
            // post image to /images
            // TODO move this to service-thingy
            UserService.postFile(url, data).then(r => console.log(r));
        }
        else {
            // TODO are we using this alert. prob not
            alert("File not uploaded or file extension not supported.");
        }
    }
}

export default Upload;