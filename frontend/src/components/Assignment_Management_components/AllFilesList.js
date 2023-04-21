import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function AllFilesList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:9090/items/getItems');
        setFiles(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFiles();
  }, []);

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
              <a href={`http://localhost:9090/items/getAll/${file._id}`} class="btn btn-primary" download>Download</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
}

