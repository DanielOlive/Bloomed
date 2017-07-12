import React, { Component, PropTypes } from 'react';
//import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import { Filterbar } from '../../components/index';
// import loadDirectory from '../../lib/grow-your-own-service';
import { directoryFetchData } from '../../actions/grow-your-own-actions';

class GrowYourOwn extends Component {
  componentDidMount() {
    this.props.fetchData('http://localhost:4000/directory');
  }

  render() {
    const { directory } = this.props;
    return (
      <div className="row">
        {directory.map(
          item /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/ => (
            <div className="small-6 columns" key={item._id}>
              <div>{item.type}</div>
              <Link to={{ pathname: `/growyourown/${item.name}` }}>
                <h3>{item.name}</h3>
              </Link>
              <p>{item.varieties[0].description}</p>
            </div>
          )
        )}
      </div>
    );
  }
}

GrowYourOwn.defaultProps = { directory: [] };

// prettier-ignore
/* GrowYourOwn.propTypes = {
  // eslint-disable-line react/forbid-prop-types
  directory: PropTypes.array
};*/
// wraps dispatch to create nicer functions to call within our component
/* const mapDispatchToProps = dispatch => ({
 dispatch: dispatch,
 startup: () => dispatch(StartupActions.startup())
 });*/
const mapStateToProps = state => {
  return {
    directory: state.directory,
    hasError: state.directoryHasErrored,
    isLoading: state.directoryIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return { fetchData: url => dispatch(directoryFetchData(url)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(GrowYourOwn);
