import React from "react";

import styles from "./CategoryCards.module.css";
import CategoryCard from "./CategoryCard/CategoryCard";
import footwearCard from "assets/categories/footwear.jpg";
import supplementsCard from "assets/categories/supplements.jpg";
import performanceCard from "assets/categories/performance.jpg";

const CategoryCards = (props) => {
  const categories = {
    footwear: footwearCard,
    "performance kits": performanceCard,
    supplements: supplementsCard,
  };

  const categoryCards = Object.keys(categories).map((cat, idx) => (
    <CategoryCard
      key={idx}
      category={cat}
      card={categories[cat]}
      productsLink={`products/${cat.split(" ")[0]}`}
    />
  ));

  return <div className={styles.CategoryCards}>{categoryCards}</div>;
};

export default CategoryCards;
