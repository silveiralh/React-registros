import React, { useEffect, useState } from 'react';

import firebase from '../../config/firebase';
import TicketsComponent from './tabelaRelatorio';
import generatePDF from './reportGenerator';


// Create Document Component
function MyDocument({ inicio, fim }) {
    const listaRegistros = [];

    const [registros, setRegistros] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('registro').orderBy('dataRegistro', 'asc').get().then(async (resultado) => {//Chamada para recuperar todos os clientes cadastrados
            await resultado.docs.forEach(doc => {
                listaRegistros.push({//Recuperação de todos os dados dos clientes na variavel listaClientes
                    id: doc.id,
                    cliente: doc.cliente,
                    ...doc.data()
                })
            }
            )
            setRegistros(listaRegistros)//adiciono a lista à variável clientes
        })
    })
    const registrosFilter = registros.filter(registro=> registro.dataRegistro >= inicio)

    const registrosRelatorio = registrosFilter.filter(registro=> registro.dataRegistro <= fim)

    return (
        <>
        <div>
      <div className="container mb-4 pl-3 p-1">
        <div className="row">
          
            <button className="btn btn-cadastrar" onClick={() => generatePDF(registrosRelatorio)}>
              Salvar Relatório
            </button>
          
        </div>
      </div>
      <TicketsComponent registros={registrosRelatorio} />
    </div>
        </>
    )
};

export default MyDocument;