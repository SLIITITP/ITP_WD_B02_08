import React from 'react'
import Student from '../assets/studentHome.png'
import vector from '../assets/Vector.png'
import lecture from '../assets/lecture hall.jpg'
import lern from '../assets/elearn.jpg'
import labs from '../assets/computerlab.jpg'
import security from '../assets/security.jpg'
import canteen from '../assets/canteen.jpg'
import park from '../assets/parking.jpg'
import st from '../assets/sthome.jpg'
import st2 from '../assets/st2home.jpg'
import Nav from './newNav'
import Footer from './newFooter'
import {Link} from 'react-router-dom'


export default function Home() {
  return (
    <div>
        <Nav/>
    <section className="bg-white dark:bg-gray-900 mt-16">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Discover the Power of Knowledge</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Unlock Your Potential with Thilina Institute</p>
            <Link to="/" className="inline-flex items-center bg-blue-700 justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Get started
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </Link>
            {/* <p className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Speak to Sales
            </p>  */}
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={Student} alt="mockup"/>
        </div>    
                    
    </div>
    <img src={vector} alt='back' className=' h-20 w-full'/>
</section>




<section className="bg-white dark:bg-gray-900 mt-12">
    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">CHOOSE THE INSTITUTE EXPERIENCE</h2>
            <p className="mb-4">We provide a well equipped institute with state of the art facilities, starting from class rooms to the nitty-gritty’s to make the studying experience of our students an easy and a well facilitated one. Parents are assured of the safety of their children at “THILINA INSTITUTE” and discipline is of utmost importance to us. We are diverse, welcoming, accepting and passionate about being the best we can be. Join us to make your higher education experience unforgettable.</p>
            
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
            <img className="w-full h-fit rounded-lg" src={st} alt="office content 1"/>
            <img className="mt-4 w-full lg:mt-10 rounded-lg" src={st2} alt="office content 2"/>
        </div>
    </div>
</section>


<section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Discover Personalized Education at Thilina Institute</h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">Join us to receive personalized instruction, achieve academic excellence, and unlock your full potential.</p>
      </div>
      <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
              <div className="flex justify-center items-center mb-4  rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Personalized Attention</h3>
              <p className="text-gray-500 dark:text-gray-400">we offer private class with a focus on personalized attention. Our instructors provide one-on-one instruction, allowing for a tailored learning experience that caters to the specific needs and goals of each student.</p>
          </div>
          <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Qualified Instructors</h3>
              <p className="text-gray-500 dark:text-gray-400">We have a team of qualified and experienced instructors who are experts in their respective subjects.</p>
          </div>
          <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path>
                </svg>                 
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Flexible Scheduling</h3>
              <p className="text-gray-500 dark:text-gray-400">We understand the importance of flexibility in scheduling. Thilina Institute offers flexible className timings to accommodate the busy schedules of students.</p>
          </div>
          <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Interactive Teaching Methods</h3>
              <p className="text-gray-500 dark:text-gray-400">Our instructors utilize various techniques, such as discussions, practical examples, and hands-on activities, to make the learning experience engaging and enjoyable.</p>
          </div>
          <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Comfortable Learning Environment</h3>
              <p className="text-gray-500 dark:text-gray-400"> Students can study in a relaxed and focused atmosphere, free from distractions, fostering a productive learning experience.</p>
          </div>
          <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Supportive Learning Environment</h3>
              <p className="text-gray-500 dark:text-gray-400">Our instructors provide continuous support, encouragement, and mentorship to help students overcome challenges and reach their full potential.</p>
          </div>
      </div>
  </div>
</section>




<section className="bg-white dark:bg-gray-900 mt-8">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
      <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">OUR FACILITIES</h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">we are dedicated to providing you with the best possible environment to support your educational experience. Our state-of-the-art facilities are designed to enhance your learning journey and provide you with the resources you need to succeed</p>
      </div> 
      < div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700 h-52">
              
                  <img className=" max-w-sm h-52 sm:h-sm w-80" src={lecture} alt=" Avatar"/>
              
              <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <p>LECTURE HALLS</p>
                  </h3>
                  
                  <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Experience the difference of learning in our well-equipped lecture halls at Thilina Institute.</p>
                 
              </div>
          </div> 
       

    
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700 h-52">
              
                  <img className=" max-w-sm h-52 sm:h-sm w-80" src={lern} alt=" Avatar"/>
              
              <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <p>E-LEARNING</p>
                  </h3>
                  
                  <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400"> we recognize the importance of providing flexible and accessible learning opportunities to our students.</p>
                 
              </div>
          </div> 
      

     
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700 h-52">
              
                  <img className=" max-w-sm h-52 sm:h-sm w-80" src={labs} alt=" Avatar"/>
             
              <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <p>COMPUTER LABS</p>
                  </h3>
                  
                  <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">we understand the crucial role that technology plays in today's education landscape.</p>
                 
              </div>
          </div> 

          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700 h-52">
              
                  <img className=" max-w-sm h-52 sm:h-sm w-80" src={security} alt=" Avatar"/>
              
              <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <p>HIGHER SECURITY </p>
                  </h3>
                  
                  <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">At Thilina Institute, the safety and security of our students and staff are our top priorities.</p>
                 
              </div>
          </div> 

          
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700 h-52">
              
                  <img className=" max-w-sm h-52 sm:h-sm w-80" src={canteen} alt=" Avatar"/>
              
              <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <p>CAFETERIA </p>
                  </h3>
                  
                  <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">we believe that nourishing the body is just as important as enriching the mind.</p>
                 
              </div>
          </div> 

          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700 h-52">
              
                  <img className=" max-w-sm h-52 sm:h-sm w-80" src={park} alt=" Avatar"/>
              
              <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <p>PARKING FACILITY </p>
                  </h3>
                  
                  <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">convenience of our dedicated parking facilities as you embark on an enriching educational journey</p>
                 
              </div>
          </div> 
      


  </div>
    </div>
</section>



<Footer/>

    </div>
  )
}
