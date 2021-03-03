import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import UserDashboard from "../Common/UserDashboard";
import DonorSidebarContent from "../Components/Donor/DonorSidebarContent";
import { Cookies } from "react-cookie";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const cookie = new Cookies();
const DonorDashboardLayout = ({ children }) => {
  const [success, setSuccess] = useState(null);
  const [serverData, setServerData] = useState(null);
  useEffect(() => {
    axios("http://localhost:5000/check-donor-authorization", {
      method: "post",
      headers: {
        "x-access-token": cookie.get("donor"),
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
        userSidebar={<DonorSidebarContent userInfo={serverData} />}
        title={"DONOR DASHBOARD"}
      />
    );
  } else {
    return <Redirect to="/login" />;
  }
};

const DonorDashboardLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <DonorDashboardLayout>
          <Component {...matchProps} />
        </DonorDashboardLayout>
      )}
    />
  );
};
export default DonorDashboardLayoutRoute;
