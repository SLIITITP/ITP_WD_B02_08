
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import back from '../../assets/MaterialBg.jpg';
import { getProfileTeacher} from "../../apicalls/helper";
const AllAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [assignment1, setAssignments1] = useState([]);
  const [searchGrade, setSearchGrade] = useState("");
  const navigate = useNavigate();
  const [apiData1, setApiData1] = useState({});

 

  useEffect(() => {
    const fetchAssignments = async () => {
      const response = await fetch("http://localhost:9090/as/getAssignments");
      
      const data = await response.json();
      setAssignments1(data.assignments);
      console.log(data.assignments);
    };
    fetchAssignments();
  }, []);

  
  useEffect(() => {
    const usernameFrom = localStorage.getItem("userName");
    getProfileTeacher(usernameFrom).then((results) => {
      setApiData1(results.data);
      console.log(results.data)
    });
  }, []);

  
  const id = apiData1.teacherId;

  useEffect(() => {
    const filteredAssignments = assignment1.filter((assignment) => assignment.TeacherID === id);
    if (filteredAssignments.length > 0) {
      setAssignments(filteredAssignments);
      console.log(filteredAssignments);
    }
  }, [assignment1, id]);


  const downloadFile = async (id, filename) => {
    const response = await fetch(`http://localhost:9090/as/DownloadAss/${id}`);
  
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const handleEdit = (id) => {
    navigate(`/a3/${id}`);
  };


  //search bar

  const handleSearch = (e) => {
    setSearchGrade(e.target.value);
  };

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.grade.toLowerCase().includes(searchGrade.toLowerCase())
  );


  return (
    
    <div>
      
      <div className="opacity-50 absolute" style={{ zIndex: -1 }}>
        <img src={back} alt="logo" />
      </div>

      <h1 className="text-center my-5" style={{ fontSize: '2rem' }}>
        All Assignments
      </h1>

      <div className="mb-3">
        <label htmlFor="searchGrade" className="form-label">
         
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Serch By Grade"
          id="searchGrade"
          value={searchGrade}
          onChange={handleSearch}
          style={{ marginBottom: "5rem" }} >
         
          </input>

       
      </div>


      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" style={{ backgroundColor: 'transparent',marginBottom: "1.5rem" }}  >
        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400" >
          <tr>
          <th scope="col" className="px-6 py-3">TeacherID</th>
            <th scope="col" className="px-6 py-3">Type</th>
            <th scope="col" className="px-6 py-3">Subject</th>
            <th scope="col" className="px-6 py-3">Grade</th>
           
            <th scope="col" className="px-6 py-3">Deadline</th>
            <th scope="col" className="px-6 py-3">Resources</th>
            <th scope="col" className="px-6 py-3">Edit</th>
            <th scope="col" className="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.map((assignment) => (
            <tr key={assignment._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
              <td className="px-6 py-4">{assignment.TeacherID}</td>
              <td className="px-6 py-4">{assignment.type}</td>
              <td className="px-6 py-4">{assignment.subject}</td>
              <td className="px-6 py-4">{assignment.grade}</td>

              <td className="px-6 py-4">{assignment.deadline}</td>
              <td className="px-6 py-4">
                {assignment.file && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      downloadFile(assignment._id, assignment.file);
                    }}
                  >
                    Download
                  </button>
                )}
              </td>
              <td className="px-6 py-4">
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(assignment._id)}
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  className="btn btn-danger"
                  onClick={async () => {
                    const response = await fetch(
                      `http://localhost:9090/as/deleteAssignments/${assignment._id}`,
                      {
                        method: "DELETE",
                      }
                    );
                    if (response.ok) {
                      setAssignments((prevState) =>
                        prevState.filter(
                          (prevAssignment) =>
                            prevAssignment._id !== assignment._id
                        )
                      );
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <button className="btn btn-success" onClick={() => navigate("/a1")}>
        Create Assignment
      </button>
  

</div>



    
  );
  
};

export default AllAssignments;
