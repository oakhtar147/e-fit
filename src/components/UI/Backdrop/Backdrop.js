import React from "react";

import styles from "./Backdrop.module.css";

const Backdrop = (props) => {
  return (
    props.show && <div onClick={props.close} className={styles.Backdrop}></div>
  );
};

export default Backdrop;
