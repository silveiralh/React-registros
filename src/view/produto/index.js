import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import './produto.css';
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import CardProduto from '../../components/cards/card-produto';

function ServicoHome() {

    const [produtos, setProdutos] = useState([]);
    var listaProdutos = [];
    const [pesquisa, setPesquisa] = useState('');

    useEffect(() => {

        firebase.firestore().collection('produto').get().then(async (resultado) => {//Chamada para recuperar todos os produtos cadastrados

            await resultado.docs.forEach(doc => {
                if (doc.data().nome.toLowerCase().indexOf(pesquisa.toLowerCase()) >= 0) {
                    listaProdutos.push({//Recuperação de todos os dados dos produtos na variavel listaProdutos
                        id: doc.id,
                        ...doc.data()
                    })
                }
            })
            setProdutos(listaProdutos)//adiciono a lista à variável produtos
        })
    })

    return (
        <>
            <Navbar></Navbar>
            {
                useSelector(state => state.usuarioLogado) === 0 ? <Redirect to='/'></Redirect> : null
            }
            <div className='container bg-light'>
                <div className='row p-4'>
                    <div className=' pb-1 col-6'>
                        <h2>Produtos</h2>
                    </div>
                    <div className=' pb-1 col-6' style={{ textAlign: "right" }}>
                        <Link className="btn btn-md btn-cadastrar  mx-4 my-2" to='/cadastroproduto' >Novo Produto</Link>
                    </div>
                    <div className='row col-12 '>
                        <input onChange={(e) => setPesquisa(e.target.value)} type="text" id="pesquisa" className="form-control text-center my-2" placeholder="Filtrar por nome do serviço..." required autofocus></input>
                    </div>
                </div>

                <div className='row'>
                    {
                        produtos.map(item => <CardProduto key={item.id} id={item.id} nome={item.nome} preco={item.preco} fornecedor={item.fornecedor}></CardProduto>)
                    }

                </div>
            </div>
        </>
    )
}

export default ServicoHome;