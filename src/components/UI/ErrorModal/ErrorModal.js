import React from "react";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Backdrop from "../Backdrop/Backdrop";

import styles from "./ErrorModal.module.css";

const Modal = (props) => {
  return (
    <>
      <Backdrop show={props.show} close={props.closeModal} />
      <div
        className={styles.Modal}
        style={{
          transform: props.show ? "scale(1, 1)" : `scale(0, 0)`,
          transition: "transform 300ms ease-in",
          opacity: props.show ? "1" : "0",
        }}
      >
        <div className={styles.Red}>
          <FontAwesomeIcon
            icon={faExclamationCircle}
            size="5x"
            inverse
            className={styles.Exclamation}
          />
        </div>
        {props.children}
      </div>
    </>
  );
};

export default Modal;
