import React  from 'react';
import Navbar from '../../components/navbar';
import './home.css';
import { useSelector } from 'react-redux'

import * as Hi from "react-icons/hi";
import * as Ri from "react-icons/ri";
import * as Md from "react-icons/md";
import * as Bs from "react-icons/bs";
import * as Ai from "react-icons/ai";
import { Link } from 'react-router-dom';

function Home() {

  return (
    <> <Navbar></Navbar>
      {
        useSelector(state => state.usuarioLogado) === 0 ? <div className='container'>
          <div className="row justify-content-center pt-5 ">
            <h4>Você não está logado para acessar as funções do sistema!</h4>
          </div>
        </div>

          :
          <div className='container pt-4'>
            <div className="row justify-content-center pt-4 ">
              <div className="card card-home m-3"><Ai.AiOutlineOrderedList className="card-img-top" />

                <div className="card-footer text-center">
                  <Link to='/cadastroregistro' className='btn btn-lg btn-card'>Novo Registro</Link>
                </div>
              </div>
              <div className="card card-home m-3"><Bs.BsFillPersonLinesFill className="card-img-top" />

                <div className="card-footer text-center">
                  <Link to='/cadastrocliente' className='btn btn-lg btn-card'>Novo Cliente</Link>
                </div>
              </div>
              <div className="card card-home m-3"><Md.MdRoomService className="card-img-top" />

                <div className="card-footer text-center">
                  <Link to='/cadastroservico' className='btn btn-lg btn-card'>Novo Serviço</Link>
                </div>
              </div>
              <div className="card card-home m-3"><Ri.RiHandbagFill className="card-img-top" />

                <div className="card-footer text-center">
                  <Link to='/cadastroproduto' className='btn btn-lg btn-card'>Novo Produto</Link>
                </div>
              </div>
              <div className="card card-home m-3"><Hi.HiDocumentReport className="card-img-top" />

                <div className="card-footer text-center">
                  <Link to='/relatorio' className='btn btn-lg btn-card'>Gerar Relatório</Link>
                </div>
              </div>
            </div>
          </div>
      }



    </>
  );

}
export default Home;