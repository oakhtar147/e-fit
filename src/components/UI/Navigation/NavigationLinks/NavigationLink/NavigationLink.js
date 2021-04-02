import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavigationLink.module.css";

const NavigationLink = (props) => {
  return (
    <li className={styles.NavigationLink}>
      <NavLink to={props.route} exact activeClassName={styles.activeLink}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavigationLink;
