import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --color-background: #8e835e;
    --color-background-second: #fffafa;
    --color-background-menu: #232129;
    --color-title-in-primary: #fffafa;
    --color-title-in-segundary: #232129;
    --color-button: #ff9000;
    --color-button-text: #312e38;
    --color-background-input: #232129;
    --color-background-input-segundary: #fffafa;
    --color-boder-input-error: #c53030;
    --color-text-input: #666360;
    --color-text-input-segundary: #000000
    --color-image-input: #ff9000;
    --color-border-focus-input: #ff9000;
    --color-placeholder-input: #f4ede8;
    --color-placeholder-input-segundary: #232129;
    --color-span: #FFF;
    --color-background-tooltip: #ff9000;
    --color-border-tooltip: #ff9000;
    --color-link-primary: #FFFFFF;
    --color-link-secundary: #f4ede8;
    --color-text-menu: #fffafa;
    --color-decoracao-menu: #8e835e;
    --color-decoracao-sub-menu: #8e835e;
    --color-tab-menu: #fffafa;
    --color-tab-menu-selecionado: #ece5e5;
    --color-toggle-inativo: #ece5e5;
    --color-input-disabled: #ece5e57a;
    --color-label-disabled: #fffafa;
    --color-p-toggle: #3d3d4d;
    --color-background-toggle-ativo: #39b100;
    --color-background-cabecalho-table: #232129;
    --color-linha-tabela-even: #fff;
    --color-linha-tabela-odd: #eee;
    --color-icone-faceboock: #004077;
    --color-icone-instagram: #e26a45;
    --color-icone-linkedin: #0073b1;
    --color-button-modal-sim: #39b100;
    --color-button-modal-nao: #ff0909;
    --color-link: #007bff;
    --color-notificacao: #fffafa;
    --color-text-quantidade-pedidos-pendentes: #ff9000;
    --color-button-visualizacao: #ff9000;

    font-size: 60%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root {
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    flex: 1;
  }

  body {
    color: var(--color-title-in-primary);
    -webkit-flow-smoothing: antialiased;
    display: flex;
    flex-wrap: wrap;
    flex: 1;
  }

  #root {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  body, input, button, textarea, select {
    font-family: 'Roboto Silab', serif;
    font-size: 1.6rem;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  @media (min-width: 700px) {
    :root {
      font-size: 62.5%;
    }
  }
`;
