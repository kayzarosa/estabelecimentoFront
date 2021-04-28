import React from 'react';

import { FiXOctagon, FiCheck, FiX } from 'react-icons/fi';


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
  confirmarAviso: () => void;
}

const ModalAvisos: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  tamanhoTela,
  titulo,
  texto,
  confirmarAviso,
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
        <Button className="button-sim" type="button" onClick={confirmarAviso}>
          <FiCheck size={25} />
          <span>Sim</span>
        </Button>
        <Button className="button-nao" type="button" onClick={setIsOpen}>
          <FiX size={25} />
          <span>Não</span>
        </Button>
      </DivButton>
    </Modal>
  );
};

export default ModalAvisos;
