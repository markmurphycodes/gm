import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { TextField, Button, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { registerSession } from "../../store/actions/session_actions";
import { registerUser } from "../../store/actions/user_actions";
import { sign } from 'tweetnacl';
import { decodeUTF8, encodeBase64 } from 'tweetnacl-util';

const Register = (props) => {
  const dispatch = useDispatch();
  const cur_user = useSelector((state) => state.users);

  const formik = useFormik({
    initialValues: {
      alias: '',
      secret: '',
      session_length: '',
      session_type: "exclusive"
    },
    validationSchema: Yup.object({
      alias: Yup.string().required("This is a required field."),
      secret: Yup.string().required("This is a required field."),
      session_length: Yup.number().required("Must include session length"),
      session_type: Yup.string().required("Must include session type.")
    }),
    onSubmit: (values, { resetForm }) => {
      // TODO client-side encryption

      const keysUnsigned = sign.keyPair();
      const uint8pub = decodeUTF8(JSON.stringify(keysUnsigned.publicKey));

      const _user = {
        alias: values.alias,
        pub_key: encodeBase64(keysUnsigned.publicKey),
        role: "admin"
      }

      dispatch(registerUser(_user));

      const signed_msg = sign(cur_user._id, keysUnsigned.secretKey);
      const uintSigned = decodeUTF8(JSON.stringify(signed_msg));

      let register = {
        user: cur_user._id,
        alias: values.alias,
        signed_message: encodeBase64(uintSigned),
        session_length: values.session_length,
        session_type: values.session_type
      }

      console.log(signed_msg);
      
      dispatch(registerSession(register));

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
          style={{ width: "50%" }}
          name="alias"
          label="Alias"
          {...formik.getFieldProps("alias")}
          {...formErrors(formik, "alias")}
        />
        <TextField
          style={{ width: "50%" }}
          name="secret"
          label="Secret"
          {...formik.getFieldProps("secret")}
          {...formErrors(formik, "secret")}
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
