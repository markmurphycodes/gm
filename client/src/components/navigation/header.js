import React from "react";

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import SideDrawer from "./drawer";

const Header = () => {
  return (
    <>
      <div>
        <AppBar position="static">
          <Toolbar>
            <SideDrawer />
            <Typography className="ml-2 mr-2" variant="h6">
              Welcome
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

export default Header;
