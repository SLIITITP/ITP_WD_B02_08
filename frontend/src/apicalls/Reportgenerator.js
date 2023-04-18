import { jsPDF } from "jspdf";
import "jspdf-autotable";

const generatePDF = (tableRows, columns, isLandscape,QName) => {
   const doc = new jsPDF({
      orientation: isLandscape ? "landscape" : 'portrait'
   });
   
   doc.autoTable({
      head: columns,
      body: tableRows,
      startY: 20, // startY is basically margin-top
      headStyles: {

         fillColor: [241, 196, 15],
         fontSize: 12,
         halign: 'center'
      },
      columnStyles: {
         0: { cellWidth:'auto',halign:'center',fontStyle:'bold' },
         1: { cellWidth:'auto',halign:'center',fontStyle:'bold' },
         2: { cellWidth:'auto',halign:'center',fontStyle:'bold' },
         3: { cellWidth:'auto',halign:'center',fontStyle:'bold' },
         4: { cellWidth:'auto',halign:'center',fontStyle:'bold' },
        //  2: { cellWidth: 40, halign: 'center' },
      },
      styles: {
         valign: 'middle'
      },
      
      /* Use for customizing texts or styles of specific cells after they have been formatted by this plugin. This hook is called just before the column width and other features are computed.*/
      
      didParseCell: function (data) {
          if(data.section === 'body') {
             data.row.height = 20;
          }
          if (data.column.dataKey === 'poster') {
             data.cell.text = '' // Use an icon in didDrawCell instead
          }
      },
/* Use for changing styles with jspdf functions or customize the positioning of cells or cell text just before they are drawn to the page.*/
      willDrawCell: function (data) {
         if (data.row.section === 'body' && data.column.dataKey === 'available') {
            if (data.cell.raw === 'KO') {
               doc.setTextColor(231, 76, 60) // Red
            }
         }
      },
/* Use for adding content to the cells after they are drawn. This could be images or links. You can also use this to draw other custom jspdf content to cells with doc.text or doc.rect for example.*/
     
     didDrawCell: function (data) {
        if (data.row.section === 'body' && data.column.dataKey === 'poster' && data.cell.raw) {
           doc.addImage(
              data.cell.raw,
              'PNG',
              data.cell.x + 5,
              data.cell.y + 2,
              13,
              16
           )
        }
     }
   });
   // we define the name of our PDF file.
   doc.save(`${QName}.pdf`);
};
export default generatePDF;