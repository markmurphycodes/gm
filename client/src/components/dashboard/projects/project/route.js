import React from "react";
import { useSelector } from "react-redux";
import PitchAccordion from "../../../utils/pitchAccordion";
import Loader from "../../../utils/loader";
import { Divider } from "@material-ui/core";

const ProjectRoute = () => {
  const { current } = useSelector((state) => state.projects);
  return (
    <>
      {current ? (
        <>
          <h3>
            {current.name} | {current.grade} | {current.numPitches}
            {current.numPitches > 1 ? " Pitches" : " Pitch"} | {current.length}
          </h3>
          <div>
            <div className="mt-3 content">
              <h4>Description</h4>
              {current.description}
            </div>
            <div className="mt-3 content">
              <h4>Pitches</h4>
              <PitchAccordion />
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProjectRoute;
