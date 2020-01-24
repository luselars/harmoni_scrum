//@flow
import React from 'react';

type Props = {
  fileName: string,
};

/**Component for downloading files for organisers, users and personnel
 */
class DownloadFile extends React.Component<Props> {
  /**Gets file from database and contains a link for users to download the file
   */
  downloadData() {
    let link = document.createElement('a');
    link.href = 'http://localhost:4000/public/file/' + this.props.fileName;
    link.download = 'file.pdf';
    link.target = '_blank';
    link.click();
  }
  render() {
    return (
      <div id="container">
        <span
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => {
            this.downloadData();
          }}
        >
          {this.props.fileName}
        </span>
      </div>
    );
  }
}

export default DownloadFile;
