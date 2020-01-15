import React from 'react';

type Props = {
  fileName: string,
};
class DownloadFile extends React.Component<Props> {
  constructor(props) {
    super(props);
  }
  downloadEmployeeData() {
    let link = document.createElement('a');
    link.href = 'http://localhost:4000/user/file/' + this.props.fileName;
    link.download = 'file.pdf';
    link.target = '_blank';
    link.click();
  }
  render() {
    return (
      <div id="container">
        <p
          style={{ cursor: 'pointer' }}
          onClick={() => {
            this.downloadEmployeeData();
          }}
        >
          {this.props.fileName}
        </p>
      </div>
    );
  }
}

export default DownloadFile;
