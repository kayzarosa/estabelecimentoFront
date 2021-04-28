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
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AnimacaoConteiner = styled.div`
  animation: ${appearFromRight} 1s;
  margin-top: 30px;
  width: 90%;

  h1 {
    font-size: 2.5rem;
    margin-left: 5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 900px) { 
    h1 {
      margin-left: 0;
    }
  }
`;

export const PesquisaContainer = styled.div`
  form {
      margin: 3rem 5rem 2rem 5rem;

      .buscar-estabelecimento {
        width: 100%;
        height: 4rem;
      }    
  }

  @media (max-width: 900px) { 
    form {
      margin: 0 0 2rem 0;
    }
    margin: auto;
  }
`;

export const EstabelecimentoContainer = styled.section`
  margin: 3rem 5rem 2rem 5rem;
  width: 91%;

  .informativo {
    width: 100%;
    margin-top: 5rem;
    font-size: 2rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 1800px) {
    width: 96%;
  }

  @media (max-width: 900px) { 
    margin: auto;
  }
`;

export const DivButton = styled.div`
  background: var(--color-background-cabecalho-table);
  border-radius: 1rem 1rem 0 0;
  height: 4rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;

  .button-add {
    color: var(--color-button);
    width: 15rem;
    font-size: 1.9rem;
    display: flex;
    align-content: center;
    justify-content: center;
    font-weight: 700;
    cursor: pointer;

    span {
      margin-left: 1rem;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const CabecalhoEstabelecimento = styled.div`
  background: var(--color-background-cabecalho-table);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 5rem;

  .titulo {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 700;
    width: 25%;
    color: var(--color-title-in-primary)
  }

  .botoes {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 700;
    width: 10%;
    color: var(--color-title-in-primary)
  }

  @media (max-width: 900px) { 
    display: none;
  }
`;

export const ConteudoEstabelecimento = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 5rem;
  
  .conteudo {
    font-size: 1.8rem;
    text-align: center;
    width: 25%;

    strong {
      display: none;
    }
  }

  .botoes {
    text-align: center;
    width: 10%;
    cursor: pointer;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }

  @media (max-width: 900px) { 
    display: flow-root;
    justify-content: left;

    .conteudo {
      display: flex;
      align-content: center;

      text-align: left;
      width: 100%;

      strong {
        display: contents;
        font-size: 1.8rem;
        font-weight: 700;
        margin-right: 1rem;
      }
    }

    .botoes {
      text-align: right;
      width: 100%;
      margin-left: -2rem;
    }
  }
  
  &:nth-child(even) {
    background: var(--color-linha-tabela-even);
  }

  &:nth-child(odd) {
    background: var(--color-linha-tabela-odd);
  }
`;