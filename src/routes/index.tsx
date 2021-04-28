import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import CadastrarUsuario from '../pages/CadastrarUsuario';
import RecuperarSenha from '../pages/RecuperarSenha';
import ResetarSenha from '../pages/ResetarSenha';

import MeusDados from '../pages/MeusDados';

import Estabelecimentos from '../pages/Estabelecimentos';

import AlterarSenha from '../pages/AlterarSenha';


const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/cadastrar" exact component={CadastrarUsuario} />

    <Route path="/recuperar-senha" exact component={RecuperarSenha} />
    <Route path="/resetar-senha" exact component={ResetarSenha} />

    <Route path="/estabelecimento" exact component={Estabelecimentos} isPrivate />

    <Route path="/meus-dados" exact component={MeusDados} isPrivate />

    <Route path="/alterar-senha" exact component={AlterarSenha} isPrivate />

  </Switch>
);

export default Routes;
