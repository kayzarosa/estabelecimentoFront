import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import Footer from '../../components/Footer';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import ModalEstabelecimento from './ModalEstabelecimento';
import ModalAvisos from '../../components/ModalAvisos';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';

import { FiList, FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';

import {
  Conteiner,
  Conteudo,
  AnimacaoConteiner,
  PesquisaContainer,
  DivButton,
  EstabelecimentoContainer,
  CabecalhoEstabelecimento,
  ConteudoEstabelecimento,
} from './styles';

interface IEstabelecimento {
  id: number;
  descricao: string;
  inativo: boolean;
  ordem: string;
  codigo_externo?: string;
  inativo_descricao?: string;
}

const Estabelecimentos: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tamanhoTela, setTamanhoTela] = useState("50%");
  const [estabelecimentos, setEstabelecimento] = useState<IEstabelecimento[]>([]);
  const [listaEstabelecimentoOriginal, setListaEstabelecimentoOriginal] = useState<IEstabelecimento[]>([]);
  const [editarEstabelecimento, setEditarEstabelecimento] = useState<IEstabelecimento>({} as IEstabelecimento);
  const [modalOperacao, setModalOperacao] = useState(true);
  const [idEstabelecimento, setIdEstabelecimento] = useState(0);
  const [openModalMensagemDeletar, setOpenModalMensagemDeletar] = useState(false);

  const { addToast } = useToast();

  const { usuario, signOut } = useAuth();

  const toggleModal = useCallback((insert?: boolean) => {
    const telaTamanho = window.innerWidth;

    if (telaTamanho <= 835) {
      setTamanhoTela("100%");
    } else {
      setTamanhoTela("736px");
    }

    if (insert) {
      setEditarEstabelecimento({} as IEstabelecimento);
      setModalOperacao(true);
    } else {
      setModalOperacao(false);
    }

    setModalOpen(!modalOpen);
  }, [setModalOpen, modalOpen, setTamanhoTela, setModalOperacao]);

  const abrirModalAlterar = useCallback((estabelecimento: IEstabelecimento) => {
    setEditarEstabelecimento(estabelecimento);

    toggleModal(false);
  }, [toggleModal]);

  const adicionarEstabelecimento = useCallback(
    async (estabelecimento: Omit<IEstabelecimento, 'id'>) => {
      try {

        const response = await api.post('/estabelecimento', estabelecimento);

        let novoEstabelecimento = response.data;

        novoEstabelecimento.inativo_descricao = (novoEstabelecimento.inativo) ? 'Sim' : 'Não';

        let estabelecimentoList = listaEstabelecimentoOriginal;

        estabelecimentoList.push(novoEstabelecimento);

        estabelecimentoList.sort(function (a: any, b: any) {
          if (a.descricao > b.descricao) return 1;

          if (a.descricao < b.descricao) return -1;

          return 0;
        });

        setEstabelecimento(estabelecimentoList);
        setListaEstabelecimentoOriginal(estabelecimentoList);

        formRef.current?.reset();
      } catch (err) {
        const retornoErro = err.response;
        let mensagem = 'Ocorreu algum erro ao cadastrar o estabelecimento!';

        if (retornoErro?.status === 400) {
          mensagem = retornoErro.data.message;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro do estabelecimento',
          description: mensagem,
        });
      }
    },
    [addToast, setEstabelecimento, usuario, listaEstabelecimentoOriginal],
  );

  const alterarEstabelecimento = useCallback(
    async (estabelecimento: Omit<IEstabelecimento, 'id'>) => {
      try {
        const response = await api.put(`/estabelecimento/${editarEstabelecimento.id}`, estabelecimento);

        let alteraEstabelecimento = response.data;

        alteraEstabelecimento.inativo_descricao = (alteraEstabelecimento.inativo) ? 'Sim' : 'Não';

        const listaCategoria = listaEstabelecimentoOriginal.map((estabelecimentoAtual: IEstabelecimento) => {
          if (estabelecimentoAtual.id !== alteraEstabelecimento.id) {
            return estabelecimentoAtual;
          }

          return alteraEstabelecimento;
        });

        listaCategoria.sort(function (a: any, b: any) {
          if (a.descricao > b.descricao) return 1;

          if (a.descricao < b.descricao) return -1;

          return 0;
        });

        setEstabelecimento(listaCategoria);
        setListaEstabelecimentoOriginal(listaCategoria);

        formRef.current?.reset();
      } catch (err) {
        const retornoErro = err.response;
        let mensagem = 'Ocorreu algum erro ao alterar o estabelecimento!';

        if (retornoErro?.status === 400) {
          mensagem = retornoErro.data.message;
        }

        addToast({
          type: 'error',
          title: 'Erro ao alterar estabelecimento',
          description: mensagem,
        });
      }
    },
    [addToast, setEstabelecimento, listaEstabelecimentoOriginal, editarEstabelecimento],
  );

  const filtarEstabelecimento = useCallback((e) => {
    const filtro = e.target.value;
    if (!filtro) {
      setEstabelecimento(listaEstabelecimentoOriginal);
      return;
    }

    const categoriaFiltrada = listaEstabelecimentoOriginal.filter(
      estabelecimentoFind =>
        estabelecimentoFind.descricao.toLowerCase().indexOf(filtro.toLowerCase()) >= 0
    );

    setEstabelecimento(categoriaFiltrada);
  }, [listaEstabelecimentoOriginal]);

  useEffect(() => {
    api.get(`/estabelecimento`).then((response) => {
      const estabelecimentos = response.data.map((estabelecimento: IEstabelecimento) => {
        return {
          ...estabelecimento,
          inativo_descricao: (estabelecimento.inativo) ? 'Sim' : 'Não',
        }
      });

      setEstabelecimento(estabelecimentos);
      setListaEstabelecimentoOriginal(estabelecimentos);
    }).catch((err) => {
      const retornoErro = err.response;
      if (retornoErro.data.message === 'Token inválido') {
        signOut();
      }
    });
  }, [signOut]);

  const toggleModalDeletar = useCallback((idEstabelecimento?: number) => {
    const telaTamanho = window.innerWidth;

    if (idEstabelecimento) {
      setIdEstabelecimento(idEstabelecimento);
    }

    if (telaTamanho <= 835) {
      setTamanhoTela("100%");
    } else {
      setTamanhoTela("736px");
    }

    setOpenModalMensagemDeletar(!openModalMensagemDeletar);
  }, [
    openModalMensagemDeletar,
    setTamanhoTela,
  ]);

  const tamanhoTelaFooter = useMemo(() => {
    return window.innerWidth > 1486 ? window.innerHeight / 19 + 'rem' : window.innerHeight / 19 + 'rem';
  }, []);

  const deletarProdutoAdicional = useCallback(async () => {
    try {
      await api.delete(`/estabelecimento/${idEstabelecimento}`);

      const estabelecimentoList = listaEstabelecimentoOriginal.filter(estabelecimentos => estabelecimentos.id !== idEstabelecimento);

      setEstabelecimento(estabelecimentoList);
      setListaEstabelecimentoOriginal(estabelecimentoList);

      setOpenModalMensagemDeletar(!openModalMensagemDeletar);
    } catch (err) {
      const retornoErro = err.response;
      let mensagem = 'Ocorreu algum erro ao deletar o estabelecimento!';

      if (retornoErro?.status === 400) {
        mensagem = retornoErro.data.message;
      }

      addToast({
        type: 'error',
        title: 'Erro ao tentar deletar estabelecimento',
        description: mensagem,
      });
    }
  }, [
    idEstabelecimento,
    openModalMensagemDeletar,
    addToast
  ]);

  return (
    <>
      <ModalEstabelecimento
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        adicionarEstabelecimento={adicionarEstabelecimento}
        tamanhoTela={tamanhoTela}
        modalOperacao={modalOperacao}
        alterarEstabelecimento={alterarEstabelecimento}
        editarEstabelecimento={editarEstabelecimento}
      />

      <ModalAvisos
        isOpen={openModalMensagemDeletar}
        setIsOpen={toggleModalDeletar}
        tamanhoTela={tamanhoTela}
        titulo="Produto"
        texto="Tem certeza que deseja remover o estabelecimento?"
        confirmarAviso={deletarProdutoAdicional}
      />

      <Conteiner>
        <Conteudo>
          <AnimacaoConteiner>
            <h1>Estabelecimento</h1>

            <PesquisaContainer>
              <Form ref={formRef} onSubmit={() => { }}>
                <Input
                  className="buscar-estabelecimento"
                  name="estabelecimento"
                  placeholder="BUSCAR ESTABELECIMENTO"
                  icon={FiList}
                  mudarCor="1"
                  onKeyUp={e => { filtarEstabelecimento(e) }}
                />
              </Form>
            </PesquisaContainer>

            <EstabelecimentoContainer>
              <DivButton>
                <div className="button-add" onClick={() => { toggleModal(true) }}>
                  <FiPlus size={23} />
                  <span>Adicionar</span>
                </div>
              </DivButton>
              <CabecalhoEstabelecimento>
                <div className="titulo">Código</div>

                <div className="titulo">Descrição</div>

                <div className="titulo">Ordem</div>

                <div className="titulo">Inativo</div>

                <div className="botoes">Editar</div>

                <div className="botoes">Excluir</div>
              </CabecalhoEstabelecimento>

              {estabelecimentos.length === 0 && (
                <div className="informativo">Não foi encontrada nenhum estabelecimento!</div>
              )}

              {estabelecimentos && estabelecimentos.map((estabelecimento) => (
                <ConteudoEstabelecimento key={estabelecimento.id}>
                  <div className="conteudo">
                    <strong>Código: </strong>
                    {estabelecimento.id}
                  </div>
                  <div className="conteudo">
                    <strong>Descrição: </strong>
                    {estabelecimento.descricao}
                  </div>
                  <div className="conteudo">
                    <strong>Ordem: </strong>
                    {estabelecimento.ordem}°
                  </div>
                  <div className="conteudo">
                    <strong>Inativo: </strong>
                    {estabelecimento.inativo_descricao}
                  </div>
                  <div className="botoes">
                    <FiEdit size={25} onClick={() => { abrirModalAlterar(estabelecimento) }} />
                  </div>
                  <div className="botoes">
                    <FiTrash2 size={25} onClick={() => { toggleModalDeletar(estabelecimento.id) }} />
                  </div>
                </ConteudoEstabelecimento>
              ))}
            </EstabelecimentoContainer>
          </AnimacaoConteiner>
        </Conteudo>

        <Footer marginTop={tamanhoTelaFooter} />
      </Conteiner >
    </>
  );
}

export default Estabelecimentos;
