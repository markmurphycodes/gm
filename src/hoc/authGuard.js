import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/utils/loader";

export default function AuthGuard(ComposedComponent, roleCheck = false) {
  const AuthenticationCheck = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const users = useSelector((state) => state.users);

    useEffect(() => {
      if (!users.auth) {
        props.history.push("/");
      } else {
        setIsAuth(true);
      }
    }, [props, users]);

    if (!isAuth) {
      return (
        <div className="main_loader">
          <Loader />
        </div>
      );
    } else {
      return <ComposedComponent {...props} />;
    }
  };
  return AuthenticationCheck;
}
