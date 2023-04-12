import React from 'react'
import AddRecordMaterial from '../../components/AddRecordMaterial';
import RecordMaterialTable from '../../components/RecordMaterialTable';
import image from '../../assets/7176510.jpg'


export default function AddRecords() {
  return (
    <div>
        <div className='opacity-50 absolute '>
        <img src={image} alt="logo" />

        </div>

            <h1 className='text-5xl font-bold text-center relative mt-16'>Add Record Material</h1>
       <div className='relative flex-col left-72 justify-center mt-8'>
       <AddRecordMaterial/>
       </div> 
       <div className=' justify-center'>
        <RecordMaterialTable/>
       </div>
      
      
    </div>
  )
}
