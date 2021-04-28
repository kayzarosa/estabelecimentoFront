import styled, { keyframes, css } from 'styled-components';
import { shade } from 'polished';

interface PropsContainerMenu {
  isMenu: boolean;
}

const enter = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0.98) translateY(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ContainerMenu = styled.nav<PropsContainerMenu>`
  width: 100vw;
  height: 100vh;
  background: var(--color-background-menu);
  height: 7rem;
  margin: 0;
  padding: 0;

  img {
    width: 10%;
    padding: 0;

    @media (max-width: 1274px) {
      width: 20%;
      height: 20%;
    }
  }

  a {
    text-decoration: none;
    font-weight: 700;
    font: 'Roboto Silab', serif;
    font-size: 1.7rem;
    color: var(--color-text-menu);
  }

  ol {
    list-style-type: none;
    margin: 0 auto;
    padding: 0;
    align-items: center;
  }

  > ol {
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
  }

  > ol > .menu-item {
    flex: 1;
    padding: 2.5rem 0;
    justify-content: space-between;
  }

  > ol > .menu-item:after {
    content: "";
    position: absolute;
    width: 10rem;
    height: 0.4rem;
    border-radius: 0.1rem;
    bottom: 1.5rem;
    left: calc(50% - 5rem);
    background: var(--color-decoracao-menu);
    will-change: transform;
    transform: scale(0);
    transition: transform 0.2s ease;
  }

  > ol > .menu-item:hover:after {
    transform: scale(1);
  }

  .menu-item {
    position: relative;
    line-height: 2.5rem;
    text-align: center;
  }

  .menu-item a {
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  .sub-menu {
    position: absolute;
    width: 100%;
    top: 90%;
    left: 0;
    display: none;
    z-index: 1;
  }

  .sub-menu .menu-item {
    padding: 0.75rem 0;
    background: var(--color-decoracao-menu);
    opacity: 0;
    transform-origin: bottom;
    animation: ${enter} 0.2s ease forwards;
  }

  .sub-menu .menu-item:nth-child(1) {
    animation-duration: 0.2s;
    animation-delay: 0s;
  }

  .sub-menu .menu-item:nth-child(2) {
    animation-duration: 0.3s;
    animation-delay: 0.1s;
  }

  .sub-menu .menu-item:nth-child(3) {
    animation-duration: 0.4s;
    animation-delay: 0.2s;
  }

  .sub-menu .menu-item:nth-child(4) {
    animation-duration: 0.5s;
    animation-delay: 0.3s;
  }

  .sub-menu .menu-item:nth-child(5) {
    animation-duration: 0.6s;
    animation-delay: 0.4s;
  }

  .sub-menu .menu-item:nth-child(6) {
    animation-duration: 0.7s;
    animation-delay: 0.5s;
  }

  .sub-menu .menu-item:hover {
    background: ${shade(0.2, '#8e835e')};
  }

  .sub-menu .menu-item a {
    padding: 0 0.75rem;
  }

  .menu-item:hover > .sub-menu {
    display: block;
  }

  .menu-mobile {
    display: none;
  }

  .menu-mobile-click {
    display: none;
  }

  .notificacao {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 5rem;

    a {
      width: 100%;
      margin-top: -1rem;
      margin-left: 0.7rem;
      
      svg {
        color: var(--color-text-quantidade-pedidos-pendentes);
      }

      &:hover {
        color: ${shade(0.2, '#ff9000')};
      }
    }

    .quantidade {
      border: 2px solid var(--color-notificacao);
      border-radius: 50%;
      width: 3rem;
      background-color: var(--color-notificacao);
      font-weight: 700;
      font-size: 1.8rem;
      text-align: center;
      color: var(--color-text-quantidade-pedidos-pendentes);

      &:hover {
        color: ${shade(0.2, '#ff9000')};
      }
    }
  }

  .mobile {
    display: none;
  }

  .descktop {
    display: flex;
  }

  @media (max-width: 900px) {
    .notificacao {
      margin-left: 5rem;
      height: auto;
      
      .quantidade {
        margin-top: calc(45% - 2px);
      }
    }

    .mobile {
      display: flex;
    }

    .descktop {
      display: none;
    }

    body {
      background: var(--color-background-second);
    }

    position: relative;
    z-index: 9999;
    
    .sub-menu .menu-item {
      background: var(--color-decoracao-menu);
    }

    img {
      width: 50%;
      height: 50%;
      margin-top: 3rem;
      padding: 0;
    }

    .sub-menu {
      position: relative;
      width: 70vw;
      top: 0;
      transform: translateY(0);
    }   

    .menu-mobile {
      content: "";
      animation: ${fade} 0.2s ease-out;
      display: block;
      position: absolute;
      top: calc(25% - 2px);
      right: 2rem;
      color: var(--color-background-second);
      cursor: pointer;
    }

    .menu-mobile-click {
      content: "";
      position: absolute;
      top: calc(25% - 2px);
      right: 2rem;
      color: var(--color-background-second);
      cursor: pointer;
    }

    > ol > .menu-item:after {
      content: "";
      position: absolute;
      width: 0rem;
      height: 0rem;
    }
   
    > ol {
      display: none;
      background: var(--color-background-menu);
      flex-direction: column;
      animation: ${fade} 0.2s ease-out;
    }

    > ol > .menu-item {
      flex: 0;
      opacity: 0;
      animation: ${enter} 0.3s ease-out forwards;
    }
    
    > ol > .menu-item + .menu-item {
      margin-top: 0rem;
    }
    
    > ol > .menu-item:after {
      left: auto;
      right: 1rem;
    }
    
    > ol > .menu-item:hover {
      z-index: 1;
    }

    &:hover::after {
      box-shadow: none;
    }

    ${props =>
    props.isMenu &&
    css`
      > ol {
        display: flex;
      }

      .menu-mobile {
        display: none;
      }

      .menu-mobile-click {
        display: block;
        animation: ${fade} 0.2s ease-out;
      }
    `};
  }

  * {
    box-sizing: border-box;
  }

  *:before, *:after {
    box-sizing: inherit;
  }
`;
