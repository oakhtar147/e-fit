import React from "react";

import styles from "./Title.module.css";

const Title = (props) => (
  <div className={styles.Title}>
    <h1>{props.children}</h1>
    <hr />
  </div>
);

export default Title;
