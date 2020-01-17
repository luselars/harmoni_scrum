{
  /*import { React, Component } from 'react';
import Dropzone from 'react-dropzone';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

let request = require('superagent');
let apiBaseUrl = require('path');


class UploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesPreview: [],
      filesToBeSent: [],
      draweropen: false,
      printcount: 10,
      message: '',
      buttonDisabled: false
    };
  }

  handleCloseClick(event, index) {
    let filesToBeSent = this.state.filesToBeSent;
    filesToBeSent.splice(index, 1);
    let filesPreview = [];
    for(var i in filesToBeSent) {
      filesPreview.push(<div>
        {filesToBeSent[i][0].name}
        <MuiThemeProvider>
          <a href="#"><FontIcon 
          className="material-icons customstye"
          color={blue500}
          onClick={(event) => this.handleCloseClick(event,i)}>
            clear
          </FontIcon></a>
        </MuiThemeProvider>
      </div>
      )
    }
    this.setState({filesToBeSent, filesPreview});
  }

  onDrop(acceptedFiles, rejectedFiles) {
    let filesToBeSent = this.state.filesToBeSent;
    if (filesToBeSent.length < this.state.printcount) {
      filesToBeSent.push(acceptedFiles);
      let filesPreview = [];
      for (var i in filesToBeSent) {
        filesPreview.push(
          <div>
            {filesToBeSent[i][0].name}
            <MuiThemeProvider>
              <a href="#"><FontIcon
                  className="material-icons customstyle"
                  color={blue500}
                  styles={{ top: 10 }}
                  onClick={(event) => this.handleCloseClick(event, i)}>
                  clear</FontIcon></a>
            </MuiThemeProvider>
          </div>
        )
      }
      this.setState({ filesToBeSent, filesPreview });
    } else {
      alert('You have reached the limit of files');
    }
  }

  handleClick(event) {
    this.setState({message: "Please wait for your files", buttonDisabled: true})
    let self = this;
    if(this.state.filesToBeSent.length > 0) {
      let filesArray = this.state.filesToBeSent;
      let req = request.post(apiBaseUrl + 'fileprint');
      for(let i in filesArray) {
        req.attach(filesArray[i][0].name, filesArray[i][0])
      }
      req.end(function(err, res) {
        if(err) {
          console.log('error handleClick');
        }
        console.log('res', res);
        self.setState({message: '', buttonDisabled: false, filesToBeSent: [], filesPreview: []});
        alert("Completed")
      });
    } else {
      alert("Please upload some files first");
    }
  }


  //toggleDrawer(event) {
    //this.setState({draweropen: !this.state.draweropen})
  //}

  //handleDivClick(event) {
  //  if(this.state.draweropen) {
  //    this.setState({draweropen: false})
  //  }
  //}

  render() {
    return (
      <div className="dropzone">
        <center>
          <div>
            You can upload up to {this.state.printcount} files at a time
          </div>
          <Dropzone onDrop={files => this.onDrop(files)}>
          <div>try drop files here</div>
        </Dropzone>

        <div>
          Files:
          {this.state.filesPreview}
        </div>
        </center>
        <div>
          {this.state.message}
        </div>
        <MuiThemeProvider>
           <RaisedButton disabled={this.state.buttonDisabled} label="Upload files" primary={true} onClick={(event) => this.handleClick(event)}/>
      </MuiThemeProvider>
      </div>
    );
  }
}
export default UploadScreen;


*/
}
