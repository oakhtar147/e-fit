import React from "react";

import styles from "./Footer.module.css";
import FooterItems from "./FooterItems/FooterLinks";

const Footer = (props) => {
  return (
    <footer className={styles.Footer}>
      <p>&copy; 2021, E-Fit, Inc. or its affiliates. All rights reserved.</p>
      <ul>
        <FooterItems />
      </ul>
    </footer>
  );
};

export default Footer;
