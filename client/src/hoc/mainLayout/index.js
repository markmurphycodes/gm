import React from "react";

const MainLayout = (props) => {
  return (
    <div className="container">
      <h1 className="mx-auto">Locks</h1>
      {props.children}
    </div>
  );
};

export default MainLayout;
