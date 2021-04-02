import React from "react";

import styles from "./Navbar.module.css";
import NavigationLinks from "../NavigationLinks/NavigationLinks";

const Navbar = (props) => {
  return (
    <header className={styles.Navbar}>
      <nav>
        <ul>
          <NavigationLinks />
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
