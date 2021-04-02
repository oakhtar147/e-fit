import React from "react";

const FooterLink = (props) => {
  return (
    <li>
      <a href={props.link}>{props.site}</a>
    </li>
  );
};

export default FooterLink;
