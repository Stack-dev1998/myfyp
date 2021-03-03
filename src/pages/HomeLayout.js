import React from "react";
import { Route } from "react-router-dom";
import Topbar from "../Components/HomePage/TopBar";
import HeaderBar from "../Components/HomePage/Header";
import Navbar from "../Components/HomePage/NavBar";

const HomeLayout = ({ children }) => (
  <div>
    <Topbar></Topbar>
    <HeaderBar></HeaderBar>
    <Navbar></Navbar>
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
export default HomeLayoutRoute;
