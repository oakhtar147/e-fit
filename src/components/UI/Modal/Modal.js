import React from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./Modal.module.css";
import modalTransition from "./transition.module.css";
import Backdrop from "components/UI/Backdrop/Backdrop";

const Modal = (props) => {
  console.log(props.show);
  return (
    <>
      <Backdrop show={props.show} close={props.closeModal} />
      <CSSTransition in={props.show} timeout={300} classNames={modalTransition}>
        <div className={styles.Modal}>{props.children}</div>
      </CSSTransition>
    </>
  );
};

export default Modal;
