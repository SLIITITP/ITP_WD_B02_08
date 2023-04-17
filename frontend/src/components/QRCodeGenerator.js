import React from "react";
import QRCode from "qrcode.react";

// function QRCodeGenerator({ apiData }) {
//   const qrValue = JSON.stringify(apiData);

//   return (
//     <QRCode
//       value={qrValue}
//       size={256}
//       fgColor="#000000"
//       bgColor="#ffffff"
//       level="L"
//       renderAs="svg"
//     />
//   );
// }

// export default QRCodeGenerator;

function QRCodeGenerator({ apiData }) {
    const qrValues = [];
    const chunkSize = 200; // number of characters per chunk
  
    // Split the data into chunks and encode each chunk as a separate QR code
    for (let i = 0; i < apiData.length; i += chunkSize) {
      const chunk = apiData.slice(i, i + chunkSize);
      qrValues.push(JSON.stringify(chunk));
    }
  
    // Concatenate the resulting QR codes together
    const qrValue = qrValues.join('');
  
    return (
      <QRCode
        value={qrValue}
        size={256}
        fgColor="#000000"
        bgColor="#ffffff"
        level="L"
        renderAs="svg"
      />
    );
  }
  
  export default QRCodeGenerator;
