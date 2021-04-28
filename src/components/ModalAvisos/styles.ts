import styled from 'styled-components';
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
  }
`;

export const ConteudoModal = styled.div`
  width: 100%;
  font-size: 2rem;
`;

export const DivButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 1%;

  .button-sim {
    width: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    flex-direction: row;
    background: var(--color-button-modal-sim);
  }

  .button-nao {
    margin-left: 1rem;
    width: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    flex-direction: row;
    background: var(--color-button-modal-nao);
  }

  @media (max-width: 900px) { 
    margin-right: 0;

    .button-sim {
      width: 100%;
    }

    .button-nao {
      width: 100%;
    }
  }
`;