//@flow
import React from 'react';
import {Component} from 'react';
import FormData from 'form-data'
import UserService from "../../services/UserService.js";
import {string} from "prop-types";
let path = require('path');

type Props = {
    accept: string;
}
class Upload extends Component<Props> {
    // Useless constructor just now, will be used when props is introduced.
    constructor(props: any){
        super(props);
    }
    render() {
        return (
            <div>
                <label className="custom-file-upload" style={{cursor: 'pointer'}}>
                    <input style={{display:'none'}} accept={this.props.accept} type="file" id="upload" name="recfile" onChange={e => this.changeFileName(e)}/>
                    <i className="fa fa-cloud-upload"></i> Bla igjennom...
                </label>
                <p id={"fileName"}></p>
            </div>
        )
    }
    changeFileName(e : any) {
        let files = e.target.files;
        let name = files[0].name;
        document.getElementById('fileName').innerHTML = name;
    }
    // Method to publish the file.
    // Only .pdf, .jpg, .jpeg and .png images are accepted.
    // TODO remove this method sometimes later in the project when it is not needed as an example
    publishFile(): void {
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
        data.append("recfile" , blob);

        //Checking the file extension, if it is anything other than .pdf, .png, .jpg or .jpeg return an alert
        let fullPath = element.value;
        let ext = path.extname(fullPath);
        if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.pdf') {
            // post file to /files
            // UserService.postFile(this.props.url, data).then(r => console.log(r));
            UserService.postFile("http://localhost:4000/user/file", data).then(r => console.log(r));
        }
        else {
            // TODO are we using this alert. prob not
            alert("File not uploaded or file extension not supported.");
        }
    }
}

export default Upload;