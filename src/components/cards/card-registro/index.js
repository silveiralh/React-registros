import React from 'react';
import './card.css';
import * as Ri from "react-icons/ri";
import { Link } from 'react-router-dom';
import firebase from '../../../config/firebase';

function CardRegistro({ id, data, tipo, cliente, servicos, produtos, descricao, valor }) {

    function deletar(id) {
        firebase.firestore().collection('registro').doc(id).delete().then(() => {
        })
    };

    return (
        <>
        <div className='row container '>
            <div className='card m-1 ml-4 mr-2 col-md-12 col-lg-12 col-sm-12 pt-2 bg-white  mr-2'>

                <div className='row col-md-12 col-sm-12  my-auto'>
                    <div className='col-lg-2 col-md-12  col-sm-12'>
                        <h7><strong><strong className='label'>Data: </strong>{data}</strong></h7>
                    </div>
                    <div className=' col-lg-1 col-md-4 col-sm-4'>
                        <small className='card-text  text-justify'><strong className='label'>Tipo: </strong>{tipo}</small><br></br>
                    </div>
                    
                    <div className='col-lg-2 col-md-4  col-sm-4'>
                        <small className='card-text  text-justify'><strong className='label'>Cliente: </strong> {cliente===''? '---':cliente }</small><br></br>
                    </div>
                    <div className='col-lg-2 col-md-4  col-sm-4'>
                        <small className='card-text  text-justify'><strong className='label'>Descricao: </strong> {descricao==='' ? '---': descricao }</small><br></br>
                    </div>
                    <div className='col-lg-2  col-md-4  col-sm-4'>
                        <small className='card-text  text-justify'><strong className='label'>Servicos: </strong>{servicos==='' ? '---': servicos }</small><br></br>
                    </div>
                    <div className='col-lg-1 col-md-4  col-sm-4'>
                        <small className='card-text  text-justify'><strong className='label'>Produtos: </strong> {produtos ==='' ? '---' : produtos}</small><br></br>
                    </div>
                    <div className='col-lg-1 col-md-4  col-sm-4'>
                        <small className='card-text  text-justify'>{tipo === 'Entrada' ? <strong style={{ color: "green" }}>{valor} </strong> : <strong style={{ color: "red" }}>{valor} </strong>}</small><br></br>
                    </div>
                    <div className='row col-lg-1 col-md-12   col-sm-4 mx-auto p-0 my-auto' >
                        <div className=' pb-1 col-lg-4 col-md-6 col-sm-6' style={{ textAlign: "center" }}>
                            <Link to={`/editregistro/${id}`} className='btn btn-sm btn-editar btn-sm mt-1 mr-2'><Ri.RiEdit2Fill /></Link>
                        </div>
                        <div className=' pb-1 col-lg-4 col-md-6 col-sm-6' style={{ textAlign: "center" }}>
                            <Link to='#' onClick={(e) => { if (window.confirm('Tem certeza que deseja deletar permanetemente o registro? '+id)) deletar(id) }} id={id} className='btn m-1 ml-1 btn-sm btn-excluir btn-sm '><Ri.RiDeleteBin6Fill /></Link>
                        </div>
                    </div> 
                </div>
            </div></div>
        </>

    )
}
export default CardRegistro;