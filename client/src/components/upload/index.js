import React from "react";
import { Form } from "react-bootstrap";

const Uploader = () => {
  return (
    <>
      <div>Uploader</div>
      <Form>
        <Form.Group>
          <Form.File id="file_grabber" label="Save File" />
        </Form.Group>
      </Form>
    </>
  );
};

export default Uploader;
