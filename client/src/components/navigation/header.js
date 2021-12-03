import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import SideDrawer from "./drawer";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { clearNotifications } from "../../store/actions/index";
import { showToast } from "../utils/tools";
import { signOutUser as signOut } from "../../store/actions/user_actions";
import { appLayout } from "../../store/actions/site_actions";

const Header = (props) => {
  const [layout, setLayout] = useState("");
  const notification = useSelector((state) => state.notification);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(signOut());
    props.history.push("/");
  };

  useEffect(() => {
    let pathArray = props.location.pathname.split("/");

    if (pathArray[1] === "dashboard") {
      setLayout("dash_layout");
      dispatch(appLayout("dash_layout"));
    } else {
      setLayout("");
      dispatch(appLayout(""));
    }
  }, [props.location.pathname, dispatch]);

  useEffect(() => {
    if (notification && notification.error) {
      const msg = notification.msg ? notification.msg : "ERROR";
      showToast("ERROR", msg);
      dispatch(clearNotifications());
    }
    if (notification && notification.success) {
      const msg = notification.msg ? notification.msg : "SUCCESS";
      showToast("SUCCESS", msg);
      dispatch(clearNotifications());
    }
  }, [notification, dispatch]);

  return (
    <>
      <div>
        <AppBar position="static" className={`navbar fixed-top ${layout}`}>
          <Toolbar>
            <SideDrawer users={users} signOutUser={signOutUser} />
            <Typography className="ml-2 mr-2" variant="h6">
              Welcome, {users.auth ? (
            <h5 style={{ marginRight: "2rem" }}>{users.data.alias}</h5>
          ) : null}
            </Typography>
            <Button edge="end" className="ml-auto" color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default withRouter(Header);