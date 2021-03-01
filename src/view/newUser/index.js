import React, { useState } from 'react';
import './newUser.css';

import firebase from '../../config/firebase';
import 'firebase/auth'
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/navbar';
import { useSelector } from 'react-redux';

function NewUser() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar() {
        setCarregando(1);
        setMsgTipo(null);
        if (!email || !senha) {
            setMsgTipo('erro');
            setCarregando(0);
            setMsg('Verifique os campos de login e senha!')
        }
        firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado => {
            setMsgTipo('ok');
            setCarregando(0);
        })
            .catch(erro => {
                setMsgTipo('erro');
                setCarregando(0);

                switch (erro.message) {
                    case 'Password should be at least 6 characters':
                        setMsg('Senha deve ter pelo menos 6 caracteres.');
                        break;
                    case 'The email address is already in use by another account.':
                        setMsg('Este email já está sendo usado.');
                        break;
                    case 'The email address is badly formatted.':
                        setMsg('Formato de email inválido.');
                        break;
                    default:
                        setMsg('Não foi possível cadastrar.');
                        break;
                }

            });
    }

    return (
        <>
            <Navbar></Navbar>
            {
        useSelector(state => state.usuarioLogado) === 0 ? < Redirect to='/'></Redirect> : null

      }
            <div className="cadastro-content bg-light">
                <div className="form-cadastro">
                    <form className="form-login mx-auto text-center ">
                        <h2 className="text-center my-3 text-dark">Cadastro</h2>

                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email" required autofocus></input>
                        <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" required></input>


                        {
                            carregando ? <div class="spinner-border mt-2 text-dark" role="status"><span class="sr-only">Loading...</span></div>
                                : <button className="btn btn-lg btn-cadastrar btn-lg mt-2 my-2" onClick={cadastrar} type="button">Cadastrar</button>

                        }
                        <div className="text-muted text-center my-2">
                            {msgTipo === 'ok' && <spam><strong>Cadastrado com sucesso!</strong></spam>}
                            {msgTipo === 'erro' && <spam><strong>{msg}</strong></spam>}

                        </div>

                        <div className="text-center">
                            <Link to='/login' className="text-decoration-none link mx-3 mt-2 ">Já possuo um cadastro</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default NewUser;