import React, { useEffect, useState } from "react";

import { Switch, Route, BrowserRouter } from "react-router-dom";

import Loader from "./components/utils/loader";
// import GoogleFontLoader from "react-google-font-loader";
import Header from "./components/navigation/header";
import Home from "./components/home/index";
import MainLayout from "./hoc/mainLayout";
import Auth from "./components/auth/index";
import Dashboard from "./components/dashboard/index";

import AuthGuard from "./hoc/authGuard";

import { useDispatch, useSelector } from "react-redux";
import { isAuthUser } from "./store/actions/user_actions";

const Routes = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(isAuthUser());
  }, [dispatch]);

  useEffect(() => {
    if (users.auth != null) {
      setLoading(false);
    }
  }, [users]);

  return (
    <BrowserRouter>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <MainLayout>
          <Switch>
            {/*<Route path="/session/:id" component={Session} /> */}
            <Route path="/dashboard" component={AuthGuard(Dashboard)} />
            <Route path="/auth" component={Auth} />
            <Route path="/" component={Home} />
          </Switch>
        </MainLayout>
      )}
    </BrowserRouter>
  );
};

export default Routes;