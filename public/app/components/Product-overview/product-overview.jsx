import React from 'react';

const ProductOverview = ({ params }) => (
  <div className="item-overview">
    <h1>{params}</h1>
  </div>
);

ProductOverview.propTypes = { params: React.PropTypes.string.isRequired };

export default ProductOverview;
