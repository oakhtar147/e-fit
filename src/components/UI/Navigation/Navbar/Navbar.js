import React from "react";

import styles from "./Navbar.module.css";
import NavigationLinks from "../NavigationLinks/NavigationLinks";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import SideDrawer from "../SideDrawer/SideDrawer";

const Navbar = (props) => {
  return (
    <header className={styles.Navbar}>
      <nav>
        <DrawerToggle toggle={props.toggleSideDrawer} />
        <SideDrawer
          showSideDrawer={props.showSideDrawer}
          closeSideDrawer={props.closeSideDrawer}
        />
        <ul>
          <NavigationLinks />
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
