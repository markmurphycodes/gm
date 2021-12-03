import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@material-ui/core";

import DehazeIcon from "@material-ui/icons/Dehaze";
import HomeIcon from "@material-ui/icons/Home";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import DashboardIcon from "@material-ui/icons/Dashboard";

const SideDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DehazeIcon className="drawer_btn" onClick={() => setOpen(true)} />
      <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
        <form style={{ margin: "20px" }}>
          <TextField id="outlined-basic" label="Search" variant="outlined" />
        </form>
        <Divider />
        <List>
          <ListItem
            button
            component={RouterLink}
            to="/"
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>


          <ListItem
            button
            component={RouterLink}
            to="/auth"
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary="Join / Register" />
          </ListItem>

        </List>
        <>
          <Divider />

          <List>

            <ListItem
              button
              component={RouterLink}
              to="/dashboard"
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

          </List>
        </>
      </Drawer>
    </>
  );
};

export default SideDrawer;
