import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signUpBackground from '../../assets/sign-in-background.jpg';

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  background: var(--color-background);
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  place-content: center;

  width: 100%;
  max-width: 70rem;

  align-items: center;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;

  place-content: center;

  align-items: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 4rem 0;
    width: 30rem;
    text-align: center;

    h1 {
      margin-top: 2rem;
      margin-bottom: 2.4rem;
    }

    a {
      color: var(--color-link-secundary);
      display: block;
      margin-top: 2.4rem;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }

    .voltar-logon {
      color: var(--color-link-primary);
      margin-top: 10%;
      text-decoration: none;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-right: 1.6rem;
      }

      &:hover {
        color: ${shade(0.2, '#ff9000')};
      }
    }
  }

  @media (min-width: 900px) {
    form {
      margin: 8rem 0;
      width: 34rem;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
`;
