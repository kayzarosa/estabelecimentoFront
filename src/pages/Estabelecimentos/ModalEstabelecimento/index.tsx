import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';

import { FiXOctagon, FiSave } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import {
  Form,
  ToggleContainer,
  CabecelahoModal,
  DivButton,
} from './styles';

import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import Toggle from '../../../components/Toggle';

import getValidationErrors from '../../../utils/getValidationErrors';
import Button from '../../../components/Button';


interface IEstabelecimento {
  id: number;
  descricao: string;
  inativo: boolean;
  ordem: string;
  codigo_externo?: string;
}

interface ICriarCategoriaData {
  descricao: string;
  inativo: boolean;
  ordem: string;
  codigo_externo?: string;
}

interface IModalProps {
  isOpen: boolean;
  tamanhoTela: string;
  modalOperacao: boolean;
  editarEstabelecimento: IEstabelecimento;
  setIsOpen: () => void;
  adicionarEstabelecimento: (categoria: Omit<IEstabelecimento, 'id'>) => void;
  alterarEstabelecimento: (categoria: Omit<IEstabelecimento, 'id'>) => void;
}

const ModalCategoria: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  tamanhoTela,
  modalOperacao,
  editarEstabelecimento,
  adicionarEstabelecimento,
  alterarEstabelecimento,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const toggleAvailable = useCallback(() => {
    editarEstabelecimento.inativo = !editarEstabelecimento.inativo;
  }, [editarEstabelecimento.inativo]);
  
  const salvarCategoria = useCallback(
    async (data: ICriarCategoriaData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          descricao: Yup.string().required('Descrição é obrigatória!'),
          ordem: Yup.string().required('Ordem é obrigatória!'),
          codigo_externo: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = {
          descricao: data.descricao,
          inativo: editarEstabelecimento.inativo,
          ordem: data.ordem,
          ...(data.codigo_externo
            ? {
              codigo_externo: data.codigo_externo,
            }
            : {}),
        };

        if (modalOperacao) {
          await adicionarEstabelecimento(formData);
        } else {
          await alterarEstabelecimento(formData);
        }

        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      } finally {
        setLoading(false);
      }
    },
    [
      adicionarEstabelecimento,
      alterarEstabelecimento,
      setIsOpen,
      modalOperacao,
      editarEstabelecimento.inativo,
    ],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} tamanhoTela={tamanhoTela}>
      <CabecelahoModal>
        <div onClick={setIsOpen}>
          <FiXOctagon size={25} />
        </div>
        <h1>{(modalOperacao) ? 'Nova' : 'Alterar'} Estabelecimento</h1>
      </CabecelahoModal>
      <Form ref={formRef} onSubmit={salvarCategoria} initialData={editarEstabelecimento}>
        <Input className="descricao" name="descricao" labelInput="Descrição" mudarCor="1" />

        <ToggleContainer>
          <label>
            <Toggle
              name="inativo"
              id="categoria_inativo"
              available={editarEstabelecimento.inativo || false}
              toggleAvailable={toggleAvailable}
            />
            <span className="titulo-segmento">Inativo</span>
          </label>
          <br />
        </ToggleContainer>

        <Input type="number" className="ordem" name="ordem" labelInput="Ordem" mudarCor="1" />
        <Input className="codigo_externo" name="codigo_externo" labelInput="Código externo" mudarCor="1" />

        <DivButton>
          <Button className="button-salvar" loading={Number(loading)} textoLoading="Salvando..." type="submit">
            <FiSave size={25} />
            <span>Salvar</span>
          </Button>
        </DivButton>
      </Form>
    </Modal>
  );
};

export default ModalCategoria;
