import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import './registro.css';
import firebase from '../../config/firebase';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Select from 'react-select';

function NewRegistro({ match }) {
    const [msgTipo, setMsgTipo] = useState('');

    const [data, setData] = useState();
    const [tipo, setTipo] = useState();
    const [cliente, setCliente] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [descricao, setDescricao] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [servico, setServico] = useState([]);
    const [total, setTotal] = useState();

    const [s, setS] = useState();
    const [p, setP] = useState();
    const [t, setT] = useState();
    const [c, setC] = useState();

    var listaServicos = [];
    var listaClientes = [];
    var listaProdutos = [];

    var temp = [];
    var temp2 = [];

    const user = useSelector(state => state.usuarioEmail);
    const [carregando, setCarregando] = useState();
    const db = firebase.firestore();

    // set value for default selection
    const [produto, setProduto] = useState([]);

    // handle onChange event of the dropdown
    const handleChangeServ = (e) => {
        setServico(Array.isArray(e) ? e.map(x => x.value) : []);
        somaValorProd(servico)
    }
    const handleChangeProd = (e) => {
        setProduto(Array.isArray(e) ? e.map(x => x.value) : []);
        somaValorProd(produto)
    }
    const atualizaValor = (e) => {
        setTotal(somaValorProd(produto) + somaValorServ(servico))
    }

    useEffect(() => {
        if (match.params.idRegistro) {
            firebase.firestore().collection('registro').doc(match.params.idRegistro).get().then((resultado) => {//Chamada para recuperar todos os clientes cadastrados
                setData(resultado.data().dataRegistro);
                setT(resultado.data().tipo);
                setC(resultado.data().cliente)
                setS(resultado.data().servicos);
                 setP(resultado.data().produtos);
                 setDescricao(resultado.data().descricao)
            })}
            produtos.map(item => temp.push({ nome: item.nome, value: item.nome, valor: item.valor }))
            firebase.firestore().collection('servico').get().then(async (resultado) => {
                await resultado.docs.forEach(doc => {
                    listaServicos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });
                setServicos(listaServicos)
            })
            firebase.firestore().collection('cliente').get().then(async (resultado) => {//Chamada para recuperar todos os clientes cadastrados
                await resultado.docs.forEach(doc => {
                    listaClientes.push({//Recuperação de todos os dados dos clientes na variavel listaClientes
                        id: doc.id,
                        ...doc.data()
                    })
                });
                setClientes(listaClientes)
            })
            firebase.firestore().collection('produto').get().then(async (resultado) => {
                await resultado.docs.forEach(doc => {
                    listaProdutos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });
                setProdutos(listaProdutos)
            })
        
    }, [])

    function cadastrar() {

        setCarregando(1);
        if (!descricao) {
            setDescricao('')
        }
        if (!data || !tipo || (tipo === 'Entrada' && cliente === '') || !produtos || !servicos) {
            setMsgTipo('faltaDados');
            setCarregando(0);
        } else {
            db.collection('registro').add({
                dataRegistro: data,
                tipo: tipo,
                cliente: cliente,
                produtos: produto,
                servicos: servico,
                valorRegistro: total,
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
    function update() {

        setCarregando(1);
        if (!data || !tipo || (tipo === 'Entrada' && cliente === '') || !produtos || !servicos) {
            setMsgTipo('faltaDados');
            setCarregando(0);
        } else {
            db.collection('registro').doc(match.params.idRegistro).update({
                dataRegistro: data,
                tipo: tipo,
                cliente: cliente,
                produtos: produto,
                servicos: servico,
                valorRegistro: total,
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

    function somaValorServ(serv) {
        let cont = 0
        serv.forEach(r => {
            servicos.forEach(v => {
                if (r === (v.nome)) {
                    cont += parseInt(v.valor)
                } else { }
            })
        })
        return cont;
    }
    function somaValorProd(prod) {
        let cont = 0
        prod.forEach(r => {
            produtos.forEach(v => {
                if (r === (v.nome)) {
                    cont += parseInt(v.preco)
                } else { }
            })
        })
        return cont;
    }

    return (
        <>
            <Navbar />
            {
                useSelector(state => state.usuarioLogado) === 0 ? <Redirect to='/'></Redirect> : null
            }

            <div className='container-sm'>
                <div className='col-12 text-center'>
                    <h4 className='mx-auto mt-4'>{match.params.idRegistro ? 'Atualizar Registro ' : 'Cadastrar Registro'}</h4>
                </div>
                <form >
                    <div className='row form-group '>
                        <div className='col-6 '>
                            <label>Data</label>
                            <input onChange={(e) => setData(e.target.value)} type='date' className='ml-1 form-control' value={data} required />
                        </div>
                        <div className='form-group col-6'>
        <label>{match.params.idRegistro ? <> Registro cadastrado como: <strong>{t}</strong></> : <>Tipo de Registro</>} </label>
                            <div className='row col-12 '>
                                <div className='col-md-6 col-sm-12'>
                                    <input className='form-check-input' onChange={(e) => setTipo(e.target.value)} type="radio" id="entrada" name="gender" value="Entrada" />
                                    <label className='h4 pl-5 pt-1 font-weight-light form-check-label'  for="entrada">Entrada</label>
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <input className='form-check-input' onChange={(e) => setTipo(e.target.value)} type="radio" id="saida" name="gender" value="Saída" />
                                    <label className='pl-5 pt-1 h4 font-weight-light form-check-label' for="saida">Saída</label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='row form-group '>
                        <div className=' col-6 '>
                            <div className='row'>
                                <label className='pl-3'>{match.params.idRegistro ? <> Serviços cadastrados:<br></br> {JSON.stringify(s)}</> : <>Serviços</>}</label>
                                <div style={{ visibility: "hidden" }}>
                                    {
                                        servicos.map(item => temp2.push({ label: item.nome, value: item.nome, valor: item.valor }))
                                    }</div>
                            </div>
                            <Select
                                className="p-0 form-control"
                                placeholder="Select Option"
                                value={temp2.filter(obj => servico.includes(obj.value))} // set selected values
                                options={temp2} // set list of the data
                                onChange={handleChangeServ} // assign onChange function
                                isMulti
                                isClearable
                            />
                        </div>

                        <div className='col-5 form-group'>
                            <div className='row'>
                                <label>{match.params.idRegistro ? <> Produtos cadastrados: <br></br>{JSON.stringify(p)}</> : <>Produtos</>}</label>
                                <div style={{ visibility: "hidden" }}>
                                    {
                                        produtos.map(item => temp.push({ label: item.nome, value: item.nome, preco: item.preco }))
                                    }
                                </div>
                                <Select 
                                    className="p-0  form-control"
                                    placeholder="Select Option"
                                    value={temp.filter(obj => produto.includes(obj.value))} // set selected values
                                    options={temp} // set list of the data
                                    onChange={handleChangeProd} // assign onChange function
                                    isMulti
                                    isClearable
                                />

                            </div>

                        </div></div><div className='form-group'>
                        <label>Cliente</label>
                        {match.params.idRegistro ? <select onChange={(e) => setCliente(e.target.value)} className='form-control' disabled>
                                <option disabled selected value>{c}</option>
                        </select>
                            
                            : <select onChange={(e) => setCliente(e.target.value)} className='form-control' >
                                <option disabled selected value>--Cliente--</option>
                            {
                                clientes.map(item => <option value={item.nome}>{item.nome}</option>)
                            }
                        </select> }
                            
                        <div className='mt-4 form-group'>
                            <label>Descrição do Serviço</label>
                            <textarea onChange={(e) => setDescricao(e.target.value)} type='text' className='form-control' value={descricao} required />
                        </div>

                    </div>

                    <div className='row col-12 '>
                        <div className='col-12' style={{ textAlign: "right" }}>
                            {produto && <div style={{ marginTop: 20, lineHeight: '25px' }}>
                                <div>
                                    <b >TOTAL DO REGISTRO: </b> {tipo === 'Entrada' ? <h1 style={{ color: 'green' }}> {somaValorProd(produto) + somaValorServ(servico)}</h1>
                                        : <h1 style={{ color: 'red' }}> {somaValorProd(produto) + somaValorServ(servico)}</h1>}
                                </div>
                            </div>}
                        </div>
                    </div>

                    <div className='text-center'>
                        {
                            carregando ? <div class=" spinner-border mt-2 text-dark" role="status"><span class="sr-only">Loading...</span></div>
                                : <div className='col-md-6 offset-md-3 my-4'>
                                    {/* onClick={match.params.idRegistro ? update : cadastrar} */}
                                    <button onMouseDown={atualizaValor} onMouseOver={atualizaValor} onClick={match.params.idRegistro ? update : cadastrar} className="btn btn-lg btn-cadastrar  mx-4 my-2" type="button">{match.params.idRegistro ? 'Atualizar' : 'Cadastrar'}</button>
                                    <Link to="/registro" className="btn btn-lg btn-voltar btn-lg" type="button">Voltar</Link>
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
export default NewRegistro;
