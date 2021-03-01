import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import './produto.css';
import firebase from '../../config/firebase';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/navbar';

function NewProduto({ match }) {
    const [msgTipo, setMsgTipo] = useState('');

    const [nome, setNome] = useState();
    const [preco, setPreco] = useState();
    const [fornecedor, setFornecedor] = useState();
    const user = useSelector(state => state.usuarioEmail);

    const [carregando, setCarregando] = useState();
    const db = firebase.firestore();

    useEffect(() => {
        if (match.params.idProduto) {
            if(match.params.idServico){
            firebase.firestore().collection('produto').doc(match.params.idProduto).get().then(async (resultado) => {//Chamada para recuperar todos os clientes cadastrados
                setNome(resultado.data().nome);//adiciono a lista à variável clientes
                setPreco(resultado.data().preco);
                setFornecedor(resultado.data().fornecedor);
            })
        }}
    }, [carregando])

    function update() {
        setCarregando(1);
        if (!nome || !preco || !fornecedor) {
            setMsgTipo('faltaDados');
            setCarregando(0);
        } else {
            db.collection('produto').doc(match.params.idProduto).update({
                nome: nome,
                preco: preco,
                fornecedor: fornecedor,
                user: user,

            }).then(() => {
                setCarregando(0);
                setMsgTipo('ok');
            }).catch(() => {
                setCarregando(0);
                setMsgTipo('erro');
            })
        }
    }



    function cadastrar() {
        setCarregando(1);
        if (!nome || !preco || !fornecedor) {
            setMsgTipo('faltaDados');
            setCarregando(0);
        } else {
            db.collection('produto').add({
                nome: nome,
                preco: preco,
                fornecedor: fornecedor,
                user: user,

            }).then(() => {
                setCarregando(0);
                setMsgTipo('ok');
            }).catch(() => {
                setCarregando(0);
                setMsgTipo('erro');
            })
        }
    }

    return (
        <>
            <Navbar />
            {
                useSelector(state => state.usuarioLogado) === 0 ? <Redirect to='/'></Redirect> : null
            }
            <div className='container-sm'>
                <div className='col-12 text-center'>
                    <h4 className='mx-auto mt-4'>{match.params.idServico ? 'Atualizar Produto ' : 'Cadastrar Produto'}</h4>
                </div>
                <form>
                    <div className='form-group'>
                        <label>{match.params.idProduto ? 'Nome do Produto ' : 'Nome'}</label>
                        <input onChange={(e) => setNome(e.target.value)} type='text' className='form-control' value={nome} required />
                    </div>
                    <div className=' row'>
                        <div className='ml-3  form-group'>
                            <label>Preço</label>
                            <input onChange={(e) => setPreco(e.target.value)} type='text' className='form-control' value={preco} required />
                        </div>

                        <div className='ml-1 col form-group'>
                            <label>Fornecedor</label>
                            <input onChange={(e) => setFornecedor(e.target.value)} type='text' className='form-control' value={fornecedor} required />
                        </div>
                        {/* <div className='col'>
                            <label>Imagem</label>
                            <input onChange={(e) => setImg(e.target.files[0])} type='file' className='form-control' required />
                        </div> */}

                    </div>
                    <div className='col-md-6 offset-md-3 my-4'>
                        <div className='text-center'>
                            {
                                carregando ? <div class=" spinner-border mt-2 text-dark" role="status"><span class="sr-only">Loading...</span></div>
                                    : <>
                                        <button className="btn btn-lg btn-cadastrar  mx-4 " onClick={match.params.idProduto ? update : cadastrar} type="button">{match.params.idProduto ? 'Atualizar' : 'Cadastrar'}</button>
                                        <Link to="/produto" className="btn btn-lg btn-voltar btn-lg" type="button">Voltar</Link>
                                    </>

                            }
                        </div>

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
export default NewProduto;
