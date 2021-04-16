import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import {
  FormControl,
  makeStyles,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import * as yup from "yup";

import styles from "./Checkout.module.css";
import Title from "components/UI/Title/Title";
import Button from "components/UI/Button/Button";
import Spinner from "components/UI/Spinner/Spinner";
import { orderCartProductsAsync } from "store/actions/";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Checkout = ({ orderCartProducts }) => {
  const formStyles = useStyles();

  const InputField = ({ field, ...props }) => (
    <TextField {...props} {...field} />
  );

  const DropDown = (props) => {
    const { field, options } = props;
    const dropDownOptions = options.map((opt) => (
      <MenuItem key={opt} value={opt}>
        {opt}
      </MenuItem>
    ));
    return (
      <Select {...props} {...field}>
        {dropDownOptions}
      </Select>
    );
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Please provide a first name"),
    lastName: yup.string().required("Please provide a last name"),
    shippingAddress: yup.string().required("Please provide a shipping address"),
    city: yup.string().required("Please provide a city"),
    zipCode: yup
      .string()
      .length(5, "Zip code must be 5 digits long")
      .matches(/^[0-9]*$/, "Zip code must be a number")
      .required("Please provide a zip code"),
    paymentMethod: yup.string().matches(/(Debit Card|EasyPaisa|JazzCash)/),
  });

  const handleOrder = () => {
    orderCartProducts();
  };

  return (
    <div className={styles.Checkout}>
      <Title>Checkout</Title>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          shippingAddress: "",
          city: "",
          zipCode: "",
          paymentMethod: "Debit Card",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleOrder();
          setSubmitting(true);
        }}
      >
        {({ errors, isSubmitting }) => (
          <Form>
            <Field
              placeholder="John"
              name="firstName"
              spellCheck={false}
              variant="outlined"
              label="First Name"
              required
              margin="normal"
              component={InputField}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <Field
              placeholder="Doe"
              name="lastName"
              spellCheck={false}
              variant="outlined"
              label="Last Name"
              required
              margin="normal"
              component={InputField}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <Field
              placeholder="Shipping Address"
              name="shippingAddress"
              variant="outlined"
              label="Shipping Address"
              required
              margin="normal"
              component={InputField}
              error={!!errors.shippingAddress}
              helperText={errors.shippingAddress}
            />
            <Field
              placeholder="City"
              name="city"
              variant="outlined"
              label="City"
              required
              margin="normal"
              component={InputField}
              error={!!errors.city}
              helperText={errors.city}
            />
            <Field
              type="number"
              placeholder="Zip Code"
              name="zipCode"
              variant="outlined"
              label="Zip Code"
              required
              margin="normal"
              component={InputField}
              error={!!errors.zipCode}
              helperText={errors.zipCode}
            />
            <FormControl variant="filled" className={formStyles.formControl}>
              <InputLabel id="paymentMethod">Payment Method</InputLabel>
              <Field
                labelId="paymentMethod"
                name="paymentMethod"
                required
                options={["Debit Card", "EasyPaisa", "JazzCash"]}
                component={DropDown}
                defaultValue="Debit Card"
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                  getContentAnchorEl: null,
                }}
              />
            </FormControl>
            <Button type="submit" variant="success" disabled={isSubmitting}>
              Order Now
            </Button>
            {isSubmitting && <Spinner />}
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.cart.cartProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderCartProducts: () => dispatch(orderCartProductsAsync()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
