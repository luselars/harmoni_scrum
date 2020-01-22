//@flow
import React from 'react';
import { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

type Props = {
  text: string,
  padding: string,
};
class MoreInfo extends Component<Props> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Tooltip
        style={{ paddingLeft: this.props.padding, paddingRight: this.props.padding }}
        placement="top"
        title={this.props.text}
        aria-label="add"
      >
        <i className="fa fa-question-circle-o" aria-hidden="true"></i>
      </Tooltip>
    );
  }
}

export default MoreInfo;
