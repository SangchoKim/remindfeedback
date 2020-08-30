import React from "react";
import styled, { css } from "styled-components";
import { darken, lighten, borderStyle } from "polished";
import { LoadingOutlined } from "@ant-design/icons";
import { Layout } from "antd";

const BackGroundStyle = css`
  ${({
    imageurl,
    imagesize,
    imageposition,
    imagerefeat,
    theme,
    color,
    outline,
    opacity,
  }) => {
    const selected = theme.palette[color];
    return css`
      background-image: url(${imageurl});
      background-color: ${selected};
      background-size: ${imagesize};
      background-position: ${imageposition};
      opacity: ${opacity};
      ${imagerefeat &&
        css`
          background-repeat: repeat;
        `};
      ${outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
        `};
    `;
  }}
`;

const StyledLayout = styled(Layout)`
  height: 100vh;
  width: auto;

  /* BackGround */
  ${BackGroundStyle}
`;

const CustomLayout = ({ children, ...rest }) => {
  return <StyledLayout {...rest}>{children}</StyledLayout>;
};

CustomLayout.defaultProps = {
  imagerefeat: "no-repeat",
  imagesize: "cover",
  imageposition: "center",
  opacity: 1,
  color: "white",
};

export default CustomLayout;
