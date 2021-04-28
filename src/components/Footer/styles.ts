import styled from 'styled-components';

export const ContainerFooter = styled.footer`
  background: var(--color-background-menu);
  height: 8rem;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const Marca = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 2rem;


  span {
    margin-left: 1.5rem;
    font-family: 'Poppins-Regular';
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 500;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    color: var(--color-title-in-primary);
  }

  svg {
    color: var(--color-title-in-primary);
  }
`;
