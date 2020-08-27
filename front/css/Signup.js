import styled, { css } from "styled-components";
import { Layout, Row, Col } from "antd";
import { respondTo } from "../css/responsive/_respondTo";
import { default as colors } from "../css/theme/color.json";
import { CommonShadowBox } from "./Common";

const commonFormWrapper = css`
  div {
    margin-top: 5px;
  }
  div > label {
    font-weight: bold;
  }
  div > div {
    display: flex;
    flex-direction: row;
    & > button {
      border-radius: 15px;
      background-color: red;
      font-weight: bold;
      color: #ffffff;
    }
  }
`;

export const SignUpFormCol = styled(CommonShadowBox)`
  & > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      margin-bottom: 0;
    }
    div span {
      letter-spacing: 1px;
    }
    .test-bold {
      font-weight: bold;
      color: ${colors["color-danger-800"]};
    }
  }
  & > form:nth-child(2) {
    padding: 5px;
    ${commonFormWrapper}
  }
`;
const signUpBtn = {
  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
  width: "100%",
  backgroundColor: "#0B4E92",
  color: "#FFFFFF",
};
const shadowBorder = {
  border: "1px solid",
  padding: 50,
  boxShadow: "10px 10px 5px grey",
};

export { signUpBtn, shadowBorder };
