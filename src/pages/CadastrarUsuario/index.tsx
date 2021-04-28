import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser, FiFileText } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';
import { validarCNPJ, validarCPF } from '../../utils/validarDocumento';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';
import InputMask from '../../components/InputMask';
import ModalNotificacao from '../../components/ModalNotificacao';

interface CadastrarEmpresaFormatData {
  nome_razao_social: string;
  cpf_cnpj: string;
  email: string;
  senha: string;
}

const CadastrarUsuario: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [openModalNotificacao, setOpenModalNotificacao] = useState(false);
  const [tamanhoTela, setTamanhoTela] = useState("50%");
  const [tituloModalNotificacao, setTituloModalNotificacao] = useState("");
  const [mensagemModalNotificacao, setMensagemModalNotificacao] = useState("");
  const [loading, setLoading] = useState(0);

  const cpfCnpjOnChange = useCallback((value: any) => {
    const documento = value.replace(/[^0-9]+/g, '');
    setCpfCnpj(documento);
  }, []);

  const toggleModalNotificacao = useCallback(() => {
    const telaTamanho = window.innerWidth;

    if (telaTamanho <= 835) {
      setTamanhoTela("100%");
    } else {
      setTamanhoTela("736px");
    }

    setOpenModalNotificacao(!openModalNotificacao);
  }, [
    openModalNotificacao,
    setTamanhoTela,
  ]);

  const handleSubmit = useCallback(
    async (data: CadastrarEmpresaFormatData) => {
      try {
        setLoading(1);
        formRef.current?.setErrors({});
        data.cpf_cnpj = data.cpf_cnpj.replace(/[^0-9]+/g, '');

        const schema = Yup.object().shape({
          nome_razao_social: Yup.string().required('Nome / Razão Social é obrigatório!'),
          cpf_cnpj: Yup.string().required('CPF / CNPJ é obrigatório!').min(11, 'CPF menor que o esperado!'),
          email: Yup.string()
            .required('E-mail é obrigatório!')
            .email('Digite um e-mail válido!'),
          senha: Yup.string().min(6, 'No mínimo de 6 dígitos!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // valida o cpf e cnpj
        const documentoValido = data.cpf_cnpj.length === 11 ? validarCPF(data.cpf_cnpj) : validarCNPJ(data.cpf_cnpj);

        if (!documentoValido) {
          setTituloModalNotificacao('Documento inválido!');

          const mensagem = data.cpf_cnpj.length === 11 ? "CPF informado não é válido!" : "CNPJ informado não é válido!";

          setMensagemModalNotificacao(mensagem);
          toggleModalNotificacao();
          return;
        }

        await api.post('/usuario', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'O acesso será liberado após confirmação de pagamento!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        const retornoErro = err.response;
        let mensagem = 'Ocorreu um erro ao fazer o cadastro, tente novamente!';

        if (retornoErro?.status === 400) {
          mensagem = retornoErro.data.message;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: mensagem,
        });
      } finally {
        setLoading(0);
      }
    },
    [addToast, history, toggleModalNotificacao],
  );

  return (
    <>
      <ModalNotificacao
        isOpen={openModalNotificacao}
        setIsOpen={toggleModalNotificacao}
        tamanhoTela={tamanhoTela}
        titulo={tituloModalNotificacao}
        texto={mensagemModalNotificacao}
      />
      <Container>
        <Background />

        <Content>
          <AnimationContainer>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <img src={logoImg} alt="Estabelecimento" />

              <h1>Faça seu cadastro</h1>

              <Input name="nome_razao_social" icon={FiUser} placeholder="Nome/ Razão Social" />
              <InputMask
                mask={cpfCnpj.replace(/[^0-9]+/g, '').length <= 11 ? "999.999.999-999" : "99.999.999/9999-99"}
                defaultValue={cpfCnpj}
                name="cpf_cnpj"
                icon={FiFileText}
                placeholder="CPF/ CNPJ"
                onChange={(e) => cpfCnpjOnChange(e.currentTarget.value)}
              />
              <Input name="email" icon={FiMail} placeholder="E-mail" />
              <Input
                name="senha"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />

              <Button type="submit" loading={loading} textoLoading="Cadastrando...">Cadastrar</Button>

              <Link to="/" className="voltar-logon">
                <FiArrowLeft />
              Voltar para Logon
            </Link>
            </Form>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
};

export default CadastrarUsuario;
