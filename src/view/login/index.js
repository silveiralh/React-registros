import React, { useState } from 'react';
import './login.css';

import firebase from '../../config/firebase';
import 'firebase/auth';
import { Link, Redirect } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';



function Login() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [carregando, setCarregando] = useState();

    const dispatch = useDispatch();

    // autenticação
    function autenticar() {
        setCarregando(1);
        if (!email || !senha) {
            setMsgTipo('erro');
            setCarregando(0);
        }
        firebase.auth().signInWithEmailAndPassword(email, senha).then(
            resultado => {
                setMsgTipo('ok');
                setCarregando(0);
                dispatch({ type: 'LOGIN', usuarioEmail: email })
            })
            .catch(erro => {
                setMsgTipo('erro');
                setCarregando(0);
            })
        setCarregando(0);
    }
    return (
        <div className="login-content d-flex align-items-center text-center bg-light">
            {
                useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/'></Redirect> : null
            }
            <form className="form-signin mx-auto ">
                <h2 className="text-center my-3 text-dark">Login</h2>

                <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email" required autofocus></input>
                <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" required></input>

                {
                    carregando ? <div class="spinner-border mt-2 text-dark" role="status"><span class="sr-only">Loading...</span></div>
                        : <button className="btn btn-lg btn-login btn-block my-3" onClick={autenticar} type="button">Entrar</button>
                }

                <div className="text-muted text-center my-2">
                    {msgTipo === 'ok' && <spam><strong>Conectado com sucesso!</strong></spam>}
                    {msgTipo === 'erro' && <spam><strong>Verifique o login e senha!</strong></spam>}

                </div>

                <div>
                    <Link to='lostpassword'  className="text-decoration-none link mx-3 mt-2 ">Recuperar senha</Link>

                    <Link to='newuser' className="link mt-2 mx-3 text-decoration-none">Cadastrar</Link>
                </div>
            </form>
        </div>

    );
}

export default Login;