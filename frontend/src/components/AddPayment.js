import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const search = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/user/search/${searchTerm}`);
        setSearchResults([response.data]);
      } catch (err) {
        setSearchResults([]);
      }
    };

    if (searchTerm.length > 0) {
      search();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Search by ID or Name"
      />

      {searchResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {searchResults.map((result) => (
            <li key={result._id}>
              <p>{`ID: ${result.studentID}`}</p>
              <p>{`Name: ${result.name}`}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchStudents;
