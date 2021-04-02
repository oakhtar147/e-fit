import React from "react";

import FooterLink from "./FooterItem/FooterLink";

const FooterLinks = () => {
  const sites = [
    { site: "Facebook", link: "https://www.facebook.com/" },
    { site: "Instagram", link: "https://www.instagram.com/" },
    { site: "LinkedIn", link: "https://www.linkedin.com/" },
  ];

  const footerLinks = sites.map((site) => (
    <FooterLink key={site.link} link={site.link} site={site.site} />
  ));

  return footerLinks;
};

export default FooterLinks;
