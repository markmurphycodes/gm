import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import GrainIcon from "@material-ui/icons/Grain";
import NewReleasesTwoToneIcon from "@material-ui/icons/NewReleasesTwoTone";

import { useSelector } from "react-redux";
import Loader from "../utils/loader";

const PitchAccordion = () => {
  const { current } = useSelector((state) => state.projects);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {current ? (
        <>
          {Object.keys(current.pitches).map((item, i) => (
            <Accordion
              key={i}
              expanded={expanded === i}
              onChange={handleChange(i)}
            >
              <AccordionSummary
                expandIcon={
                  <>
                    {current.pitches[item].notes &&
                    current.pitches[item].notes.length > 0 ? (
                      <NewReleasesTwoToneIcon style={{ fill: "red" }} />
                    ) : null}
                    <GrainIcon />
                  </>
                }
              >
                <Typography>
                  {current.pitches[item].number}
                  {"  -- "}
                  {current.pitches[item].grade} {current.pitches[item].danger}
                  {" | "}
                  {current.pitches[item].length}
                  {"'"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>MORE PLACEHOLDER</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PitchAccordion;
