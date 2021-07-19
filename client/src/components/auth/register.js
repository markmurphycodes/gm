import React, { useEffect } from "react";
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
  var keysUnsigned;
  var alias;
  var session_length;
  var session_type;

  const formik = useFormik({
    initialValues: {
      alias: '',
      session_length: '',
      session_type: "exclusive"
    },
    validationSchema: Yup.object({
      alias: Yup.string().required("This is a required field."),
      session_length: Yup.number().required("Must include session length"),
      session_type: Yup.string().required("Must include session type.")
    }),
    onSubmit: (values, { resetForm }) => {

      alias = values.alias;
      session_length = values.session_length;
      session_type = values.session_type;

      keysUnsigned = sign.keyPair();
      const uint8pub = decodeUTF8(JSON.stringify(keysUnsigned.publicKey));

      const _user = {
        alias: alias,
        pub_key: encodeBase64(uint8pub),
        role: "admin"
      }

      console.log(_user);

      dispatch(registerUser(_user));

      

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


  // Create the session once the user has been updated in Redux
  useEffect(() => {
    if(cur_user.data._id){
      const uintId = decodeUTF8(JSON.stringify(cur_user.data._id));
      const signed_msg = sign(uintId, keysUnsigned.secretKey);
      const uintSigned = decodeUTF8(JSON.stringify(signed_msg));

      let register = {
        owner: cur_user.data._id,
        alias: alias,
        signed_message: encodeBase64(uintSigned),
        session_length: session_length,
        session_type: session_type
      }

      console.log(cur_user);
      dispatch(registerSession(register));
    }
    
  }, [cur_user]);


  return (
    <form className="mt-3" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <TextField
                style={{ width: "50%" }}
                name="alias"
                label="Alias"
                {...formik.getFieldProps("alias")}
                {...formErrors(formik, "alias")}
              />
              <br />
              <TextField
                style={{ width: "50%" }}
                name="session_length"
                label="Session length in minutes"
                {...formik.getFieldProps("session_length")}
                {...formErrors(formik, "session_length")}
              />
            </div>
            <div classname="col">
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
            </div>
          </div>
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
