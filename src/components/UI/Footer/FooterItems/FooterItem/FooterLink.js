import React from "react";

const FooterLink = (props) => {
  return (
    <li>
      <a href={props.link}>{props.siteLogo}</a>
    </li>
  );
};

export default FooterLink;
