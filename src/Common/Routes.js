import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomeLayout from "../pages/HomeLayout";
import AdminDashboardLayout from "../pages/AdminDashboardLayout";
import ManagerDashboardLayout from "../pages/ManagerDashboardLayout";
import EmployeeDashboardLayout from "../pages/EmployeeDashboardLayout";
import FCDashboardLayout from "../pages/FCDashboardLayout";
import NeedyPersonDashboardLayout from "../pages/NeedyPersonDashboardLayout";
import DonorDashboardLayout from "../pages/DonorDashboardLayout";

import NeedyPeople from "../Components/HomePage/NeedyPeople";
import HomePage from "../Components/HomePage/HomePage";
import Foods from "../Components/Foods/Foods";
import Cloths from "../Components/Cloths/Cloths";
import SignupForm from "../Common/SignupForm";
import LoginForm from "../Common/LoginForm";

//Admin Components Start from Here.
import AdminDashboard from "../Components/Admin/AdminDashboard";
import AllManagers from "../Components/Admin/ManagerDetail";
import AllEmployees from "../Components/Admin/EmployeeDetail";
import AddEmployees from "../Components/Admin/AddEmployees";

//Manager Components Start from Here.
import ManagerDashboard from "../Components/Manager/Dashboard";
import NewOrders from "../Components/Manager/NewOrders";
import AssignedOrders from "../Components/Manager/AssignedOrders";
import CompletedOrders from "../Components/Manager/CompletedOrders";
import NeedyUsersRequests from "../Components/Manager/NeedyUsersRequests";
//Employee Components Start from Here.
import EmployeeDashboard from "../Components/Employee/Dashboard";
import EmployeeCompletedOrders from "../Components/Employee/CompletedOrders";
import EmployeeNewOrders from "../Components/Employee/NewOrders";
import NeedyUserLocation from "../Components/Employee/NeedyUserLocation";
//Donor Components Start from Here.
import DonorDashboard from "../Components/Donor/Dashboard";
import PendingDonations from "../Components/Donor/PendingDonation";
import CompletedDonations from "../Components/Donor/CompletedDonations";
//Food And Cloth Donor Components Start from Here.
import FCDDashboard from "../Components/FoodAndClothDonor/FCDDashboard";
import FoodLists from "../Components/FoodAndClothDonor/FoodLists";
import ClothLists from "../Components/FoodAndClothDonor/ClothLists";
import AddFood from "../Components/FoodAndClothDonor/AddFood";
import AddCloth from "../Components/FoodAndClothDonor/AddCloth";
//Needy people Components Start from Here.
import NeedyPeopleDashboard from "../Components/NeedyPeople/Dashboard";
import RecievedDonation from "../Components/NeedyPeople/RecievedDonations";
import RecievingDonation from "../Components/NeedyPeople/RecievingDonations";
import CreateProfile from "../Components/NeedyPeople/CreateProfile";
import CheckStatus from "../Components/NeedyPeople/CheckStatus";

import AdminAuthorization from "../Authorization/AdminAuthorization";
export default function Routes() {
  return (
    <Router>
      <Switch>
        <HomeLayout exact path="/" component={HomePage} />
        <HomeLayout path="/needy-people" component={NeedyPeople} />
        <HomeLayout path="/foods" component={Foods} />
        <HomeLayout path="/cloths" component={Cloths} />
        <HomeLayout path="/signup" component={SignupForm} />
        <HomeLayout path="/login" component={LoginForm} />

        <AdminDashboardLayout
          path="/admin/dashboard"
          component={AdminDashboard}
        />
        <AdminDashboardLayout
          path="/admin/all-managers"
          component={AllManagers}
        />
        <AdminDashboardLayout
          path="/admin/all-employees"
          component={AllEmployees}
        />
        <AdminDashboardLayout
          path="/admin/add-employees"
          component={AddEmployees}
        />

        <ManagerDashboardLayout
          path="/manager/dashboard"
          component={ManagerDashboard}
        />
        <ManagerDashboardLayout
          path="/manager/new-orders"
          component={NewOrders}
        />
        <ManagerDashboardLayout
          path="/manager/completed-orders"
          component={CompletedOrders}
        />
        <ManagerDashboardLayout
          path="/manager/assigned-orders"
          component={AssignedOrders}
        />
        <ManagerDashboardLayout
          path="/manager/needy-users-request"
          component={NeedyUsersRequests}
        />
        <EmployeeDashboardLayout
          path="/employee/dashboard"
          component={EmployeeDashboard}
        />
        <EmployeeDashboardLayout
          path="/employee/new-orders"
          component={EmployeeNewOrders}
        />
        <EmployeeDashboardLayout
          path="/employee/completed-orders"
          component={EmployeeCompletedOrders}
        />
        <EmployeeDashboardLayout
          path="/employee/needy-user-location"
          component={NeedyUserLocation}
        />

        <FCDashboardLayout
          path="/fc-donor/dashboard"
          component={FCDDashboard}
        />
        <FCDashboardLayout path="/fc-donor/Food-lists" component={FoodLists} />
        <FCDashboardLayout path="/fc-donor/add-food" component={AddFood} />
        <FCDashboardLayout
          path="/fc-donor/cloth-lists"
          component={ClothLists}
        />
        <FCDashboardLayout path="/fc-donor/add-cloth" component={AddCloth} />

        <NeedyPersonDashboardLayout
          path="/needy-person/dashboard"
          component={NeedyPeopleDashboard}
        />
        <NeedyPersonDashboardLayout
          path="/needy-person/recieving-donations"
          component={RecievingDonation}
        />
        <NeedyPersonDashboardLayout
          path="/needy-person/Recieved-donations"
          component={RecievedDonation}
        />

        <DonorDashboardLayout
          path="/donor/dashboard"
          component={DonorDashboard}
        />
        <DonorDashboardLayout
          path="/donor/pending-donations"
          component={PendingDonations}
        />
        <DonorDashboardLayout
          path="/donor/completed-donations"
          component={CompletedDonations}
        />
      </Switch>
    </Router>
  );
}
