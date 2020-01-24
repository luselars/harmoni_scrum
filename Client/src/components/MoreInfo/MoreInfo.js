//@flow
import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

type Props = {
  text: string,
  padding: string,
};

/**
 * Component to display a question mark that can be hovered to show more information.
 */
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
        <i className="fa fa-question-circle-o" aria-hidden="true" />
      </Tooltip>
    );
  }
}

export default MoreInfo;
