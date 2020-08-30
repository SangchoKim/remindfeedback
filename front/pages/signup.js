import React from "react";
import AppFooter from "../components/AppFooter";
import AppSignUp from "../container/signup";

import CustomLayout from "../components/CustomLayout";

const signup = () => {
  return (
    <CustomLayout imageurl='"https://source.unsplash.com/random/2"'>
      <AppSignUp />
    </CustomLayout>
  );
};

export default signup;
