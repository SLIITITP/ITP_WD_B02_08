import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AllFilesList() {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [showMarkForm, setShowMarkForm] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [marks, setMarks] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:9090/items/getItems');
        console.log(response.data.items);
        const filesWithDownloadedState = response.data.items.map(file => ({
          ...file,
          downloaded: localStorage.getItem(file._id) === 'true'
        }));
        setFiles(filesWithDownloadedState);
        setFilteredFiles(filesWithDownloadedState); // Initialize filtered files with all files
      } catch (error) {
        console.log(error);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = (fileId) => {
    setFiles(prevFiles =>
      prevFiles.map(file => {
        if (file._id === fileId) {
          const updatedFile = { ...file, downloaded: true };
          localStorage.setItem(file._id, true);
          return updatedFile;
        } else {
          return file;
        }
      })
    );
  };

  const filterFiles = (assignmentType) => {
    if (assignmentType === 'all') {
      setFilteredFiles(files); // Show all files
    } else {
      const filtered = files.filter(file => file.assignmentType === assignmentType);
      setFilteredFiles(filtered);
    }
  };

  const handleAssignmentButton = (fileId) => {
    setSelectedFileId(fileId);
    setShowMarkForm(true);


    // Fetch the relevant assignment ID based on the fileId
  const selectedFile = files.find(file => file._id === fileId);
  const assignmentId = selectedFile.assignmentId;

  // Set the assignment ID in the form field
  const idInput = document.getElementById('IdInput');
  if (idInput) {
    idInput.value = assignmentId;
  }
  };


    
  

  const handleMarkSubmit = (event) => {
    event.preventDefault();
    // Perform mark submission logic
    console.log(`Marks submitted for file ID: ${selectedFileId}, Marks: ${marks}`);

    // Reset form state
    setShowMarkForm(false);
    setSelectedFileId(null);
    setMarks('');
  };

  return (
    <div className="container">
      <h1 className="text-center my-5" style={{ fontSize: '2rem' }}>
        Students Answers
      </h1>

      <div className="row">
        <div className="col-md-12 mb-4">
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-info mr-5"
              onClick={() => filterFiles('Home Work')}
            >
              Home Work
            </button>
            <button
              className="btn btn-info mr-5"
              onClick={() => filterFiles('Group Work')}
            >
              Group Work
            </button>
            <button
              className="btn btn-info mr-5"
              onClick={() => filterFiles('Subject Related')}
            >
              Subject Related
            </button>
            <button
              className="btn btn-info mr-5"
              onClick={() => filterFiles('Extra Work')}
            >
              Extra Work
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {filteredFiles.map(file => (
          <div className="col-md-6 mb-4" key={file._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{file.name}</h5>
                <p className="card-text">{file.description}</p>
               
                <a
                  href={`http://localhost:9090/items/getAll/${file._id}`}
                  className={`btn btn-primary${file.downloaded ? ' btn-success' : ''}`}
                  download
                  onClick={() => handleDownload(file._id)}
                >
                  {file.downloaded ? 'Downloaded' : 'Download'}
                </a>

                <button
                  className="btn btn-secondary ml-2"
                  onClick={() => handleAssignmentButton(file._id)}
                >
                  Mark
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showMarkForm && (
        <div className="row mt-4">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleMarkSubmit}>
              <div className="form-group">
                <label htmlFor="IdInput"> Assignment Id</label>
                <input type = "text"></input>
                <label htmlFor="marksInput">Enter Marks:</label>
                <input
                  type="text"
                  className="form-control"
                  id="marksInput"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Marks
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}