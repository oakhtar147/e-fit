import React from "react";

import styles from "./Button.module.css";

const Button = (props) => {
  const classes = [styles.Button, styles[props.variant]];

  return (
    <button className={classes.join(" ")} {...props} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
