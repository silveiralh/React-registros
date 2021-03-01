import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call

// define a generatePDF function that accepts a tickets argument
const generatePDF = registros => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Data", "Tipo", "Cliente", "Descrição","Serviços","Produtos", "Valor"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  registros.forEach(registro => {
    const ticketData = [
      registro.dataRegistro,
      registro.tipo,
      registro.cliente,
      registro.descricao,
      registro.servicos,
      registro.produtos,
      registro.valorRegistro
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[2] + '-'+date[1]+'-' +  date[3] ;
  // ticket title. and margin-top + margin-left
  doc.text(" ", 14, 15);
  doc.text("Relatório de Registros", 14, 15);
  // we define the name of our PDF file.
  doc.save(`Relatorio_${dateStr}.pdf`);
};

export default generatePDF;