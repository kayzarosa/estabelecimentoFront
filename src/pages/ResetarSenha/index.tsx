import React, { useRef, useCallback, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

interface ResetarSenhaFormData {
  senha: string;
  confirmar_senha: string;
}

const ResetarSenha: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { search } = useLocation();
  const [loading, setLoading] = useState(0);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ResetarSenhaFormData) => {
      try {
        setLoading(1);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          senha: Yup.string().required('Senha obrigatória!'),
          confirmar_senha: Yup.string().oneOf(
            [Yup.ref('senha'), undefined],
            'Senha não é igual',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { senha } = data;
        const token = search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/recuperar/redefinir', {
          senha,
          token,
        });

        history.push('/');

        addToast({
          type: 'success',
          title: 'Senha redefinida!',
          description:
            'Senha redefinida com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        const retornoErro = err.response;
        let mensagem = 'Ocorreu um erro ao resetar sua senha, tente novamente!';
        
        if (retornoErro?.status === 400) {
          mensagem = retornoErro.data.message;
        }
        
        addToast({
          type: 'error',
          title: 'Erro ao redefinir a senha',
          description: mensagem,
        });
      } finally {
        setLoading(0);
      }
    },
    [addToast, history, search],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Estabelecimento" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              name="senha"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
            />

            <Input
              name="confirmar_senha"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />

            <Button type="submit" loading={loading} textoLoading="Alterando...">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ResetarSenha;
