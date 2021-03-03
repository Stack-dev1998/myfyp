import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import UserDashboard from "../Common/UserDashboard";
import { Spinner } from "react-bootstrap";
import NeedyPersonSidebarContent from "../Components/NeedyPeople/NeedyPeopleSidebarContent";
import { Cookies } from "react-cookie";
import axios from "axios";
const cookie = new Cookies();

const NeedyPersonDashboardLayout = ({ children }) => {
  const [success, setSuccess] = useState(null);
  const [serverData, setServerData] = useState(null);
  useEffect(() => {
    axios("http://localhost:5000/check-needy-person-authorization", {
      method: "post",
      headers: {
        "x-access-token": cookie.get("needy person"),
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
        userSidebar={<NeedyPersonSidebarContent userInfo={serverData} />}
        title={"ADMIN DASHBOARD"}
      />
    );
  } else {
    return <Redirect to="/login" />;
  }
};

const NeedyPersonDashboardLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <NeedyPersonDashboardLayout>
          <Component {...matchProps} />
        </NeedyPersonDashboardLayout>
      )}
    />
  );
};
export default NeedyPersonDashboardLayoutRoute;
