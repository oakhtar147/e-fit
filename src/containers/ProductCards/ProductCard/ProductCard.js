import React from "react";

import styles from "./ProductCard.module.css";
import Button from "components/UI/Button/Button";

const ProductCard = (props) => {
  const { product } = props;

  return (
    <div className={styles.ProductCard}>
      <img src={product.image} alt={`${product.name}`} />
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.inStock ? "In Stock" : "Out of Stock"}</p>
      {product.sizes && <span>Sizes: {product.sizes.join(" ")}</span>}

      <Button
        variant="success"
        disabled={!product.inStock}
        onClick={() => props.history.push(`${props.category}/${product.id}`)}
      >
        Buy
      </Button>
    </div>
  );
};

export default ProductCard;
