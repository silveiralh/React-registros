import React from "react";

const TicketsComponent = ({ registros }) => {

// a function that assigns bootstrap styling classes based on 
// the status of the ticket
  
  return (
    <div className="container">
      {registros.length === 0 ? (
        "Nenhum registro entre as datas selecionadas :("
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Tipo de Registro</th>
              <th scope="col">Cliente</th>
              <th scope="col">Descrição</th>
              <th scope="col">Produtos</th>
              <th scope="col">Serviços</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            {registros.map(registro => (
              <tr key={registro.dataRegistro}>
                  <td>{registro.dataRegistro}</td>
                <td>{registro.tipo}</td>
                <td>{registro.cliente}</td>
                <td>{registro.descricao}</td>
                <td>{registro.produtos}</td>
                <td>{registro.servicos}</td>
                <td>{registro.valorRegistro}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TicketsComponent;