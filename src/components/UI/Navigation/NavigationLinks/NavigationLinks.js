import React from "react";
import { connect } from "react-redux";

import styles from "./NavigationLinks.module.css";
import NavigationLink from "./NavigationLink/NavigationLink";

const NavigationLinks = ({ isAuthenticated }) => {
  const logOutRoute = isAuthenticated && (
    <NavigationLink route="/logout">Log out</NavigationLink>
  );
  const logInRoute = !isAuthenticated && (
    <NavigationLink route="/auth">Log in</NavigationLink>
  );

  return (
    <div className={styles.NavigationLinks}>
      <NavigationLink route="/">Home</NavigationLink>
      {isAuthenticated && (
        <NavigationLink route="/cart">My Cart</NavigationLink>
      )}
      {logInRoute || logOutRoute}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

export default connect(mapStateToProps)(NavigationLinks);
