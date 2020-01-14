import { React, Component } from 'react';
import Dropzone from 'react-dropzone';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';

class UploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesPreview: [],
      filesToBeSent: [],
      printcount: 10,
    };
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
              <a href="#">
                <FontIcon
                  className="material-icons customstyle"
                  color={blue500}
                  styles={{ top: 10 }}
                >
                  clear
                </FontIcon>
              </a>
            </MuiThemeProvider>
          </div>,
        );
      }
      this.setState({ filesToBeSent, filesPreview });
    } else {
      alert('You have reached the limit of files');
    }
  }

  render() {
    return (
      <div className="dropzone">
        <Dropzone onDrop={files => this.onDrop(files)}>
          <div>try drop files here</div>
        </Dropzone>
        <div>
          Files:
          {this.state.filesPreview}
        </div>
      </div>
    );
  }
}
export default UploadScreen;
