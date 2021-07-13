import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-dracula";

const Editor = () => {
  const onChange = (data) => {
    console.log(data);
  };
  return (
    <AceEditor
      fontSize={16}
      width="50%"
      height="75%"
      mode="c_cpp"
      theme="dracula"
      onChange={onChange}
      name="aceEditor"
      focus
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      }}
    />
  );
};

export default Editor;
