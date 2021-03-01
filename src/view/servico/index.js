import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import './servico.css';
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import CardServico from '../../components/cards/card-servico';

function ServicoHome() {

    const [servicos, setServicos] = useState([]);
    var listaServicos = [];
    const [pesquisa, setPesquisa] = useState('')

    useEffect(() => {
        firebase.firestore().collection('servico').get().then(async (resultado) => {//Chamada para recuperar todos os clientes cadastrados
            await resultado.docs.forEach(doc => {
                if (doc.data().nome.toLowerCase().indexOf(pesquisa.toLowerCase()) >= 0) {
                    listaServicos.push({//Recuperação de todos os dados dos clientes na variavel listaClientes
                        id: doc.id,
                        ...doc.data()
                    })
                }
            })
            setServicos(listaServicos)//adiciono a lista à variável clientes
        })
    })

    return (
        <>
            <Navbar></Navbar>

            <div className='container bg-light'>
                {
                    useSelector(state => state.usuarioLogado) === 0 ? <Redirect to='/'></Redirect> : null
                }
                <div className='row p-4'>
                    <div className=' pb-1 col-6'>
                        <h2>Serviços</h2>
                    </div>
                    <div className=' pb-1 col-6' style={{ textAlign: "right" }}>
                        <Link className="btn btn-md btn-cadastrar  mx-4 my-2" to='/cadastroservico' >Novo Serviço</Link>
                    </div>
                    <div className='row col-12 '>
                        <input onChange={(e) => setPesquisa(e.target.value)} type="text" id="pesquisa" className="form-control text-center my-2" placeholder="Filtrar por nome do serviço..." required autofocus></input>
                    </div>

                </div>

                <div className='row'>
                    {
                        servicos.map(item => <CardServico key={item.id} id={item.id} nome={item.nome} valor={item.valor} descricao={item.descricao}></CardServico>)
                    }

                </div>
            </div>
        </>
    )
}

export default ServicoHome;