import React, { useRef, useState, useCallback, ChangeEvent, useEffect, useMemo } from 'react';
import Footer from '../../components/Footer';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import InputMask from '../../components/InputMask';

import {
  Conteiner,
  Conteudo,
  AnimacaoConteiner,
  LogotipoInput,
  DivButton,
  Tabs,
  TabOption,
  TabConteiner,
  TabContent,
} from './styles';

import { FiCamera, FiSave, FiList, FiCopy } from 'react-icons/fi';
import fotoImg from '../../assets/camera.png';

interface IEstado {
  id: number;
  nome: string;
  sigla: string;
}

interface ICidade {
  id: number;
  nome: string;
}

interface IUsuarioDataForm {
  cpf_cnpj: string;
  nome_razao_social: string;
  apelido_nome_fantasia: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  estado_id: number;
  cidade_id: number;
  email: string;
  telefone: string;
  codigo_integracao: string;
  foto_usuario?: string;
}

const MeusDados: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);
  const [estados, setEstados] = useState<IEstado[]>([]);
  const [cidades, setCidades] = useState<ICidade[]>([]);

  const [tabAtual, setTabAtual] = useState('meus_dados');
  const { addToast } = useToast();

  const { usuario, updateUsuario, signOut } = useAuth();

  const [estadoAtual, setEstadoAtual] = useState(usuario.estado_id);
  const [cidadeAtual, setCidadeAtual] = useState(usuario.cidade_id);

  const [telefone, setTelefone] = useState(usuario.telefone);

  const telefoneOnChange = useCallback((value: any) => {
    const tel = value.replace(/[^0-9]+/g, '');
    setTelefone(tel);
  }, []);

  const openTab = useCallback((idTab) => {
    setTabAtual(idTab);
  }, []);

  const alterarFoto = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {

        if (files.length === 0) {
          return;
        }

        if (files[0].size > 3000000) {
          addToast({
            type: 'error',
            title: 'Foto é maior que 3MB!',
          });

          return;
        }

        const data = new FormData();

        data.append('foto', files[0]);

        await api.patch('/usuario/foto', data).then((response) => {
          updateUsuario(response.data);

          addToast({
            type: 'success',
            title: 'Foto atualizado!',
          });
        });
      }
    },
    [addToast, updateUsuario],
  );

  const buscarCidade = useCallback(async (estado_id: number) => {
    if (!estado_id) {
      setCidades([]);
      return;
    }

    setEstadoAtual(estado_id);

    try {
      const { data } = await api.get(`/cidade/${estado_id}`);

      setCidades(data);

    } catch (error) {
      setCidades([]);
    }
  }, []);

  const atualizarValueCidadeSelect = useCallback((cidade_id: number) => {
    setCidadeAtual(cidade_id);
  }, []);

  useEffect(() => {
    api.get('/estado').then((response) => {
      setEstados(response.data);

      if (usuario.estado_id) {
        buscarCidade(usuario.estado_id);
      }
    }).catch((err) => {
      const retornoErro = err.response;
      if (retornoErro.data.message === 'Token inválido') {
        signOut();
      }
    });
  }, [usuario, buscarCidade, signOut]);

  const salvarDadosUsuario = useCallback(async (data: IUsuarioDataForm) => {
    try {
      setLoading(true);

      formRef.current?.setErrors({});

      data.telefone = data.telefone.replace(/[^0-9]+/g, '');
      data.cpf_cnpj = data.cpf_cnpj.replace(/[^0-9]+/g, '');

      const schema = Yup.object().shape({
        nome_razao_social: Yup.string().required('Nome/ Razão Social é obrigatório!'),
        apelido_nome_fantasia: Yup.string().required('Apelido/ Fantasia é obrigatório!'),
        logradouro: Yup.string().required('Logradouro é obrigatório!'),
        numero: Yup.string().required('Número é obrigatório!'),
        complemento: Yup.string(),
        cep: Yup.string().required('CEP é obrigatório!'),
        bairro: Yup.string().required('Bairro é obrigatório!'),
        estado_id: Yup.string().required('Estado é obrigatório!'),
        cidade_id: Yup.string().required('Cidade é obrigatório!'),
        email: Yup.string()
          .required('E-mail é obrigatório!')
          .email('Digite um e-mail válido!'),
        telefone: Yup.string().required('Telefone é obrigatório!'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        nome_razao_social,
        apelido_nome_fantasia,
        logradouro,
        numero,
        complemento,
        cep,
        bairro,
        estado_id,
        cidade_id,
        email,
        telefone,
      } = data;

      const formData = {
        cpf_cnpj: usuario.cpf_cnpj,
        nome_razao_social,
        apelido_nome_fantasia,
        logradouro,
        numero,
        cep,
        bairro,
        estado_id,
        cidade_id,
        email,
        telefone,
        ...(complemento
          ? {
            complemento,
          }
          : {}),
      };

      const response = await api.put('/usuario/alterar', formData);

      updateUsuario(response.data);

      addToast({
        type: 'success',
        title: 'Usuário atualizado!',
        description:
          'Suas informações do usuário foram atualizadas com sucesso!',
      });
    } catch (err) {
      console.log(err, 'errooo');
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      const retornoErro = err.response;
      let mensagem = 'Ocorreu algum erro ao tentar atualizar os dados do usuário!';

      if (retornoErro?.status === 400) {
        mensagem = retornoErro.data.message;
      }

      addToast({
        type: 'error',
        title: 'Erro na atualização do usuário',
        description: mensagem,
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, updateUsuario, usuario.cpf_cnpj]);
  
  const copiarCodigoIntegracao = useCallback(() => {
    let textInput: HTMLInputElement = document.getElementById('codigo_integracao') as HTMLInputElement;

    textInput.select();

    document.execCommand('copy');
    
  }, []);

  const tamanhoTelaFooter = useMemo(() => {
    return window.innerWidth > 1486 ? window.innerHeight / 34 + 'rem' : window.innerHeight / 30 + 'rem';
  }, []);

  return (
    <Conteiner>
      <Conteudo>
        <AnimacaoConteiner>

          <Tabs>
            <TabOption className={tabAtual === 'meus_dados' ? 'tabActive' : 'tabInactive'} onClick={() => openTab('meus_dados')}>
              <FiList size={20} />
              <span>Meus Dados</span>
            </TabOption>
          </Tabs>

          <TabConteiner>
            <TabContent className={tabAtual === 'meus_dados' ? 'contentActive' : 'contentInactive'}>
              <h1>Meus Dados</h1>
              <LogotipoInput>
                <img src={usuario.foto_usuario || fotoImg} alt={usuario.apelido_nome_fantasia} />

                <label htmlFor="logotipo">
                  <FiCamera />

                  <input type="file" id="logotipo" accept="image/*" onChange={alterarFoto} />
                </label>
              </LogotipoInput>

              <Form
                ref={formRef}
                initialData={{
                  nome_razao_social: usuario.nome_razao_social,
                  apelido_nome_fantasia: usuario.apelido_nome_fantasia,
                  logradouro: usuario.logradouro,
                  numero: usuario.numero,
                  complemento: usuario.complemento,
                  bairro: usuario.bairro,
                  email: usuario.email,
                  codigo_integracao: usuario.codigo_integracao
                }}
                onSubmit={salvarDadosUsuario}
              >
                <InputMask
                  mask={!usuario.cpf_cnpj ? "999.999.999-99" : usuario.cpf_cnpj.replace(/[^0-9]+/g, '').length <= 11 ? "999.999.999-99" : "99.999.999/9999-99"}
                  className="cpf-cnpj"
                  name="cpf_cnpj"
                  labelInput="CPF/ CNPJ"
                  disabled mudarCor="1"
                  defaultValue={usuario.cpf_cnpj}
                />

                <Input
                  className="codigo-integracao"
                  id="codigo_integracao"
                  name="codigo_integracao"
                  labelInput="Código de integraçao API"
                  readOnly
                  mudarCor="1"
                  iconEnd={FiCopy}
                  titleBotao="Copiar"
                  setIsOpen={() => { copiarCodigoIntegracao() }}
                />

                <Input className="nome-razao-social" name="nome_razao_social" labelInput="Nome/ Razão Social" mudarCor="1" />
                <Input className="apelido-nome-fantasia" name="apelido_nome_fantasia" labelInput="Apelido/ Fantasia" mudarCor="1" />
                <Input className="logradouro" name="logradouro" labelInput="Logradouro" mudarCor="1" />
                <Input className="numero" name="numero" labelInput="Número" mudarCor="1" />
                <Input className="complemento" name="complemento" labelInput="Complemento" mudarCor="1" />

                <InputMask
                  mask="99999-999"
                  className="cep"
                  name="cep"
                  labelInput="CEP"
                  mudarCor="1"
                  defaultValue={usuario.cep}
                />

                <Input className="bairro" name="bairro" labelInput="Bairro" mudarCor="1" />
                <Select
                  className="estado"
                  name="estado_id"
                  labelSelect="Estado"
                  mudarCor="1"
                  onChange={e => buscarCidade(Number(e.target.value))}
                  value={estadoAtual || ""}
                >
                  <option value="">Selecione um estado...</option>
                  {estados.map((estado) => (
                    <option key={estado.id} value={estado.id}>
                      {estado.nome}
                    </option>
                  ))}
                </Select>
                <Select
                  className="cidade"
                  name="cidade_id"
                  labelSelect="Cidade"
                  mudarCor="1"
                  onChange={e => atualizarValueCidadeSelect(Number(e.target.value))}
                  value={cidadeAtual || ""}
                >
                  <option value="">Selecione uma cidade...</option>

                  {cidades && cidades.map((cidade) => (
                    <option key={cidade.id} value={cidade.id}>
                      {cidade.nome}
                    </option>
                  ))}
                </Select>
                <Input className="email" type="email" name="email" labelInput="E-mail" mudarCor="1" />
                <InputMask
                  mask={telefone ? telefone.replace(/[^0-9]+/g, '').length <= 10 ? "(99) 9999-99999" : "(99) 9 9999-9999" : "(99) 9999-99999"}
                  className="telefone"
                  name="telefone"
                  labelInput="Telefone"
                  mudarCor="1"
                  defaultValue={telefone}
                  onChange={(e) => telefoneOnChange(e.currentTarget.value)}
                />

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

export default MeusDados;
