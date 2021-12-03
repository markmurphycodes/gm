import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../utils/loader";
import { getProject } from "../../../../store/actions/project_actions";

import ProjectRoute from "./route";
import ProjectIssues from "./issues";
import ProjectEquipment from "./equipment";
import ProjectCollab from "./collab";

import {
  List,
  ListItem,
  ListItemText,
  Breadcrumbs,
  Typography,
  Divider,
} from "@material-ui/core";

const Project = (props) => {
  const [text, setText] = useState("Route");
  const { current } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(<ProjectRoute />);

  useEffect(() => {
    dispatch(getProject(props.match.params.id));
  }, [dispatch, props.match.params]);

  return (
    <>
      {current ? (
        <div className="row proj_container">
          <nav className="col-md-2 d-none d-md-block sidebar">
            <div className="col">
              <List>
                <div
                  style={{
                    background: `url(https://picsum.photos/1920/1080)`,
                    height: "10em",
                  }}
                  className="image"
                ></div>
                <Divider className="mt-4 mb-4" />
                <ListItem
                  button
                  onClick={() => {
                    setSelected(<ProjectRoute />);
                    setText("Route");
                  }}
                >
                  <ListItemText primary="Route" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    setSelected(<ProjectIssues />);
                    setText("Issues");
                  }}
                >
                  <ListItemText primary="Issues" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    setSelected(<ProjectEquipment />);
                    setText("Equipment");
                  }}
                >
                  <ListItemText primary="Equipment" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    setSelected(<ProjectCollab />);
                    setText("Collaboration");
                  }}
                >
                  <ListItemText primary="Collaboration" />
                </ListItem>
              </List>
            </div>
          </nav>
          <div className="col">
            <div className="row mt-3 mb-3 ">
              <Breadcrumbs aria-label="breadcrumb" separator=">>">
                <Typography>{current.name}</Typography>
                <Typography>{text}</Typography>
              </Breadcrumbs>
            </div>
            <div className="row container">{selected}</div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Project;
