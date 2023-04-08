import React, { useState } from 'react'

export default function OnlinePayment() {
  const [studentID, setStudentID] = useState('')
  const [grade, setGrade] = useState('')

  return (
    <div>
      <div>
        <h1>Hello, You are ready to pay your class fess</h1>
        <div>
          <label>
            Student ID :
            <input
              type='text'
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Grade :
            <select value={grade} onChange={(e) => setGrade(e.target.value)}>
              <option value=''>--Select Grade--</option>
              <option value='1'>Grade 1</option>
              <option value='2'>Grade 2</option>
              <option value='3'>Grade 3</option>
              <option value='4'>Grade 4</option>
              <option value='5'>Grade 5</option>
              <option value='6'>Grade 6</option>
              <option value='7'>Grade 7</option>
              <option value='8'>Grade 8</option>
              <option value='9'>Grade 9</option>
              <option value='10'>Grade 10</option>
              <option value='11'>Grade 11</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  )
}
