import React from 'react';

const Filterbar = ({ types }) =>
  <div className="small-12 columns">
    <form action="">
      <label className="float-left" htmlFor="select">Sort
        <select id="select" required>
          <option value="" />
          {types.map(option => <option value={option} key={option}>{option}</option>)}
        </select>
      </label>
    </form>
  </div>;

Filterbar.propTypes = {
  types: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
  ]),
};

Filterbar.defaultProps = {
  types: [],
};

export default Filterbar;
