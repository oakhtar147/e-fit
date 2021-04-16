import React, { useEffect } from "react";
import { connect } from "react-redux";

import styles from "./Home.module.css";
import CategoryCards from "components/UI/CategoryCards/CategoryCards";
import { clearProducts, clearCart } from "store/actions/";

const Home = (props) => {
  const { clearProducts, clearCart } = props;
  const { pathname, hash: id } = props.location;

  useEffect(() => {
    clearProducts();
    clearCart();
  }, [clearProducts, clearCart]);

  useEffect(() => {
    if (id === "") {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <div className={styles.Home}>
      <section className={styles.imageContainer}>
        <h1>
          Reach Your <span>Fitness</span> Goals!
        </h1>
        <p>
          The best fitness gear and supplements to keep you at the top of your
          game!
        </p>
      </section>
      <section id="#browse">
        <h2>Browse by Category</h2>
        <CategoryCards />
      </section>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearProducts: () => dispatch(clearProducts()),
    clearCart: () => dispatch(clearCart()),
  };
};

export default connect(null, mapDispatchToProps)(Home);
