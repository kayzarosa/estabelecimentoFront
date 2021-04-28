import React, { useState, useEffect, useMemo } from 'react';

import ReactModal from 'react-modal';

interface IModalProps {
  children: any;
  tamanhoTela: string;
  alturaTela?: string;
  isOpen: boolean;
  setIsOpen: () => void;
}

const Modal: React.FC<IModalProps> = ({ 
  children, 
  tamanhoTela,
  alturaTela,
  isOpen, 
  setIsOpen 
}) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  const styleModal = useMemo(() => {
    return {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        height: alturaTela ? alturaTela : 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'var(--color-background-second)',
        color: '#000000',
        borderRadius: '8px',
        width: tamanhoTela,
        border: 'none',
      },
      overlay: {
        backgroundColor: '#121214e6',
      },
    };
  }, [tamanhoTela, alturaTela]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={styleModal}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
