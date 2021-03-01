import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import './cliente.css';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import CardCliente from '../../components/cards/card-cliente';

function ClienteHome() {

    const [pesquisa, setPesquisa] = useState('');
    const [clientes, setClientes] = useState([]);
    var listaClientes = [];

    useEffect(() => {
        firebase.firestore().collection('cliente').get().then(async (resultado) => {//Chamada para recuperar todos os clientes cadastrados

            await resultado.docs.forEach(doc => {
                if (doc.data().nome.toLowerCase().indexOf(pesquisa.toLowerCase()) >= 0) {
                    listaClientes.push({//Recuperação de todos os dados dos clientes na variavel listaClientes
                        id: doc.id,
                        ...doc.data()
                    })
                }
            })
            setClientes(listaClientes)//adiciono a lista à variável clientes

        });
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
                        <h2>Clientes</h2>
                    </div>
                    <div className=' pb-1 col-6' style={{ textAlign: "right" }}>
                        <Link className="btn btn-md btn-cadastrar  mx-4 my-2" to='/cadastrocliente' >Novo Cliente</Link>
                    </div>
                    <div className='row col-12 '>
                        <input onChange={(e) => setPesquisa(e.target.value)} type="text" id="pesquisa" className="form-control text-center my-2" placeholder="Filtrar por nome do cliente..." required autofocus></input>
                    </div>
                </div>
                <div className='row'>
                    {
                        clientes.map(item => <CardCliente key={item.id} id={item.id} nome={item.nome} telefone={item.telefone} email={item.email}></CardCliente>)
                    }

                </div>
            </div>
        </>
    )
}

export default ClienteHome;