import React, { useState, useEffect } from 'react';

import { useSelector} from 'react-redux';
import './servico.css';
import firebase from '../../config/firebase';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/navbar';

function NewServico({ match }) {
    const [msgTipo, setMsgTipo] = useState('');

    const [nome, setNome] = useState();
    const [valor, setValor] = useState();
    const [descricao, setDescricao] = useState();
    const user = useSelector(state => state.usuarioEmail);

    const [carregando, setCarregando] = useState();
    const db = firebase.firestore();

    useEffect(() => {
        if (match.params.idServico) {
            firebase.firestore().collection('servico').doc(match.params.idServico).get().then((resultado) => {//Chamada para recuperar todos os clientes cadastrados
                setNome(resultado.data().nome);
                setValor(resultado.data().valor);
                setDescricao(resultado.data().descricao);
            })
        }
    }, [carregando])

    function update() {
        setCarregando(1);
        if (!nome || !valor || !descricao) {
            setMsgTipo('faltaDados');
            setCarregando(0);
        } else {
            db.collection('servico').doc(match.params.idServico).update({
                nome: nome,
                valor: valor,
                descricao: descricao,
                user: user,

            }).then(() => {
                setCarregando(0);
                setMsgTipo('ok');
            }).catch(() => {
                setCarregando(0);
                setMsgTipo('erro');
            })
        }
    };

    function cadastrar() {
        setCarregando(1);
        if (!nome || !valor || !descricao) {
            setMsgTipo('faltaDados');
            setCarregando(0);
        } else {
            db.collection('servico').add({
                nome: nome,
                valor: valor,
                descricao: descricao,
                user: user,

            }).then(() => {
                setCarregando(0); 
                setMsgTipo('ok');
            }).catch(() => {
                setCarregando(0);
                setMsgTipo('erro');
            })
        }
    };



    return (
        <>
            <Navbar />
            <div className='container-sm'>
                {
                    useSelector(state => state.usuarioLogado) === 0 ? <Redirect to='/'></Redirect> : null
                }
                <div className='col-12 text-center'>
                    <h4 className='mx-auto mt-4'>{match.params.idServico ? 'Atualizar Serviço' : 'Cadastrar Serviço'}</h4>
                </div>{match.params.nome}
                <form>

                    <div className='form-group'>
                        <label>{match.params.idServico ? 'Nome do Serviço ' : 'Nome'}</label>
                        <input onChange={(e) => setNome(e.target.value)} type='text' className='form-control' value={nome} required />
                    </div>
                    <div className=' row'>
                        <div className='ml-3  form-group'>
                            <label>Valor</label>
                            <input onChange={(e) => setValor(e.target.value)} type='text' className='form-control' value={valor} required />
                        </div>
                    </div>
                    <div className=' form-group'>
                        <label>Descrição do Serviço</label>
                        <textarea onChange={(e) => setDescricao(e.target.value)} type='text' className='form-control' value={descricao} required />
                    </div>
                    <div className='text-center'>
                        {
                            carregando ? <div class=" spinner-border mt-2 text-dark" role="status"><span class="sr-only">Loading...</span></div>
                                : <>
                                    <button className="btn btn-lg btn-cadastrar  mx-4 my-2" onClick={match.params.idServico ? update : cadastrar} type="button">{match.params.idServico ? 'Atualizar' : 'Cadastrar'}</button>

                                    <Link to="/servico" className="btn btn-lg btn-voltar btn-lg" type="button">Voltar</Link>
                                </>
                        }
                    </div>

                </form>
                <div className="text-muted text-center my-2">
                    {msgTipo === 'ok' && <spam><strong>Cadastrado com sucesso!</strong></spam>}
                    {msgTipo === 'erro' && <spam><strong>Erro ao cadastrar</strong></spam>}
                    {msgTipo === 'faltaDados' && <spam><strong>Preencha todos os campos</strong></spam>}

                </div>
            </div>
        </>
    )
}
export default NewServico;
