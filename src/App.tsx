import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Routes from './routes';

import AppProvider from './hooks';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Header />
        <Routes />
      </AppProvider>

      <GlobalStyle />
    </Router>
  );
};

export default App;
