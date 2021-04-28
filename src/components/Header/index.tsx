import React, { useState, useCallback } from 'react';
import { useAuth } from '../../hooks/auth';
import { Link } from 'react-router-dom';

import { ContainerMenu, } from './styles';

import { FiMenu, FiMinus } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

const Header: React.FC = () => {
  const { signOut, usuario } = useAuth();
  const [isMenu, setIsMenu] = useState(false);

  const clickMenu = useCallback(async () => {
    setIsMenu(!isMenu);
  }, [isMenu]);


  return (
    <>
      {usuario && (
        <ContainerMenu isMenu={isMenu}>
          <ol>
            <img src={logoImg} alt="Estabelecimento" />

            <li className="menu-item"><Link to="estabelecimento" onClick={clickMenu}>Estabelecimento</Link></li>
            <li className="menu-item"><Link to="meus-dados" onClick={clickMenu}>Meus dados</Link></li>
            <li className="menu-item"><Link to="alterar-senha" onClick={clickMenu}>Alterar Senha</Link></li>
            <li className="menu-item">
              <a href="#0">{usuario.email}</a>
              <ol className="sub-menu">
                <li className="menu-item"><a href="#0" onClick={signOut}>Sair</a></li>
              </ol>
            </li>
          </ol>

          <FiMenu size={50} className="menu-mobile" onClick={clickMenu} />
          <FiMinus size={45} className="menu-mobile-click" onClick={clickMenu} />
        </ContainerMenu>
      )}
    </>
  );
}

export default Header;
