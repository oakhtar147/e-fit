import React, { useState } from "react";

import Navbar from "components/UI/Navigation/Navbar/Navbar";
import Footer from "components/UI/Footer/Footer";

import styles from "./Layout.module.css";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const handleToggleSideDrawer = () => {
    setShowSideDrawer((prevState) => !prevState);
  };

  const closeSideDrawer = () => {
    setShowSideDrawer(false);
  };

  return (
    <div className={styles.Layout}>
      <Navbar
        showSideDrawer={showSideDrawer}
        toggleSideDrawer={handleToggleSideDrawer}
        closeSideDrawer={closeSideDrawer}
      />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
