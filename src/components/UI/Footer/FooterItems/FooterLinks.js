import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FooterLink from "./FooterItem/FooterLink";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const FooterLinks = () => {
  const sites = [
    {
      siteLogo: <FontAwesomeIcon icon={faFacebook} size="2x" />,
      link: "https://www.facebook.com/",
    },
    {
      siteLogo: <FontAwesomeIcon icon={faInstagram} size="2x" />,
      link: "https://www.instagram.com/",
    },
    {
      siteLogo: <FontAwesomeIcon icon={faLinkedin} size="2x" />,
      link: "https://www.linkedin.com/",
    },
  ];

  const footerLinks = sites.map((site) => (
    <FooterLink key={site.link} {...site} />
  ));

  return footerLinks;
};

export default FooterLinks;
