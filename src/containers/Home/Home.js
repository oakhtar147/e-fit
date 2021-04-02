import React, { useEffect } from "react";
import { connect } from "react-redux";

import styles from "./Home.module.css";
import CategoryCards from "components/UI/CategoryCards/CategoryCards";
import { clearProducts } from "store/actions/product";

const Home = ({ clearProducts }) => {
  useEffect(() => {
    clearProducts();
  }, [clearProducts]);

  return (
    <div className={styles.Home}>
      <div className={styles.imageContainer}>
        <h1>
          Reach Your <span>Fitness</span> Goals!
        </h1>
        <p>
          The best fitness gear and supplements to keep you at the top of your
          game!
        </p>
      </div>
      <section>
        <h2>Browse by Category</h2>
        <CategoryCards />
      </section>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearProducts: () => dispatch(clearProducts()),
  };
};

export default connect(null, mapDispatchToProps)(Home);
