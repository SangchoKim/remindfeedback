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

export const CommonShadowBox = styled(Col)`
  && {
    background-color: ${colors["color-success-300"]};
    opacity: 0.8;
    border: 1px solid;
    padding: 1vw;
    border-radius: 20px;
    display: grid;
    grid-template-rows: ${(props) => props.grid_templeate_row};
    box-shadow: ${(props) => props.range};
  }
`;

export const LoginFormRow = styled(Row)`
  height: 100vh;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const layout = {
  background: "white",
  height: "100vh",
  width: "auto",
};

const layouts = {
  background: "white",
  width: "auto",
};

const backgroundWhite = {
  background: "white",
};

const layoutCenter = {
  height: "100vh",
  width: "auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

const backgroundLightBlue = {
  background: "#0B4E92",
};

const fontSize = {
  fontSize: "1.5vw",
  color: "#000000",
};

export {
  layout,
  layouts,
  backgroundWhite,
  backgroundLightBlue,
  fontSize,
  layoutCenter,
};
