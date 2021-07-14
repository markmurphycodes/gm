import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { signInUser } from "../../store/actions/user_actions";

const Login = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { alias: "", pub_key: "", session_id: "" },
    validationSchema: Yup.object({
      alias: Yup.string()
        .required("This is a required field."),
      password: Yup.string().required("This is a required field."),
      session_id: Yup.string().required("This is a required field."),
    }),
    onSubmit: (values, { resetForm }) => {
      // TODO client-side encryption
      dispatch(signInUser(values));
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
        <TextField rows="3"
          style={{ width: "100%" }}
          name="alias"
          label="Enter your alias"
          {...formik.getFieldProps("alias")}
          {...formErrors(formik, "alias")}
        />
        <TextField
          style={{ width: "100%" }}
          name="pub_key"
          label="Enter your public key"
          {...formik.getFieldProps("pub_key")}
          {...formErrors(formik, "pub_key")}
        />
        <TextField
          style={{ width: "100%" }}
          name="session_id"
          label="Enter the session ID"
          {...formik.getFieldProps("session_id")}
          {...formErrors(formik, "session_id")}
        />

        <br />
        <br />
        <Button variant="contained" color="primary" type="submit" size="large">
          Join
        </Button>
      </div>
    </form>
  );
};
export default Login;
