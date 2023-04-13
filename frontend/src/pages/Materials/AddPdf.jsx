import React from 'react'
import image from '../../assets/7176510.jpg'
import AddPdfMaterial from '../../components/AddPdfMaterial';
import PdfMaterialTable from '../../components/PdfMaterialTable'


export default function AddPdf() {
  return (
    <>
    <div className='opacity-50 absolute '>
        <img src={image} alt="logo" />

        </div>

            <h1 className='text-5xl font-bold text-center relative mt-16'>Add Pdf Material</h1>
       <div className='relative flex-col left-72 justify-center mt-8'>
       
        <AddPdfMaterial/>
        
      
       </div> 
       <div className=' justify-center'>
        <PdfMaterialTable/>
       </div>
      
    </>
  )
}
