import React from "react";

import NavigationLink from "./NavigationLink/NavigationLink";

const NavigationLinks = (props) => {
  return (
    <>
      <NavigationLink route="/">Home</NavigationLink>
      <NavigationLink route="/cart">My Cart</NavigationLink>
      <NavigationLink route="/auth">Sign in</NavigationLink>
    </>
  );
};

export default NavigationLinks;
