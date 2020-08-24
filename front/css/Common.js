import styled from "styled-components";
import { Layout, Row } from "antd";
import { respondTo } from "../css/responsive/_respondTo";

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
