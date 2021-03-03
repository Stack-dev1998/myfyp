import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import UserDashboard from "../Common/UserDashboard";
import { Spinner } from "react-bootstrap";
import AdminSidebarContent from "../Components/Admin/SidebarContent";
import { Cookies } from "react-cookie";
import axios from "axios";
const cookie = new Cookies();
const AdminDashboardLayout = ({ children }) => {
  const [userRequest, setUserRequest] = useState({
    serverData: null,
    success: null,
  });

  useEffect(() => {
    axios("http://localhost:5000/check-admin-authorization", {
      method: "post",
      headers: {
        "x-access-token": cookie.get("admin"),
      },
      withCredentials: true,
    }).then((res) => {
      setUserRequest({
        serverData: res.data.user,
        success: res.data.auth,
      });
    });
  }, []);

  const { success, serverData } = userRequest;
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
        userSidebar={<AdminSidebarContent userInfo={serverData} />}
        title={"ADMIN DASHBOARD"}
      />
    );
  } else {
    return <Redirect to="/login" />;
  }
};

const AdminDashboardLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <AdminDashboardLayout>
          <Component {...matchProps} />
        </AdminDashboardLayout>
      )}
    />
  );
};
export default AdminDashboardLayoutRoute;
