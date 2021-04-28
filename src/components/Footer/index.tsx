import React from 'react';
import formatDate from '../../utils/formatDate';
import { FaRegCopyright } from 'react-icons/fa';

import { ContainerFooter, Marca, } from './styles';

interface PropsFooter {
  marginTop: string;
}

const Footer: React.FC<PropsFooter> = ({
  marginTop
}) => {
  const anoAtual = formatDate(new Date(), "yyyy");
  
  return (
    <ContainerFooter style={
      {
        marginTop: marginTop
      }
    }>
      <Marca>
        <FaRegCopyright size={20} />
        <span>{anoAtual} - Estabelecimento</span>
      </Marca>
    </ContainerFooter>
  );
}

export default Footer;
