import React from "react";

import Title from "components/UI/Title/Title";
import ProductCards from "containers/ProductCards/ProductCards";

const Browse = (props) => {
  return (
    <>
      <Title>{props.category}</Title>
      <ProductCards {...props} category={props.category} />
    </>
  );
};

export default Browse;
