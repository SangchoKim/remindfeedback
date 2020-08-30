import styled from "styled-components";
import { Layout, Row, Col } from "antd";
import { respondTo } from "../css/responsive/_respondTo";
import { default as colors } from "../css/theme/color.json";
import { CommonShadowBox } from "./Common";

export const LoginFormCol = styled(CommonShadowBox)`
  & > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 25%;
    }
    span {
      margin-top: 5px;
      font-size: 1rem;
      color: ${colors["color-gray-800"]};
    }
  }
  & div label {
    font-size: 1rem;
    color: #000;
  }
  & > form:nth-child(2) {
    display: grid;
    grid-template-rows: repeat(3, 1fr);

    & > div:nth-child(3) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  & > div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      padding: 12px 0px;
    }
  }
`;

const loginKakao = {
  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
  width: "100%",
  backgroundColor: "#FFFF00",
  color: "#000000",
};
const loginApple = {
  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
  width: "100%",
  backgroundColor: "#000000",
  color: "#FFFFFF",
};
const loginGoogle = {
  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
  width: "100%",
  backgroundColor: "#FFFFFF",
  color: "#000000",
};
const loginFacebook = {
  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
  width: "100%",
};
const shadowBorder = {
  border: "1px solid",
  padding: "2.5%",
  boxShadow: "10px 10px 5px grey",
  marginTop: "2.5%",
};

export { loginKakao, loginApple, loginGoogle, loginFacebook, shadowBorder };
