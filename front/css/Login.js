import styled from "styled-components";
import { Layout, Row, Col } from "antd";
import { respondTo } from "../css/responsive/_respondTo";
import { default as colors } from "../css/theme/color.json";

export const BackgroundWrapper = styled(Layout)`
  background-image: url("https://source.unsplash.com/random/2");
  height: 100vh;
  width: auto;
  background-size: cover;
  background-position: center;
  opacity: 1;
`;

export const LoginFormRow = styled(Row)`
  height: 100vh;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const LoginFormCol = styled(Col)`
  background-color: ${colors["color-success-300"]};
  opacity: 0.8;
  box-shadow: ${(props) => props.range};
  border: 1px solid;
  padding: 1vw;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 0.5fr 1fr 0.5fr;

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
      font-size: 1.5vw;
      color: ${colors["color-gray-800"]};
    }
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
      font-size: 1vw;
      padding: 12px 0px;
      strong {
        font-size: 1vw;
      }
    }
    button {
      border-color: white;
      border-width: 0px;
      background-color: white;
    }
  }
`;

const loginBtn = {
  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
  width: "100%",
  backgroundColor: "#0B4E92",
  fontSize: "1.5vw",
};
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

export {
  loginBtn,
  loginKakao,
  loginApple,
  loginGoogle,
  loginFacebook,
  shadowBorder,
};
