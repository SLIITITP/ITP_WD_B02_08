import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
  const [user, setUser] = useState({
    studentID: '',
    name: '',
    email: '',
    grades: [],
    whatsappNumber: '',
    address: '',
    // Other properties as needed
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/add', user);
      console.log(response.data); // New user object returned by the server
      // Reset the form after successful submission
      setUser({
        studentID: '',
        name: '',
        email: '',
        grades: [],
        whatsappNumber: '',
        address: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Student ID:
        <input
          type="text"
          name="studentID"
          value={user.studentID}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Grades:
        <input
          type="text"
          name="grades"
          value={user.grades}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        WhatsApp Number:
        <input
          type="text"
          name="whatsappNumber"
          value={user.whatsappNumber}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;








// import React from 'react';

// const ButtonPage = () => {
//   return (
//     <div className="flex flex-wrap h-screen">
//       <div className="w-1/2 p-2">
//         <button className="w-full h-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Button 1
//         </button>
//       </div>
//       <div className="w-1/2 p-2">
//         <button className="w-full h-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//           Button 2
//         </button>
//       </div>
//       <div className="w-1/2 p-2">
//         <button className="w-full h-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
//           Button 3
//         </button>
//       </div>
//       <div className="w-1/2 p-2">
//         <button className="w-full h-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
//           Button 4
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ButtonPage;
