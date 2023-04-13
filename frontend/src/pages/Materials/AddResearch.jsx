import React from 'react'
import AddResearchMaterial from '../../components/AddResearchMaterial';
import ResearchMaterialTable from '../../components/ResearchMaterialTable';
import image from '../../assets/7176510.jpg'


export default function AddResearch() {

  return (
    <div>
         <div className='opacity-50 absolute '>
        <img src={image} alt="logo" />

        </div>

            <h1 className='text-5xl font-bold text-center relative mt-16'>Add Research Material</h1>
       <div className='relative flex justify-center mt-8'>
       <AddResearchMaterial/>
       </div> 
       <div className=' justify-center'>
        <ResearchMaterialTable/>
       </div>
      
      
    </div>
  )
}
