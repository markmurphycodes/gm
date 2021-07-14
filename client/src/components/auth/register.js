import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { TextField, Button, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { registerSession } from "../../store/actions/session_actions";
import { registerUser } from "../../store/actions/user_actions";

const Register = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      alias: "",
      pub_key: "",
      session_length: 0,
      session_type: "exclusive"
    },
    validationSchema: Yup.object({
      alias: Yup.string()
        .required("This is a required field."),
      pub_key: Yup.string().required("This is a required field."),
      session_length: Yup.number().required("Must include session length"),
      session_type: Yup.string().required("Must include session type.")
    }),
    onSubmit: (values, { resetForm }) => {
      // TODO client-side encryption

      let user = registerUser({
        alias: values.alias,
        pub_key: values.pub_key
      })

      dispatch(registerUser(user));
      dispatch(registerSession(values));
      resetForm();
    },
  });

  const formErrors = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : null,
  });

  return (
    <form className="mt-3" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <TextField
          style={{ width: "100%" }}
          name="alias"
          label="alias"
          {...formik.getFieldProps("alias")}
          {...formErrors(formik, "alias")}
        />
        <TextField
          style={{ width: "100%" }}
          name="pub_key"
          label="Public key"
          {...formik.getFieldProps("pub_key")}
          {...formErrors(formik, "pub_key")}
        />
        <br />
        <TextField
          style={{ width: "100%" }}
          name="session_length"
          label="Session length in minutes"
          {...formik.getFieldProps("session_length")}
          {...formErrors(formik, "session_length")}
        />
        <RadioGroup
          name="session_type"
          label="Session type"
          {...formik.getFieldProps("session_type")}
          {...formErrors(formik, "session_length")}>
            <FormControlLabel 
              value="inclusive"
              label="Inclusive - one shared key for everyone"
              control={<Radio />} />
              <FormControlLabel 
              value="exclusive"
              label="Exclusive - everyone uses their own keys"
              control={<Radio />} />
            
            
        </RadioGroup>
        <br />
        <br />
        <Button variant="contained" color="primary" type="submit" size="large">
          Register
        </Button>
      </div>
    </form>
  );
};

export default Register;
