import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import './cliente.css';
import firebase from '../../config/firebase';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/navbar';

function NewCliente({ match }) {
    const [msgTipo, setMsgTipo] = useState('');

    const [nome, setNome] = useState();
    const [endereco, setEndereco] = useState();
    const [telefone, setTelefone] = useState();
    const [email, setEmail] = useState();
    const [nascimento, setNascimento] = useState();
    const user = useSelector(state => state.usuarioEmail);

    const [carregando, setCarregando] = useState();

    const db = firebase.firestore();
    useEffect(() => {
        if (match.params.idCliente) {
            firebase.firestore().collection('cliente').doc(match.params.idCliente).get().then(async (resultado) => {//Chamada para recuperar todos os clientes cadastrados
                setNome(resultado.data().nome);//adiciono a lista à variável clientes
                setEndereco(resultado.data().endereco);
                setTelefone(resultado.data().telefone);
                setEmail(resultado.data().email);
                setNascimento(resultado.data().dataNascimento);
            })
        }
    }, [carregando])

    function update() {
        setCarregando(1);
        if (!nome || !endereco || !telefone || !email || !nascimento) {
            setMsgTipo('faltaDados');
            setCarregando(0);
        } else {

            db.collection('cliente').doc(match.params.idCliente).update({
                nome: nome,
                endereco: endereco,
                telefone: telefone,
                email: email,
                dataNascimento: nascimento

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
        if (!nome || !endereco || !telefone || !email || !nascimento) {
            setMsgTipo('faltaDados');
            setCarregando(0);
        } else {

            db.collection('cliente').add({
                nome: nome,
                endereco: endereco,
                telefone: telefone,
                email: email,
                dataNascimento: nascimento,
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
            {
                useSelector(state => state.usuarioLogado) === 0 ? <Redirect to='/'></Redirect> : null
            }
            <div className='container-sm'>
                <div className='col-12 text-center'>
                    <h4 className='mx-auto mt-4'>{match.params.idCliente ? 'Atualizar Cliente ' : 'Cadastrar Cliente'}</h4>
                </div>
                <form >
                    <div className='form-group '>
                        <label>{match.params.idCliente ? 'Nome do Cliente ' : 'Nome'}</label>
                        <input onChange={(e) => setNome(e.target.value)} type='text' className='form-control' value={nome} required />
                    </div>
                    <div className='form-group'>
                        <label>Endereço</label>
                        <input onChange={(e) => setEndereco(e.target.value)} type='text' className='form-control' value={endereco} required />
                    </div>
                    <div className=' row'>
                        <div className='ml-3 form-group'>
                            <label>Telefone</label>
                            <input onChange={(e) => setTelefone(e.target.value)} type='tel' className='form-control' value={telefone} required />
                        </div>
                        <div className='col-4 ml-3 form-group'>
                            <label>Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type='email' className='form-control' value={email} required />
                        </div>
                        <div className='col-4'>
                            <label>Data de Nascimento</label>
                            <input onChange={(e) => setNascimento(e.target.value)} type='date' className='form-control' value={nascimento} required />
                        </div>

                    </div>
                    <div className='text-center'>
                        {
                            carregando ? <div class=" spinner-border mt-2 text-dark" role="status"><span class="sr-only">Loading...</span></div>
                                : <div className='col-md-6 offset-md-3 my-4'>
                                    <button className="btn btn-lg btn-cadastrar  mx-4 my-2" onClick={match.params.idCliente ? update : cadastrar} type="button">{match.params.idCliente ? 'Atualizar' : 'Cadastrar'}</button>
                                    <Link to="/cliente" className="btn btn-lg btn-voltar btn-lg" type="button">Voltar</Link>
                                </div>

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
export default NewCliente;
