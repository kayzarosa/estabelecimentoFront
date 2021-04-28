import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

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

export const Conteiner = styled.div`
  background: var(--color-background-second);
  width: 100%;
  height: 100%;

  color: var(--color-title-in-segundary);
`;

export const Conteudo = styled.div`
  width: 100%;
`;

export const AnimacaoConteiner = styled.div`
  animation: ${appearFromRight} 1s;
  margin-top: 0px;
  margin: 5%;
  width: 90%;

  form {
    margin: 2rem 2rem 0 2rem;
    text-align: center;
    
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;

    .senha {
      width: 70%;
      margin-top: 0.8rem;
      margin-bottom: 1rem;
    }

    .confirmar-senha {
      width: 70%;
      margin-bottom: 1rem;
    }

    @media (min-width: 1800px) {
      width: 50%;
      margin-left: 25%;
    }

    @media (max-width: 900px) { 
      .senha {
        width: 100%;
      }

      .confirmar-senha {
        width: 100%;
      }
    }
  }
`;

export const DivButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 1%;

  .button-salvar {
    width: 25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;

    flex-direction: row;
  }

  @media (max-width: 900px) { 
    margin-right: 0;

    .button-salvar {
      width: 100%;
    }
  }
`;

export const Tabs = styled.div`
  margin-top: -3%;
  width: 100%;
  display: flex;

  .tabActive {
    background: var(--color-tab-menu-selecionado);
  }

  @media (max-width: 900px) {
    margin-top: 0;
  }

  @media (min-width: 1800px) {
    margin-top: -5%;
  }
`;

export const TabOption = styled.button`
  background: var(--color-tab-menu);
  width: 16rem;
  height: 5rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;

  border-bottom: 0;
  border-radius: 1rem 1rem 0 0;

  & + button {
    margin-left: 0.2rem;
  }

  span {
    margin-left: 2rem;
  }

  &:hover {
    background: ${shade(0.2, '#fffafa')};
  }
`;

export const TabConteiner = styled.div`
  width: 100%;
  border: 1px solid;

  .contentActive {
    display: block;
    animation: ${appearFromRight} 1s;
  }

  .contentInactive {
    display: none;
    animation: ${appearFromRight} 1s;
  }
`;

export const TabContent = styled.div`
  h1 {
    font-size: 2.5rem;
    margin-left: 5rem;
    margin-top: 2rem;
  }
`;
