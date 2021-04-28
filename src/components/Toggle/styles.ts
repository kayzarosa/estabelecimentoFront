import styled from 'styled-components';

export const ConteinerToggle = styled.div`
    display: flex;
    align-items: center;

    p {
      color: var(--color-p-toggle);
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 6rem;
      height: 3.2rem;
      margin-left: 12px;

      & input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--color-toggle-inativo);
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 16px;

        &:before {
          position: absolute;
          content: '';
          height: 2rem;
          width: 2rem;
          left: 8px;
          bottom: 6px;
          background-color: white;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          border-radius: 10px;
        }
      }

      input:checked + .slider {
        background-color: var(--color-background-toggle-ativo);
      }

      input:focus + .slider {
        box-shadow: 0 0 1px #2196f3;
      }

      input:checked + .slider:before {
        -webkit-transform: translateX(3rem);
        -ms-transform: translateX(3rem);
        transform: translateX(2.5rem);
      }
    }
`;
