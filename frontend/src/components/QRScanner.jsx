// import React, {useState, useRef} from 'react';
// import { Button, Card, Col, Input, Row, Typography } from 'antd';
// import QRCode from 'qrcode';
// import QrReader from 'react-qr-reader';



// function QRScanner() {
//     const [text, setText] = useState('');
//     const [imageUrl, setImageUrl] = useState('');
//     const [scanResultWebCam, setScanResultWebCam] =  useState('');

//     const generateQrCode = async () => {
//         try {
//               const response = await QRCode.toDataURL(text);
//               setImageUrl(response);
            
//         }catch (error) {
//           console.log(error);
//         }
//     }
//     const handleErrorWebCam = (error) => {
//         console.log(error);
//     }
//     const handleScanWebCam = (result) => {
//         if (result){
//             setScanResultWebCam(result);
//         }
//        }
      
    
//     return (
//         <div style={{ marginTop: 10 }}>
//         <Card>
//           <Typography.Title level={2} style={{ background: '#3f51b5', color: '#fff', padding: 20 }}>
//             Generate and download QR code
//           </Typography.Title>
//           <Row gutter={[16, 16]}>
//             <Col xl={8} lg={8} md={12} sm={24} xs={24}>
//               <Input placeholder="Enter text here" onChange={(e) => setText(e.target.value)} />
//               <Button style={{ marginTop: 10, marginBottom: 20 }} variant="contained" 
//                 color="primary-outlined" onClick={() => generateQrCode()}>Generate</Button>
//                  {imageUrl ? (
//                             <a href={imageUrl} download>    {/*For download qr */}
//                                <img src={imageUrl} alt="img"/>
//                             </a>) : null}
//             </Col>
//             <Col xl={8} lg={8} md={12} sm={24} xs={24}></Col>
//             <Col xl={8} lg={8} md={12} sm={24} xs={24}>
//             <h3>Qr Code Scan by Web Cam</h3>
//                          <QrReader
//                          delay={300}
//                          style={{width: '100%'}}
//                          onError={handleErrorWebCam}
//                          onScan={handleScanWebCam}
//                          />
//                          <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
//             </Col>
//           </Row>
//         </Card>
//       </div>
//     );
// }



// export default QRScanner

import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Col, Input, Row, Typography } from 'antd';
import QRCode from 'qrcode';
import jsQR from 'jsqr';

function QRScanner() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const constraints = { video: { facingMode: 'environment' } };
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
      setScanResultWebCam(code.data);
    } else {
      requestAnimationFrame(handleScanWebCam);
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Card>
        <Typography.Title level={2} style={{ background: '#3f51b5', color: '#fff', padding: 20 }}>
          Generate and download QR code
        </Typography.Title>
        <Row gutter={[16, 16]}>
          <Col xl={8} lg={8} md={12} sm={24} xs={24}>
            <Input placeholder="Enter text here" onChange={(e) => setText(e.target.value)} />
            <Button style={{ marginTop: 10, marginBottom: 20 }} variant="contained"
              color="primary-outlined" onClick={() => generateQrCode()}>Generate</Button>
            {imageUrl ? (
              <a href={imageUrl} download>    {/*For download qr */}
                <img src={imageUrl} alt="img" />
              </a>) : null}
          </Col>
          <Col xl={8} lg={8} md={12} sm={24} xs={24}></Col>
          <Col xl={8} lg={8} md={12} sm={24} xs={24}>
            <h3>Qr Code Scan by Web Cam</h3>
            <video style={{ width: '100%' }} ref={videoRef} autoPlay playsInline muted onCanPlay={() => handleScanWebCam()} />
            <canvas style={{ display: 'none' }} ref={canvasRef} width={640} height={480} />
            <br></br>
            <h3>Scanned By WebCam Code:<h1 className='text-2xl'> {scanResultWebCam} </h1></h3>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default QRScanner;



