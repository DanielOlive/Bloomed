import React from 'react';

const ItemOverview = ({ params }) => (
  <div className="item-overview">
    <h1>{ params }</h1>
  </div>
);

ItemOverview.propTypes = {
  params: React.PropTypes.string.isRequired,
};

export default ItemOverview;
