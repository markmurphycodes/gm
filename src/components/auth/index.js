import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import PreventAuthRoute from "../../hoc/preventAuthRoute";
import Login from "./login";
import Register from "./register";

const Auth = (props) => {
  const [register, setRegister] = useState(false);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (notification && notification.success) {
      props.history.push("/dashboard");
    }
  }, [notification, props.history]);

  return (
    <PreventAuthRoute>
      <div className="auth_container">
        {register ? (
          <>
            <h1>Create new session</h1>
            <Register />
          </>
        ) : (
          <>
        <h1>Join existing</h1>
            <Login />
          </>
        )}

        <br />
        <br />
        <Button
          variant="contained"
          color="default"
          size="small"
          onClick={() => setRegister(!register)}
        >
          {!register
            ? "Register new"
            : "Join existing"}
        </Button>
      </div>
    </PreventAuthRoute>
  );
};

export default Auth;
