import React from 'react';
import { Link } from 'react-router-dom';
import { Filterbar } from '../../components/index';
import loadDirectory from '../../lib/grow-your-own-service';

class GrowYourOwn extends React.Component {
  // ...
  constructor() {
    super();
    this.state = { showGrid: false, directory: [], types: [] };
  }

  componentDidMount() {
    loadDirectory().then(data => {
      const directory = data.data;
      const types = directory
        .map(item => item.type)
        .filter((elem, index, self) => index === self.indexOf(elem));

      this.setState({ directory, types });
    });
  }

  render() {
    return (
      <div className="row">
        <Filterbar types={this.state.types} />
        {this.state.directory.map(
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

export default GrowYourOwn;
