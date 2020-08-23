import styled from "styled-components";
import { Row } from "antd";
import { respondTo } from "../css/responsive/_respondTo";
import { default as colors } from "../css/theme/color.json";

const XXS = respondTo.xxs`
background-color: ${colors["color-danger-transparent-500"]};
`;

const XS = respondTo.xs`
background-color: ${colors["color-danger-800"]};
`;

const WrapperRow = styled(Row)`
  ${XXS};
  ${XS};
  ${respondTo.sm`
   background-color: purple;
  `};
  ${respondTo.md`
   background-color: blue;
  `};
  ${respondTo.lg`
   background-color: white;
  `};
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .wrapper {
    border: 1px solid;
    padding: 50px;
    box-shadow: 10px 10px 5px grey;
    margin-top: 20px;
    & > div:first-child {
      text-align: center;
      margin-bottom: 5px;
      padding: 15px;
    }
    & > div:nth-child(2) {
      text-align: center;

      span {
        font-size: 2vw;
        color: #000000;
      }
    }
    & > div:last-child {
      margin-top: 20px;
    }
  }
`;

export { WrapperRow };
