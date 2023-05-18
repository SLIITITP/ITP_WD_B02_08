import React from 'react'
import image from '../../assets/7176510.jpg'
import AddNoteMaterial from '../../components/AddNoteMaterial';
import MaterialTable from '../../components/MaterialTable';


export default function addNotes() {
  return (
    <>
    <div className='opacity-50 absolute '>
        <img src={image} alt="logo" />

        </div>

            <h1 className='text-5xl font-bold text-center relative mt-16'>Add Notes Material</h1>
       <div className='relative flex justify-center mt-8'>
       <AddNoteMaterial/>
       </div> 
       <div className=' justify-center'>
        <MaterialTable/>
       </div>
      
    </>
  )
}
