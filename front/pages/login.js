import React from "react";
import { Layout } from "antd";
import AppFooter from "../components/AppFooter";
import AppLogin from "../container/login";
import { layout } from "../css/Common";
import { BackgroundWrapper } from "../css/Common";
import CustomLayout from "../components/CustomLayout";

const login = () => {
  return (
    <CustomLayout
      imageurl='"https://source.unsplash.com/random/2"'
      imagesize="cover"
      imageposition="center"
    >
      <AppLogin />
    </CustomLayout>
  );
};

export default login;
