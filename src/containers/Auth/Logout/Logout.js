import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import { userLogout } from "store/actions/";

const Logout = ({ userLogout }) => {
  useEffect(() => {
    userLogout();
  });

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogout: () => dispatch(userLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
