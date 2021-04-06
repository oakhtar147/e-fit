import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { TextField } from "@material-ui/core";

import styles from "./Login.module.css";
import Title from "components/UI/Title/Title";
import Button from "components/UI/Button/Button";
import { userAuthAsync } from "store/actions/";

const Login = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const InputField = ({ field, ...props }) => (
    <TextField {...props} {...field} />
  );

  const authToggler = (event) => {
    event.preventDefault();
    setIsLogin(!isLogin);
  };

  const authSubmit = (values, setSubmitting) => {
    const { email, password } = values;
    props.authenticate(isLogin, email, password);
    setSubmitting(false);
  };

  return (
    <div className={styles.Login}>
      <Title>{isLogin ? "Log in " : "Sign up"}</Title>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting }) =>
          authSubmit(values, setSubmitting)
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              type="email"
              placeholder="john@doe.com"
              name="email"
              variant="outlined"
              required
              fullWidth
              margin="normal"
              component={InputField}
            />
            <Field
              type="password"
              placeholder="Password"
              name="password"
              variant="outlined"
              required
              fullWidth
              margin="normal"
              component={InputField}
            />
            <Button variant="success" type="submit" disabled={isSubmitting}>
              {isLogin ? "Log in" : "Sign up"}
            </Button>
            <p>
              {isLogin ? "Don't" : "Already"} have an account?{" "}
              <a href="/" onClick={authToggler}>
                {isLogin ? "Sign up" : "Login"}
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (isLogin, email, password) =>
      dispatch(userAuthAsync(isLogin, email, password)),
  };
};

export default connect(null, mapDispatchToProps)(Login);

// TODOS:
// SET AUTH REDIRECT TO HOME PAGE FOR NOW
