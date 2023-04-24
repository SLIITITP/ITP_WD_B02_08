
import React, { useState } from 'react';
import studyMain from '../../assets/newUpdatebg.png';
import axios from 'axios';

export default function EnrollPage() {
  return (
    <div className="!md:container flex-wrap md:mx-auto max-w-full min-w-fit grid grid-cols-1 md:grid-cols-2 m-8 pr-16 box-border drop-shadow-md overflow-hidden h-auto mt-36">
    <img src={studyMain} className="!h-auto max-w-xl mx-auto md:mx-0" alt='main page'/>
    <div className="!md:ml-8 mt-8 md:mt-0">
      <h1 className="!text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center md:text-left">
        WELCOME TO STUDY MATERIAL SECTION
      </h1>
      <p className="!font-normal text-center md:text-left mt-8 text-gray-700 dark:text-gray-400">
        Welcome to the study material entry! This is your gateway to a vast collection of educational resources that will help you learn and grow. Here, you'll find a variety of study materials such as NOTES, CLASS RECORDS, PDF and more.
      </p>
      <label className="!block mt-12">
        <input type="text" name="username" className="!mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Input your username here...." onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label className="!block mt-4">
        <input type="text" name="email" className="!mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Input your email here...." onChange={(event) => setEmail(event.target.value)} />
    </label>
    <div className="block mt-4">
      <label className="!inline-flex items-center">
        <input type="radio" className="form-radio" name="role" value="student" checked={role === 'student'} onChange={(event) => setRole(event.target.value)} />
        <span className="ml-2">Student</span>
      </label>
      <label className="!inline-flex items-center ml-6">
        <input type="radio" className="form-radio" name="role" value="teacher" checked={role === 'teacher'} onChange={(event) => setRole(event.target.value)} />
        <span className="ml-2">Teacher</span>
      </label>
    </div>
<button type="button" onClick={handleLogin} className=" !float-right block md:inline-block mt-8 text-white bg-red-500 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mx-auto md:mr-0">
  ENROLL NOW
</button>
</div>
</div>
  );
}

