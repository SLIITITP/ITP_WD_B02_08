import React, { useState, useEffect } from "react";
import axios from "axios";
import back from '../../assets/MaterialBg.jpg';

import {MdAddCircle,MdOutlineArrowBack} from 'react-icons/md'
import { Link, useParams  } from 'react-router-dom';
import { SpeechConfig, AudioConfig, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';




export default function TeacherRecordPage() {
    const { id } = useParams();
    const [record, setRecord] = useState([]);
    const [searchSubject, setSearchSubject] = useState("");
    const [searchGrade, setSearchGrade] = useState("");
  
    const fetchRec = async () => {
      const result = await axios.get("http://localhost:9090/study/allRecords");
      setRecord(result.data);
    };
  
    useEffect(() => {
      fetchRec();
    }, []);
  
    const fetchList = async () => {
      const result = await axios.get(`http://localhost:9090/study/viewRecord/${id}`);
      setRecord(result.data);
    };
  
    useEffect(() => {
      fetchList();
    }, [id]);
  
    const handleSubjectChange = (event) => {
      setSearchSubject(event.target.value);
    };
  
    const handleGradeChange = (event) => {
      setSearchGrade(event.target.value);
    };
  
    const filterPdf = (record) => {
      return record.filter((record) => {
        if (searchSubject && searchGrade) {
          return (
            record.subject.toLowerCase().includes(searchSubject.toLowerCase()) &&
            record.grade.toLowerCase() === searchGrade.toLowerCase()
          );
        } else if (searchSubject) {
          return record.subject.toLowerCase().includes(searchSubject.toLowerCase());
        } else if (searchGrade) {
          return record.grade.toLowerCase() === searchGrade.toLowerCase();
        } else {
          return true;
        }
      });
    };
  
    const filteredPdf = filterPdf(record);

     // Create a new SpeechRecognizer object
     const speechConfig = SpeechConfig.fromSubscription('14748c7c00a040d4bbc468aa19742433', 'eastasia');
     const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
     const recognizer = new SpeechRecognizer(speechConfig, audioConfig);
 
     // Start speech recognition when the user clicks the microphone icon
     const startSpeechRecognition = () => {
       recognizer.recognizeOnceAsync((result) => {
        setSearchSubject(result.text);
       });
     };



  return (
    <div>
        <div className="opacity-50 absolute">
      <img src={back} alt="logo" />
    </div>
    <h1 className=' mt-8 text-4xl text-black text-center relative font-bold'>Record Material Section</h1>
    <div className="flex items-center max-h-screen">
    <div className="mx-auto mt-8 relative">
      
      
    <div className=' flex shadow-lg bg-white h-20 w-auto rounded-full justify-center p-8'>
        
        <div className="flex items-center">   
            <label for="voice-search" className="sr-only">Search</label>
            <div className="relative w-full">

                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>


                <input type="text"value={searchSubject} onChange={handleSubjectChange} id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="input subject" required/>
                
                
                <button type="button" onClick={startSpeechRecognition} className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd"></path></svg>
                </button>


            </div>
        <div>
            <select id="search"value={searchGrade} onChange={handleGradeChange} className= " w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ml-3 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option value="grade 6">grade 6</option>
              <option value="grade 7">grade 7</option>
              <option value="grade 8">grade 8</option>
              <option value="grade 9">grade 9</option>
              <option value="grade 10">grade 10</option>
              <option value="grade 11">grade 11</option>
              <option value="grade 12">grade 12</option>
              <option value="grade 13">grade 13</option>
              </select>
              </div>
            <button type="submit" className=" ml-8 inline-flex items-center py-2.5 px-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg aria-hidden="true" className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search
            </button>
        
        </div>
              
            </div>
    </div>
  </div>

  
  <div className=' float-left ml-8'>
    <Link to ="/smt">
     <button type="button" className="mt-3 flex items-center gap-2 ml-16 focus:outline-none backdrop-blur-lg text-black bg-orange-200 border-2 border-black hover:bg-orange-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:focus:ring-yellow-900">
         <MdOutlineArrowBack/>back</button></Link>
         </div>

  <div className=' float-right mr-32'>
    <Link to="/smRe/add">
     <button type="button" className="border-2 border-black mt-3 flex items-center gap-2 ml-16 focus:outline-none backdrop-blur-lg text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:focus:ring-yellow-900">
         <MdAddCircle/>Add record</button></Link>
         </div>

  
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg  ml-16 mr-16 mt-28">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    title
                </th>
                <th scope="col" className="px-6 py-3">
                    grade
                </th>
                <th scope="col" className="px-6 py-3">
                    subject
                </th>
                <th scope="col" className="px-6 py-3">
                    teacher
                </th>
                <th scope="col" className="px-6 py-3">
                    action
                </th>
                
            </tr>
        </thead>
        <tbody>
        {filteredPdf.map((record) => (
            <tr key={record.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {record.title}
                </th>
                <td className="px-6 py-4">
                    {record.grade}
                </td>
                <td className="px-6 py-4">
                    {record.subject}
                </td>
                <td className="px-6 py-4">
                    {record.teacher}
                </td>
                <td className="px-3 py-4" >
                    <Link to={`/smRe/t/${record._id}`}>
                <button type="button" className="text-white bg-indigo-800 hover:bg-indigo-500 outline-black hover:shadow-lg hover:stroke-white font-medium rounded-full text-sm px-3 py-2.5 mr-1 mb-1">  
                View Details</button></Link>

                
                
                </td>
              
                    

                
            </tr>
        ))}
            
        </tbody>
    </table>
</div>

      
    </div>
  )
}
