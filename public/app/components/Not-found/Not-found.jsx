import React, { Component } from 'react';

class NotFound extends Component {
  componentWillMount() {
    this.removeSlash();
  }

  removeSlash() {
    const index = this.props.location.pathname;
    const path = index.slice(index.lastIndexOf('/') + 1);
    this.setState({ path });
  }

  render() {
    return (
      <div>
        <h2>{this.state.path} Following page is not found:</h2>
      </div>
    );
  }
}

NotFound.propTypes = {
  location: React.PropTypes.shape({ pathname: React.PropTypes.string })
};

NotFound.defaultProps = { location: [] };

export default NotFound;
