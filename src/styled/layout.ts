import styled, { css } from 'styled-components';

import { COLORS, SPACING } from './shared';

export const TitleLikeStyles = css`
  display: block;
  text-align: center;
  color: ${COLORS.yellow};
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
`;

export const Title = styled.h2(
  ({
    fontSize = '16px',
    color = COLORS.yellow,
  }: {
    fontSize?: string;
    color?: string;
  }) => `
    ${TitleLikeStyles}
    font-size: ${fontSize};
    text-transform: uppercase;
    display: block;
    text-align: center;
    color: ${color};
  `
);

export const Button = styled.button<{ primary?: boolean; secondary?: boolean }>(
  ({ primary }) =>
    `
  padding: ${SPACING}px;
  background-color: ${COLORS.blue};
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: none;
  font-family: serif;
  font-size: ${primary ? '16px' : '14px'};
  text-transform: uppercase;
  font-weight: bold;
  color: ${primary ? COLORS.yellow : COLORS.white};
  ${primary ? 'border-radius: 8px;' : ''}
    `
);
