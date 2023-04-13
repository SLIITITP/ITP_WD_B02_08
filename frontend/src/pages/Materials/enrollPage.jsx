
import React from 'react';
import studyMain from '../../assets/studyMain.png';

export default function EnrollPage() {
  return (
    <div className="md:container flex-wrap md:mx-auto max-h-full min-h-fit max-w-full min-w-fit grid grid-cols-2 m-8 pr-16 box-border drop-shadow-md overflow-hidden fixed">
      <img src={studyMain} className="h-auto max-w-lg" alt='main page'/>
      <div className="mt-32">
        <h1 className="m-auto text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          WELCOME TO STUDY MATERIAL SECTION
        </h1>
        <p className="font-normal text-center mt-8 text-gray-700 dark:text-gray-400">
          Welcome to the study material entry! This is your gateway to a vast collection of educational resources that will help you learn and grow. Here, you'll find a variety of study materials such as NOTES, CLASS RECORDS, PDF and more.
        </p>
        <label className="block mt-20">
          <input type="text" name="enroll" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Input your Institute id here...." />
        </label>
        <button type="button" className="float-right mt-8 text-white bg-red-500 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
          ENROLL NOW
        </button>
      </div>
    </div>
  );
}

