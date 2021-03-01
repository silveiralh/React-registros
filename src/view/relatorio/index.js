import React, { useState} from 'react';
import Navbar from '../../components/navbar';
import MyDocument from '../../components/toPDF';
import { useSelector } from 'react-redux'
import './relatorio.css'
import { Redirect } from 'react-router-dom';

function Relatorio() {

  const [msgTipo, setMsgTipo] = useState('');
  const [inicio, setInicio] = useState();
  const [fim, setFim] = useState();
  const [print, setPrint] = useState(0);

  const handlePrint = () => {
    if (!inicio || !fim) {
      setMsgTipo('faltaDados');
    } else {
      if (print === 1) {
        setPrint(0)
      } else {
        setPrint(1)
        setMsgTipo('')
      }

    }
  }
  return (
    <> <Navbar></Navbar>
      {
        useSelector(state => state.usuarioLogado) === 0 ? < Redirect to='/'></Redirect> : null

      }
      {
        print ?
          <div className='container'>
            <div className='col-12  pl-0 pt-2 justify-content-center'>
              <button className='btn btn-voltar ' onClick={handlePrint}>Voltar  </button>
            </div>
            <MyDocument inicio={inicio} fim={fim} />

          </div> : <>

            <div class="container">
              <div className="row justify-content-center pt-5 ">
                <h4>Selecione as datas de início e fim para gerar o relatório </h4>
              </div>
              <div class="row pt-2 justify-content-md-center">
                <div class="col  col-lg-2">
                  <label>Início</label>
                  <input onChange={(e) => setInicio(e.target.value)} type='date' value={inicio} className='form-control' required />
                </div>
                <div class="col-md-auto">
                </div>
                <div class="col col-lg-2">
                  <label>Fim</label>

                  <input onChange={(e) => setFim(e.target.value)} type='date' value={fim} className='form-control' required />
                </div>
                <div className='col-12 row  pt-3 justify-content-center'>
                  <button className='btn btn-cadastrar ' onClick={handlePrint}>Gerar Relatório</button>
                </div>
              </div>

            </div>
          </>}


      <div className="text-muted text-center my-2">
        {msgTipo === 'ok' && <spam><strong>Cadastrado com sucesso!</strong></spam>}
        {msgTipo === 'erro' && <spam><strong>Erro ao cadastrar</strong></spam>}
        {msgTipo === 'faltaDados' && <spam><strong>Preencha todos os campos</strong></spam>}

      </div>
    </>
  );

}
export default Relatorio;