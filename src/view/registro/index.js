import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import './registro.css';
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import CardRegistro from '../../components/cards/card-registro';

function RegistroHome() {

    const [registros, setRegistros] = useState([]);
    var listaRegistros = [];
    const [pesquisa, setPesquisa] = useState('')

    useEffect(() => {
        firebase.firestore().collection('registro').orderBy('dataRegistro', 'asc').get().then(async (resultado) => {//Chamada para recuperar todos os clientes cadastrados

            await resultado.docs.forEach(doc => {
                if (doc.data().tipo.toLowerCase().indexOf(pesquisa.toLowerCase()) >= 0) {
                    listaRegistros.push({//Recuperação de todos os dados dos clientes na variavel listaClientes
                        id: doc.id,
                        cliente: doc.cliente,

                        ...doc.data()
                    })
                }
            }
            )
            setRegistros(listaRegistros)//adiciono a lista à variável clientes

        })
    })

    return (
        <>
            <Navbar></Navbar>

            <div className='container mx-auto p-1 pt-2 bg-light'>
                {
                    useSelector(state => state.usuarioLogado) === 0 ? <Redirect to='/'></Redirect> : null
                }
                <div className='row pt-4 pb-2'>
                    <div className=' pb-1 col-6'>
                        <h2>Registros</h2>
                    </div>
                    <div className=' pb-1 col-6' style={{ textAlign: "right" }}>
                        <Link className="btn btn-md btn-cadastrar  mx-4 my-2" to='/cadastroregistro' >Novo Registro</Link>
                    </div>
                    <div className=' col-12 pr-0'>
                        <input onChange={(e) => setPesquisa(e.target.value)} type="text" id="pesquisa" className="form-control text-center my-1" placeholder="Filtrar por tipo do registro..." required autofocus></input>
                    </div>

                </div>

                <div className='row pt-0  '>
                    <div className=' titulos m-1 ml-4 mr-4 col-md-12 col-lg-11 col-sm-12 pt-2   mr-2'>

                        <div className='row col-md-12 col-sm-12  my-auto'>
                            <div className='col-lg-2 col-md-12 pl-1 col-sm-12'>
                                <h7 className='pl-2'><strong>Data</strong></h7>
                            </div>
                            <div className=' col-lg-1 ml-1 col-md-2 col-sm-4'>
                                <h7><strong>Tipo</strong></h7>
                            </div>

                            <div className='col-lg-2 ml-1 col-md-2  col-sm-4'>
                                <h7><strong>Cliente</strong></h7>
                            </div>
                            <div className='col-lg-2 ml-1 col-md-2  col-sm-4'>
                                <h7><strong>Descricao</strong></h7>
                            </div>
                            <div className='col-lg-2  ml-1 col-md-4  col-sm-4'>
                                <h7><strong>Servicos</strong></h7>
                            </div>
                            <div className='col-lg-1 ml-1 col-md-4  col-sm-4'>
                                <h7><strong>Produtos</strong></h7>
                            </div>
                            <div className='col-lg-1 col-md-4  col-sm-4'>
                                <h7><strong>Valor</strong></h7>
                            </div>
                            <div className='row col-lg-1 col-md-12   col-sm-4 mx-auto p-0 my-auto' >

                            </div>
                        </div>
                    </div>

                    {
                        registros.map(item =>
                            <>
                                <CardRegistro className='ml-0' key={item.id} id={item.id} data={item.dataRegistro} tipo={item.tipo} cliente={item.cliente} servicos={item.servicos} produtos={item.produtos} descricao={item.descricao} valor={item.valorRegistro}></CardRegistro>
                            </>
                        )}
                </div>



            </div>
        </>
    )
}

export default RegistroHome;