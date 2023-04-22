/* import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function AllFilesList() {
  const [files, setFiles] = useState([]);


  //add a downloaded state variable to each file object in the files array. This way, when a user
  // clicks the download  button for a specific file, only the downloaded state variable for that file 
  //will be updated.

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:9090/items/getItems');
        const filesWithDownloadedState = response.data.items.map(file => ({
          ...file,
          downloaded: false
        }));
        setFiles(filesWithDownloadedState);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = (fileId) => {
    setFiles(prevFiles => prevFiles.map(file => {
      if (file._id === fileId) {
        return { ...file, downloaded: true };
      } else {
        return file;
      }
    }));
  };

  return (
    <div class="container">
      <h1>Students Answers</h1>
      <div class="row">
        {files.map((file) => (
          <div class="col-md-6 mb-4" key={file._id}>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{file.name}</h5>
                <p class="card-text">{file.description}</p>
                <a
                  href={`http://localhost:9090/items/getAll/${file._id}`}
                  class={`btn btn-primary${file.downloaded ? ' btn-success' : ''}`}
                  download
                  onClick={() => handleDownload(file._id)}
                >
                  {file.downloaded ? 'Downloaded' : 'Download'}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 */

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AllFilesList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:9090/items/getItems');
        const filesWithDownloadedState = response.data.items.map(file => ({
          ...file,
          downloaded: localStorage.getItem(file._id) === 'true'
        }));
        setFiles(filesWithDownloadedState);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = (fileId) => {
    setFiles(prevFiles => prevFiles.map(file => {
      if (file._id === fileId) {
        const updatedFile = { ...file, downloaded: true };
        localStorage.setItem(file._id, true);  //store in localstorage ,so downloaded files stay away as they are.
        return updatedFile;
      } else {
        return file;
      }
    }));
  };

  return (
    <div class="container">
      <h1>Students Answers</h1>
      <div class="row">
        {files.map((file) => (
          <div class="col-md-6 mb-4" key={file._id}>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{file.name}</h5>
                <p class="card-text">{file.description}</p>
                <a
                  href={`http://localhost:9090/items/getAll/${file._id}`}
                  class={`btn btn-primary${file.downloaded ? ' btn-success' : ''}`}
                  download
                  onClick={() => handleDownload(file._id)}
                >
                  {file.downloaded ? 'Downloaded' : 'Download'}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
