import React from "react";
import { connect } from "react-redux";

import NavigationLink from "./NavigationLink/NavigationLink";

const NavigationLinks = ({ isAuthenticated }) => {
  const logOutRoute = isAuthenticated && (
    <NavigationLink route="/logout">Log out</NavigationLink>
  );
  const logInRoute = !isAuthenticated && (
    <NavigationLink route="/auth">Log in</NavigationLink>
  );

  return (
    <>
      <NavigationLink route="/">Home</NavigationLink>
      {isAuthenticated && (
        <NavigationLink route="/cart">My Cart</NavigationLink>
      )}
      {logInRoute || logOutRoute}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

export default connect(mapStateToProps)(NavigationLinks);
