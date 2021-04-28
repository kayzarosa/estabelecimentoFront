import React, { useRef, useState, useCallback, useMemo } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Footer from '../../components/Footer';

import {
  Conteiner,
  Conteudo,
  AnimacaoConteiner,
  DivButton,
  Tabs,
  TabOption,
  TabConteiner,
  TabContent,
} from './styles';

import { FiSave, FiList } from 'react-icons/fi';

interface IEmpresaDataForm {
  senha: string;
  confirmar_senha: string;
}

const AlterarSenha: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const { usuario, signOut } = useAuth();
  const { addToast } = useToast();
  
  const alterarSenha = useCallback(async (data: IEmpresaDataForm) => {
    try {
      setLoading(true);

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

      await api.put(`/usuario/alterar-senha/${usuario.id}`, {
        senha
      });

      addToast({
        type: 'success',
        title: 'Senha atualizada!',
        description:
          'Sua senha foi atualizada com sucesso!',
      });

      formRef.current?.reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      const retornoErro = err.response;
      let mensagem = 'Ocorreu algum erro ao tentar alterar a sua senha!';

      if (retornoErro.status === 400) {
        mensagem = retornoErro.data.message;
      }

      if (retornoErro.data.message === 'Token inválido') {
        signOut();
      }

      addToast({
        type: 'error',
        title: 'Erro na atualização da senha',
        description: mensagem,
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, usuario, signOut]);

  const tamanhoTelaFooter = useMemo(() => {
    return window.innerWidth > 1486 ? window.innerHeight / 22 + 'rem' : window.innerHeight / 45 + 'rem';
  }, []);
  
  return (
    <Conteiner>

      <Conteudo>
        <AnimacaoConteiner>

          <Tabs>
            <TabOption className="tabActive">
              <FiList size={20} />
              <span>Alterar Senha</span>
            </TabOption>
          </Tabs>

          <TabConteiner>
            <TabContent className="contentActive">
              <h1>Alterar Senha</h1>

              <Form
                ref={formRef}
                onSubmit={alterarSenha}
              >
                <Input type="password" className="senha" name="senha" labelInput="Senha" mudarCor="1" />
                <Input type="password" className="confirmar-senha" name="confirmar_senha" labelInput="Confirmar Senha" mudarCor="1" />

                <DivButton>
                  <Button className="button-salvar" loading={Number(loading)} textoLoading="Salvando..." type="submit">
                    <FiSave size={25} />
                    <span>Salvar</span>
                  </Button>
                </DivButton>
              </Form>

              <br />
            </TabContent>
          </TabConteiner>

        </AnimacaoConteiner>
      </Conteudo>
      
      <Footer marginTop={tamanhoTelaFooter} />
    </Conteiner>
  );
}

export default AlterarSenha;
