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

const SM = respondTo.sm`
background-color: purple;
`;

const MD = respondTo.md`background-color: blue;`;

const LG = respondTo.lg`
background-color: white;
`;

const WrapperRow = styled(Row)`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .wrapper {
    border: 1px solid;
    padding: 1.2vw;
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
        font-size: 3.5vw;
        color: #000000;
      }
    }
    & > div:last-child {
      margin-top: 20px;
      .progressBar {
        width: 100%;
      }
    }
  }
  ${XXS};
  ${XS};
  ${SM};
  ${MD};
  ${LG};
`;

export { WrapperRow };
