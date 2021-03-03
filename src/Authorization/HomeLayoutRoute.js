import React from "react";
import { Route } from "react-router-dom";

import HomeLayout from "../pages/HomeLayout";

const HomeLayout = ({ children }) => (
  <div>
    <p>This is the First Layout</p>
    {children}
  </div>
);

const HomeLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <HomeLayout>
          <Component {...matchProps} />
        </HomeLayout>
      )}
    />
  );
};
export default LoginLayoutRoute;
