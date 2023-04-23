/* import React from 'react';
import { useState } from 'react';
import ChartJsExample from './ChartJsExample';



export default function Details() {
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes({ ...checkboxes, [name]: checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const clickedCheckboxes = Object.keys(checkboxes).filter((key) => checkboxes[key]);
    console.log(clickedCheckboxes);
    // Pass clickedCheckboxes data to another component
    setClickedCheckboxes(clickedCheckboxes);
  };

  const [clickedCheckboxes, setClickedCheckboxes] = useState([]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Checkbox 1
          <input
            type="checkbox"
            name="checkbox1"
            checked={checkboxes.checkbox1}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Checkbox 2
          <input
            type="checkbox"
            name="checkbox2"
            checked={checkboxes.checkbox2}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Checkbox 3
          <input
            type="checkbox"
            name="checkbox3"
            checked={checkboxes.checkbox3}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
      <ChartJsExample clickedCheckboxes={clickedCheckboxes} />
    </form>
  );
}
 */