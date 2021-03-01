import React from 'react';
import './card.css';
import { Link } from 'react-router-dom';
import firebase from '../../../config/firebase';

function CardServico({ id, nome, valor, descricao, match }) {

    
    function deletar(id) {
        firebase.firestore().collection('servico').doc(id).delete().then(()=> {
        }) 
    };
    
    return (
        <>
            <div className='card m-3 py-2 col-lg-2 col-md-5 col-sm-12 bg-white'>
                <h7><strong>{nome.toUpperCase()}</strong></h7>
                <h7 className='text-muted' ><strong>Valor: </strong>{valor}</h7>
                <div className='my-0 py-0 '>
                    <small className='card-text  text-justify '>{descricao}</small>
                </div>
                <div className='row  d-flex align-items-center mt-1'>
                    <div className=' pb-1 col-6'>
                        <Link to={`/editservico/${id}`} className='btn btn-editar btn-sm'>Editar</Link>
                    </div>
                    <div className=' pb-1 col-6' style={{ textAlign: "right" }}>
                        <Link to='#' onClick={(e) => { if (window.confirm('Tem certeza que deseja deletar permanetemente o serviço: '+nome+'?')) deletar(id) } } id={id} className='btn btn-excluir btn-sm '>Excluir</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CardServico;