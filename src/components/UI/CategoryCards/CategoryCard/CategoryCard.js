import React from "react";
import { Link } from "react-router-dom";

import styles from "./CategoryCard.module.css";

const CategoryCard = (props) => {
  return (
    <div className={styles.CategoryCard}>
      <Link to={props.productsLink}>
        <img src={props.card} alt="card" />
      </Link>
      <h3>{props.category}</h3>
    </div>
  );
};

export default CategoryCard;
