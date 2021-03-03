import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import UserDashboard from "../Common/UserDashboard";
import { Spinner } from "react-bootstrap";
import FCSidebarContent from "../Components/FoodAndClothDonor/FCSidebarContent";
import { Cookies } from "react-cookie";
import axios from "axios";
const cookie = new Cookies();

const FCDashboardLayout = ({ children }) => {
  const [success, setSuccess] = useState(null);
  const [serverData, setServerData] = useState(null);
  useEffect(() => {
    axios("http://localhost:5000/check-fc-donor-authorization", {
      method: "post",
      headers: {
        "x-access-token": cookie.get("food and cloth donor"),
      },
      withCredentials: true,
    }).then((res) => {
      setServerData(res.data.user);
      setSuccess(res.data.auth);
    });
  }, []);

  if (success === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          verticalAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Spinner
          animation="grow"
          variant="dark"
          style={{
            width: "100px",
            height: "100px",
          }}
        />
        <h3>Loading...</h3>
      </div>
    );
  } else if (success) {
    return (
      <UserDashboard
        children={children}
        userSidebar={<FCSidebarContent userInfo={serverData} />}
        title={"FOOD & CLOTH DONOR DASHBOARD"}
      />
    );
  } else {
    return <Redirect to="/login" />;
  }
};

const FCDashboardLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <FCDashboardLayout>
          <Component {...matchProps} />
        </FCDashboardLayout>
      )}
    />
  );
};
export default FCDashboardLayoutRoute;
