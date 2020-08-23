import { css } from "styled-components";
import { breakpoints } from "./_variables";

export const respondTo = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args) => css`
      @media (min-width: ${breakpoints[label]}) {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {}
);

export const makeGridSize = (xs = 8, sm = 8, md = 8, lg = 8) => {
  return {
    xs,
    sm,
    md,
    lg,
  };
};
