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
  width: 95%;

  form {
    margin: 2rem 2rem 0 2rem;
    text-align: center;
    
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;

    .cpf-cnpj {
      width: 98%;
      margin-top: 0.8rem;
      margin-bottom: 1rem;
    }

    .codigo-integracao {
      width: 98%;
      margin-bottom: 1rem;
    }

    .nome-razao-social {
      width: 65%;
      margin-bottom: 1rem;
    }

    .apelido-nome-fantasia {
      width: 31.9%;
      margin-bottom: 1rem;
    }

    .logradouro {
      width: 65%;
      margin-bottom: 1rem;
    }

    .numero {
      width: 31.9%;
      margin-bottom: 1rem;
    }

    .complemento {
      width: 65%;
      margin-bottom: 1rem;
    }

    .cep {
      width: 31.9%;
      margin-bottom: 1rem;
    }

    .bairro {
      width: 31.8%;
      margin-bottom: 1rem;
    }

    .estado {
      width: 31.8%;
      margin-bottom: 1rem;
    }

    .cidade {
      width: 31.8%;
      margin-bottom: 1rem;
    }

    .email {
      width: 65%;
      margin-bottom: 1rem;
    }

    .telefone {
      width: 31.9%;
      margin-bottom: 1rem;
    }

    @media (min-width: 1800px) {
      width: 50%;
      margin-left: 25%;
    }

    @media (max-width: 900px) { 
      .cpf-cnpj {
        width: 100%;
      }

      .codigo-integracao {
        width: 100%;
      }

      .codigo-integracao-pdv {
        width: 100%;
      }

      .nome-razao-social {
        width: 100%;
      }

      .apelido-nome-fantasia {
        width: 100%;
      }

      .logradouro {
        width: 100%;
      }

      .numero {
        width: 100%;
      }

      .complemento {
        width: 100%;
      }

      .cep {
        width: 100%;
      }

      .bairro {
        width: 100%;
      }

      .estado {
        width: 100%;
      }

      .cidade {
        width: 100%;
      }

      .email {
        width: 100%;
      }

      .telefone {
        width: 100%;
      }
    }
  }
`;

export const LogotipoInput = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  
  margin-bottom: 1rem;
  position: relative;

  width: 100%;

  img {
    width: 16rem;
    height: 16rem;
    border-radius: 1rem;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: var(--color-button);
    border-radius: 50%;
    border: 0;
    margin-left: 13rem;
    transition: background-color 0.2s;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
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
  width: 95%;
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
