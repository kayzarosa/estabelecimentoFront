import React from 'react';

import { FiXOctagon, FiCheck } from 'react-icons/fi';


import {
  CabecelahoModal,
  DivButton,
  ConteudoModal,
} from './styles';

import Modal from '../Modal';

import Button from '../Button';

interface IModalProps {
  isOpen: boolean;
  tamanhoTela: string;
  titulo: string;
  texto: string;
  setIsOpen: () => void;
}

const ModalNotificacao: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  tamanhoTela,
  titulo,
  texto,
}) => {

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} tamanhoTela={tamanhoTela}>
      <CabecelahoModal>
        <div onClick={setIsOpen}>
          <FiXOctagon size={25} />
        </div>
        <h1>{titulo}</h1>
      </CabecelahoModal>

      <ConteudoModal>
        {texto}
      </ConteudoModal>

      <DivButton>
        <Button className="button-ok" type="button" onClick={setIsOpen}>
          <FiCheck size={25} />
          <span>Ok</span>
        </Button>
      </DivButton>
    </Modal>
  );
};

export default ModalNotificacao;
