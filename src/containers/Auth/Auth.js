import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import * as yup from "yup";

import styles from "./Auth.module.css";
import Title from "components/UI/Title/Title";
import Button from "components/UI/Button/Button";
import { userAuthAsync } from "store/actions/";

const Auth = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const { state } = props.location;
  const shouldFlashRedirectMessage = state && state.redirected;

  const redirectFlashMessage = shouldFlashRedirectMessage && (
    <Alert severity="error" style={{ margin: "10px auto", width: "50%" }}>
      Please authenticate first!
    </Alert>
  );

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
    props.history.replace(props.authRedirect);
  };

  const validationSchema = yup
    .object()
    .shape({
      email: yup.string().email("Invalid Email").required("Email is required"),
      ...(!isLogin && {
        password: yup
          .string()
          .min(8, "Password must be at least 8 characters long")
          .max(25, "Password cannot be longer than 25 characters")
          .matches("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])", {
            message:
              "Password must contain a lowercase letter, a digit and a special character",
          })
          .required("Password is required"),
      }),
    })
    .required();

  return (
    <div className={styles.Login}>
      <Title>{isLogin ? "Log in " : "Sign up"}</Title>
      {redirectFlashMessage}
      <Formik
        initialValues={{
          email: "osama@osama.com",
          password: "osamaosama1!",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          authSubmit(values, setSubmitting)
        }
      >
        {({ errors, isSubmitting }) => (
          <Form>
            <Field
              type="email"
              placeholder="john@doe.com"
              name="email"
              variant="outlined"
              label="Email Address"
              required
              margin="normal"
              component={InputField}
              error={errors.email}
              helperText={errors.email}
            />
            <Field
              type="password"
              name="password"
              variant="outlined"
              label="Password"
              required
              fullWidth
              margin="normal"
              component={InputField}
              error={errors.password}
              helperText={errors.password}
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

const mapStateToProps = (state) => {
  return {
    authRedirect: state.auth.authRedirect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (isLogin, email, password) =>
      dispatch(userAuthAsync(isLogin, email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
