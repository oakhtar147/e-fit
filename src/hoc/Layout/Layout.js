import React from "react";

import Navbar from "components/UI/Navigation/Navbar/Navbar";
import Footer from "components/UI/Footer/Footer";

import styles from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={styles.Layout}>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
