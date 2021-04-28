import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  mudarCor: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--color-background-input);
  border-radius: 1rem;
  padding: 1.6rem;
  width: 100%;

  border: 0.2rem solid var(--color-background-input);
  color: var(--color-text-input);

  display: flex;
  align-items: center;

  & + div {
    margin-top: 0.8rem;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: var(--color-boder-input-error);
    `}


  ${(props) =>
    props.isFocused &&
    css`
      color: var(--color-image-input);
      border-color: var(--color-border-focus-input);
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: var(--color-image-input);
    `}

  ${(props) =>
    props.mudarCor &&
    css`
      background: var(--color-background-segundary);
    `}

  select {
    cursor: pointer;
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--color-placeholder-input);

    ${(props) =>
      props.mudarCor &&
      css`
        color: var(--color-placeholder-input-segundary);
      `}
  }

  svg {
    margin-right: 1.6rem;
  }

  label {
    position: absolute;
    margin-top: -4.9rem;
    font-size: 1.6rem;
    border-radius: 1rem;
    font-weight: 700;
    color: var(--color-placeholder-input);
    background: var(--color-background-second);

    ${(props) =>
      props.mudarCor &&
      css`
          color: var(--color-placeholder-input-segundary);
      `}
  }
`;

export const Error = styled(Tooltip)`
  height: 2rem;
  margin-left: 1.6rem;

  svg {
    margin: 0;
  }

  span {
    background: var(--color-boder-input-error);
    color: var(--color-span);

    &::before {
      border-color: var(--color-boder-input-error) transparent;
    }
  }
`;
