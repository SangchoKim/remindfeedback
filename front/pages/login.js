import React from "react";
import { Layout } from "antd";
import AppFooter from "../components/AppFooter";
import AppLogin from "../container/login";
import { layout } from "../css/Common";
import { BackgroundWrapper } from "../css/Login";

const login = () => {
  return (
    <BackgroundWrapper>
      <AppLogin />
    </BackgroundWrapper>
  );
};

export default login;
