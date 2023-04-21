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
    <div>
      <h1>List of Uploaded Files</h1>
      {files.map((file) => (
        <div key={file._id}>
          <p>{file.name}</p>
          <p>{file.description}</p>
          <a href={`http://localhost:9090/items/getAll/${file._id}`} download>
            Download
          </a>
        </div>
      ))}
    </div>
  );
}

