// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Table } from 'react-bootstrap';
// import { getProfileTeacher } from "../../apicalls/helper";

// const ViewFeedbacks = () => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const navigate = useNavigate();
//   const [apiData1, setApiData1] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

//   useEffect(() => {
//     const usernameFrom = localStorage.getItem("userName");
//     console.log(usernameFrom)
//     getProfileTeacher(usernameFrom).then((results) => {
//       setApiData1(results.data);

//       console.log(results.data);
//     });
//   }, []);
  

//   const registeredTeacherEmail = apiData1.email;

// useEffect(() => {
//   const fetchFeedbacks = async () => {
//     try {
//       const res = await axios.get('http://localhost:9090/feed/getFeedback');
//       const allFeedbacks = res.data;
//       const filteredFeedbacks = allFeedbacks.filter(feedback => feedback.teachersName === registeredTeacherEmail);
//       setFeedbacks(filteredFeedbacks);
//     } catch (err) {
//       console.log('Error: ' + err);
//     }
//   };

//   fetchFeedbacks();
// }, [registeredTeacherEmail]);
  


  

//   const email = apiData1.email;
//   console.log(email)

//   const handleReply = (feedback) => {
//     console.log(`Replying to feedback ${feedback.id}`);
//     navigate(`/emailAss?email=${feedback.email}`);
//   };

//   // const registeredTeacherEmail = apiData1.email;

//   // console.log(feedbacks);

//   // useEffect(() => {
//   //   const filteredFeedbacks = feedbacks.filter((feedback) =>
//   //     feedback.teachersName === registeredTeacherEmail
//   //   );
//   //   setFilteredFeedbacks(filteredFeedbacks);
//   // }, [feedbacks, registeredTeacherEmail]);

//   const handleSearch = (event) => {
//     const searchTerm = event.target.value;
//     setSearchTerm(searchTerm);

//     const filteredFeedbacks = feedbacks.filter((feedback) =>
//       feedback.grade.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredFeedbacks(filteredFeedbacks);
//   };

//   return (
//     <div className="container">
//       <h1 className="text-center my-5" style={{ fontSize: '2rem' }}>
//         View Feedbacks
//       </h1>

//       <div style={{ marginTop: '20px' }}>
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by grade..."
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </div>

//       <div style={{ marginTop: '50px' }}>
//         <Table style={{ marginTop: "4rem" }}>

//           <thead>
//             <tr>
//               <th>Teacher's Email</th>
//               <th>Grade</th>
//               <th>Assignment Type</th>
//               <th>Student's Email</th>
//               <th>Message</th>
//               <th>Response</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredFeedbacks.map((feedback, index) => (
//               <tr key={index}>
//                 <td>{feedback.teachersName}</td>
//                 <td>{feedback.grade}</td>
//                 <td>{feedback.assignmentType}</td>
//                 <td>{feedback.email}</td>
//                 <td>{feedback.message}</td>
//                 <td>
//                   <button onClick={() => handleReply(feedback)} className="btn btn-primary">
//                     Reply
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default ViewFeedbacks;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { getProfileTeacher } from "../../apicalls/helper";

const ViewFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();
  const [apiData1, setApiData1] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usernameFrom = localStorage.getItem("userName");
        const profileResponse = await getProfileTeacher(usernameFrom);
        const registeredTeacherEmail = profileResponse.data.email;
        setApiData1(profileResponse.data);

        const feedbackResponse = await axios.get('http://localhost:9090/feed/getFeedback');
        const allFeedbacks = feedbackResponse.data;
        const filteredFeedbacks = allFeedbacks.filter(feedback => feedback.teachersName === registeredTeacherEmail);
        setFeedbacks(filteredFeedbacks);
      } catch (err) {
        console.log('Error: ' + err);
      }
    };

    fetchData();
  }, []);

  const handleReply = (feedback) => {
    console.log(`Replying to feedback ${feedback.id}`);
    navigate(`/emailAss?email=${feedback.email}`);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    feedback.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="text-center my-5" style={{ fontSize: '2rem' }}>
        View Feedbacks
      </h1>

      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search by grade..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div style={{ marginTop: '50px' }}>
        <Table style={{ marginTop: "4rem" }}>
          <thead>
            <tr>
              <th>Teacher's Email</th>
              <th>Grade</th>
              <th>Assignment Type</th>
              <th>Student's Email</th>
              <th>Message</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback, index) => (
              <tr key={index}>
                <td>{feedback.teachersName}</td>
                <td>{feedback.grade}</td>
                <td>{feedback.assignmentType}</td>
                <td>{feedback.email}</td>
                <td>{feedback.message}</td>
                <td>
                  <button onClick={() => handleReply(feedback)} className="btn btn-primary">
                    Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewFeedbacks;

