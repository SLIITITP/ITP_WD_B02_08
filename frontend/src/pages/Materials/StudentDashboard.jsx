import React from 'react'
import {Link} from 'react-router-dom';
import baba from'../../assets/banner.png';
import {GrNotes} from 'react-icons/gr'
import {GrDocumentPdf} from 'react-icons/gr'
import {GrDocumentVideo} from 'react-icons/gr'
import {GiArchiveResearch} from 'react-icons/gi'
/* import {BsRobot} from 'react-icons/bs'
import {TbHandClick} from 'react-icons/tb'
import {VscFeedback} from 'react-icons/vsc' */
//import StudyMaterialRoute from '../../components/StudyMaterialRoute'




export default function StudentDashboard() {
  return (
    <>

      

  {/*<aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">

   <div className="h-full px-3 py-4 overflow-y-auto bg-indigo-500 dark:bg-gray-800">
      <div className="space-y-2 font-medium">
      <ul>
         <li>
         <img className="rounded-full m-auto mt-5 w-40 h-40" src={baba} alt="description"/>
         <li>
           
          <div className=' mt-3'>
          <Link to = "/unenroll">
         <button type="button" className=" ml-12 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-red-600 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          UNENROLL</button>
          </Link>
          </div>
         
          </li>
         <div>
            
            <input type="text" id="first_name" className="  mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"disabled/>
        </div>

        <div>
            
            <input type="text" id="first_name" className="  mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"disabled/>
        </div>

        <div>
            <textarea type="text" id="first_name" className="  mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"disabled/>
        </div>
        
      </li>
         
          <li>
      <Link to ="/fbs">
       <button type="button" className=" mt-3 flex items-center gap-2 mx-auto text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
        <VscFeedback/>FeedBacks</button>
        </Link>
       
       </li>
          <li>
          <div className=" mt-8 flex-col items-center justify-center h-auto w-auto rounded bg-transparent shadow-lg  dark:bg-gray-800">
            <div className=" px-24 text-8xl rounded-full"><BsRobot/></div>
            
            <button type="button" className="flex items-center gap-1 m-auto focus:outline-none backdrop-blur-lg text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
            <TbHandClick/>ChatBot Service</button>
         </div>
        
          </li>
      </ul>

          </div>
        
          
        
    </div> 
 

   
  
</aside> */}


<div className= ' h-screen'>
   <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

   <div className="flex h-52 mb-4 rounded bg-green-300 border-black border-2 dark:bg-gray-800">
            
      <img className=" w-auto h-52 float-left ml-16" src={baba} alt="description"/>

         <p className="text-4xl m-auto font-bold text-gray-800 dark:text-gray-500">WELCOME TO THILINA INSTITUTE</p>
         
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
         <div className="flex items-center justify-center rounded bg-white border border-black h-52 dark:bg-gray-800">
         <iframe style={{background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'}} width="640" height= "208" src="https://charts.mongodb.com/charts-institite-management-syst-znrlt/embed/charts?id=10a6ea32-4bb0-4e12-a921-9f3f52a2032d&maxDataAge=-1&theme=light&autoRefresh=true"></iframe>
         </div>
         <div className="flex items-center justify-center rounded bg-white border border-black h-52 dark:bg-gray-800">
         <iframe style={{background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'}} width="640" height= "208" src="https://charts.mongodb.com/charts-institite-management-syst-znrlt/embed/charts?id=64386562-8ce8-4015-8220-daab98bbe856&maxDataAge=-1&theme=light&autoRefresh=true"></iframe>
         </div>
         <div className="flex items-center justify-center rounded bg-white border border-black h-52 dark:bg-gray-800">
         <iframe style={{background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'}} width="640" height= "208" src="https://charts.mongodb.com/charts-institite-management-syst-znrlt/embed/charts?id=0b8ba5b3-ccdf-4312-b18b-65e2d77ad98f&maxDataAge=-1&theme=light&autoRefresh=true"></iframe>
         </div>
         <div className="flex items-center justify-center rounded bg-white border border-black h-52 dark:bg-gray-800">
         <iframe style={{background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'}} width="640" height= "208" src="https://charts.mongodb.com/charts-institite-management-syst-znrlt/embed/charts?id=85a0617a-35dc-4ffb-b5c5-6938a6300d74&maxDataAge=-1&theme=light&autoRefresh=true"></iframe>
         </div>
      </div>


      <div className="!grid grid-cols-4 gap-4 mt-4">
         <div className="!flex flex-col items-center justify-center h-80 w-auto rounded bg-white shadow-lg border-2 dark:bg-gray-800">
            <Link to="/nmp">
            <p className=' !text-8xl ml-12' ><GrNotes/></p>
            <button className="! mt-12 relative inline-flex items-center justify-center p-0.5 mb-2  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span className="!relative px-5 py-2.5 transition-all ease-in duration-75 bg-orange-300 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Select Notes
            </span>
            </button>
            </Link>
         </div>

         <div className="flex  flex-col items-center justify-center h-80 w-auto rounded bg-white shadow-lg border-2 dark:bg-gray-800">
         <Link to="/pmp">
         <p className=' text-8xl ml-8' ><GrDocumentPdf/></p>
            <button className=" mt-12 relative inline-flex items-center justify-center p-0.5 mb-2  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-orange-300 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Select PDF
            </span>
            </button>
            </Link>
         </div>

         <div className="flex flex-col items-center justify-center h-80 w-auto rounded bg-white shadow-lg border-2 dark:bg-gray-800">
        <Link to="/rmpRe">
        <p className=' text-8xl ml-12' ><GrDocumentVideo/></p>
            <button className=" mt-12 relative inline-flex items-center justify-center p-0.5 mb-2  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-orange-300 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Select Recording
            </span>
            </button>
            </Link>
         </div>

         <div className="flex  flex-col items-center justify-center h-80 w-auto rounded bg-white shadow-lg border-2 dark:bg-gray-800">
        <Link to ="/rmp">
         <p className=' text-8xl ml-12' ><GiArchiveResearch/></p>
            <button className=" mt-12 relative inline-flex items-center justify-center p-0.5 mb-2  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-orange-300 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Select Research
            </span>
            </button>
            </Link>
         </div>
      </div>
     
      
   </div>
</div>



      
      
      </>
  )
}
