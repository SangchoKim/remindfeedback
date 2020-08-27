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
const { Footer, Content, Header } = Layout;

const signup = () => {
  return (
    <BackgroundWrapper>
      <AppSignUp />
    </BackgroundWrapper>
  );
};

export default signup;
