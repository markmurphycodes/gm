import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { Switch, Route, BrowserRouter } from "react-router-dom";

import Loader from "./components/utils/loader";
// import GoogleFontLoader from "react-google-font-loader";
import Header from "./components/navigation/header";
import MainLayout from "./hoc/mainLayout";
import BottomNav from "./components/navigation/bottom";

import Home from "./components/home";
import Synch from "./components/synch";

const Routes = () => {
  const [loading, setLoading] = useState(false);

  return (
    <BrowserRouter>
      <Container style={{ zIndex: "700" }}>
        <Header style={{ zIndex: "710" }} />
        {loading ? (
          <Loader />
        ) : (
          <Switch>
            <Route path="/synch" component={Synch} />
            <Route path="/" component={Home} />
          </Switch>
        )}
      </Container>
    </BrowserRouter>
  );
};

export default Routes;
