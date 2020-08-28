import React from "react";
import { Layout } from "antd";
import AppFooter from "../components/AppFooter";
import AppSignUp from "../container/signup";
import {
  layout,
  backgroundWhite,
  backgroundLightBlue,
  BackgroundWrapper,
} from "../css/Common";

const signup = () => {
  return (
    // 공통 레이아웃 만들기
    <BackgroundWrapper>
      <AppSignUp />
    </BackgroundWrapper>
  );
};

export default signup;
