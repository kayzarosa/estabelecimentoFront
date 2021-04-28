import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface LoginFormData {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório!')
            .email('Digite um e-mail válido!'),
          senha: Yup.string().required('Senha obrigatória!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          senha: data.senha,
        });

        history.push('/estabelecimento');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        const retornoErro = err.response;
        let mensagem = 'Ocorreu um erro ao fazer login, cheque as credênciais!';

        if (retornoErro?.status === 400) {
          mensagem = retornoErro.data.message;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: mensagem,
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <img src={logoImg} alt="Delivery" />
            
            <h1>Faça seu logon</h1>

            <Input name="email" icon={FiMail} placeholder="Email" />
            <Input
              name="senha"
              icon={FiLock}
              type="password"
              placeholder="Senha"
              autoComplete="on"
            />

            <Button type="submit">Entrar</Button>

            <Link to="/recuperar-senha">Esqueci minha senha</Link>

            <Link to="/cadastrar" className="criar-conta">
              <FiLogIn />
              Criar conta
            </Link>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default Login;
