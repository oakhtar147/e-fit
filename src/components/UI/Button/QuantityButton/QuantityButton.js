import React from "react";

import styles from "./QuantityButton.module.css";

const QuantityButton = (props) => {
  const buttonText = {
    increment: "+",
    decrement: "-",
  };

  const classes = [styles.QuantityButton, styles[props.mode]].join(" ");

  return (
    <button className={classes} {...props}>
      {buttonText[props.mode]}
    </button>
  );
};

export default QuantityButton;
