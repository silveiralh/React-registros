import React, { useState } from 'react';
import './lostPassword.css';

import firebase from '../../config/firebase';
import 'firebase/auth'
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';

function LostPassword() {

    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();

    function recuperarSenha() {
        firebase.auth().sendPasswordResetEmail(email).then(resultado => {
            setMsg('O email para recuperação de senha foi enviado para: ' + email + "\n");
        }).catch(erro => {
            setMsg("Insira um email válido")
        });
    }
    return (
        <>
            <Navbar></Navbar>
            <div className="cadastro-content bg-light">
                <form className="form-login text-center mx-auto ">
                    <h2 className="text-center my-3 text-dark">Recuperar Senha</h2>

                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email" required autofocus></input>
                    {/* <div class="spinner-border mt-2 text-dark" role="status"><span class="sr-only">Loading...</span></div> */}
                    <button className="btn btn-lg btn-cadastrar btn-lg mx-4 my-2" onClick={recuperarSenha} type="button">Enviar email</button>
                    <Link to="/" className="btn btn-lg btn-voltar btn-lg mx-4 my-2" type="button">Voltar</Link>
                    <div className="text-center">
                        <spam className='text-muted'>{msg}</spam>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LostPassword;