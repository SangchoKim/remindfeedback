import React from "react";
import styled, { css } from "styled-components";
import { darken, lighten, borderStyle } from "polished";
import { LoadingOutlined } from "@ant-design/icons";

const colorStyles = css`
  ${({ theme, color, outline }) => {
    const selected = theme.palette[color];
    const BLACK = "black";
    return css`
      background: ${selected};
      color: ${color === "white" && BLACK};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      ${outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
          &:hover {
            background: ${selected};
            color: white;
          }
        `}
    `;
  }}
`;

const sizes = {
  large: {
    width: "50%",
    height: "3rem",
    fontSize: "1.25rem",
  },
  medium: {
    width: "40%",
    height: "2.25rem",
    fontSize: "1rem",
  },
  small: {
    width: "30%",
    height: "1.75rem",
    fontSize: "0.75rem",
  },
  tiny: {
    width: "20%",
    height: "1rem",
    fontSize: "0.5rem",
  },
};

const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    width: ${sizes[size].width};
    font-size: ${sizes[size].fontSize};
  `}
`;

const borderStyles = css`
  ${({ bolderStyle }) => css`
    border-style: ${bolderStyle};
  `}
`;

const fullWidthStyle = css`
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
      justify-content: center;
      & + & {
        margin-left: 0;
        margin-top: 1rem;
      }
    `}
`;

const boxShadowStyle = css`
  ${({ boxShadow }) => css`
    box-shadow: ${boxShadow};
  `}
`;

const textLocations = {
  left: {
    coulmn: "flex-start",
    row: "center",
  },
  right: {
    coulmn: "flex-end",
    row: "center",
  },
  center: {
    coulmn: "center",
    row: "center",
  },
};

const textLocationStyle = css`
  ${({ textLocation }) => css`
    justify-content: ${textLocations[textLocation].coulmn};
    align-items: ${textLocations[textLocation].row};
  `}
`;
const StyledButton = styled.button`
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  & + & {
    margin-left: 0.5rem;
  }

  /* 크기 */
${sizeStyles}

  /* 색상 */
${colorStyles}

  /*  */
${fullWidthStyle}

  /* 테두리 스타일 */
${borderStyles}

 /* 그림자 스타일 */
${boxShadowStyle}

 /* 글자 위치 */
${textLocationStyle}
`;

const CustomButton = ({
  children,
  color,
  size,
  outline,
  fullWidth,
  bolderStyle,
  boxShadow,
  textLocation,
  disabled,
  loading,
  onClick,
  ...rest
}) => {
  console.log(textLocation);
  return (
    <StyledButton
      disabled={disabled}
      color={color}
      size={size}
      outline={outline}
      fullWidth={fullWidth}
      bolderStyle={bolderStyle}
      boxShadow={boxShadow}
      textLocation={textLocation}
      onClick={onClick}
      {...rest}
    >
      {children}
      {loading && <LoadingOutlined />}
    </StyledButton>
  );
};

CustomButton.defaultProps = {
  color: "blue",
  size: "medium",
  bolderStyle: "none",
  textLocation: "left",
};

export default CustomButton;
