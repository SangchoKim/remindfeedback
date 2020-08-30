import React from "react";
import AppFooter from "../components/AppFooter";
import AppLogin from "../container/login";
import CustomLayout from "../components/CustomLayout";

const login = () => {
  return (
    <CustomLayout imageurl='"https://source.unsplash.com/random/2"'>
      <AppLogin />
    </CustomLayout>
  );
};

export default login;
