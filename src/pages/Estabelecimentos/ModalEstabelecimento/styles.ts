import styled from 'styled-components';
import { Form as Unform } from '@unform/web';
import { shade } from 'polished';

export const CabecelahoModal = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    width: 95%;
    cursor: pointer;

    svg {
      &:hover {
       color: ${shade(0.2, '#ff9000')};
      }
    }

    @media (max-width: 900px) {
      width: 90%;
    }
  }

  h1 {
    font-weight: 500;
    font-size: 3.6rem;
    line-height: 3.6rem;
    margin-bottom: 40px;

    @media (max-width: 900px) {
      font-size: 2.6rem;
    }
  }
`;

export const Form = styled(Unform)`
  margin: 2rem 2rem 0 2rem;
  text-align: center;
    
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;

  .descricao {
    width: 70%;
    margin-bottom: 1rem;
  }

  .ordem {
    width: 50%;
    margin-bottom: 1rem;
  }

  .codigo_externo {
    margin-top: 0rem;
    width: 45%;
    margin-bottom: 1rem;
  }

  @media (max-width: 900px) { 
    .descricao {
      width: 100%;
      margin-bottom: 1rem;
    }

    .ordem {
      width: 100%;
      margin-bottom: 1rem;
    }

    .codigo_externo {
      margin-top: 0rem;
      width: 100%;
      margin-bottom: 1rem;
    }
  }
`;

export const ToggleContainer = styled.div`
  width: 25%;
  margin-top: 2rem;

  label {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: start;
    cursor: pointer;

    .titulo-segmento {
      font-size: 1.7rem;
      font-family: 'Roboto Silab', serif;
      margin-left: 1.2rem;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const DivButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 1%;

  .button-salvar {
    width: 20rem;
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