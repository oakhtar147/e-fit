import React from "react";

import styles from "./SideDrawer.module.css";
import NavigationLinks from "components/UI/Navigation/NavigationLinks/NavigationLinks";
import Backdrop from "components/UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
  const sideDrawerClasses = [
    styles.SideDrawer,
    props.showSideDrawer ? styles.Open : styles.Close,
  ].join(" ");

  return (
    <>
      <Backdrop show={props.showSideDrawer} close={props.closeSideDrawer} />
      <div className={sideDrawerClasses} onClick={props.closeSideDrawer}>
        <div>
          <h2>E FIT</h2>
        </div>
        <nav>
          <NavigationLinks />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
