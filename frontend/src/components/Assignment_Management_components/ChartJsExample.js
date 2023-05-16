/* import { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

import React, { useRef } from "react";
import ReactToPrint from "react-to-print";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const initialData = {
  labels: ["week 1", "week 2", "week 3", "week 4"],
  datasets: [
    {
      label: "Sinhala",
      data: [null, null, null, null],
      backgroundColor: "#2196F3",
      borderColor: "#2196F3",
    },
    {
      label: "Maths",
      data: [null, null, null, null],
      backgroundColor: "#F44236",
      borderColor: "#F44236",
    },
    {
      label: "English",
      data: [null, null, null, null],
      backgroundColor: "#FFCA29",
      borderColor: "#FFCA29",
    },
    {
      label: "History",
      data: [null, null, null, null],
      backgroundColor: "#7E57C2",
      borderColor: "#7E57C2",
    },
    {
      label: "Science",
      data: [null, null, null, null],
      backgroundColor: "#00FF00",
      borderColor: "#00FF00",
    },

  ],
};








const ChartJsExample = () => {

  const componentRef = useRef();

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [data, setData] = useState(initialData);
  const [showPrintButton, setShowPrintButton] = useState(false); // added state variable

  const handleInputChange = (subjectIndex, weekIndex, value) => {
    const newData = {
      ...data,
      datasets: data.datasets.map((dataset, index) => {
        if (index !== subjectIndex) return dataset;
        return {
          ...dataset,
          data: dataset.data.map((d, i) => (i === weekIndex ? value : d)),
        };
      }),
    };
    setData(newData);
  };

  const handleSubjectSelect = (e) => {
    const subject = e.target.value;
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
      setShowPrintButton(false); // update state variable
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
      setShowPrintButton(true); // update state variable
    }
  };

  const showChart = selectedSubjects.length > 0;

  return (

    <div className="container mt-5">

      <div ref={componentRef}>

        <div className="row justify-content-center">
          <div className="col-lg-8">

            {!showChart && <div className="alert alert-info">Click on subjects to generate the chart</div>}

            <center> <b> Explore Your Progress </b> </center>

            <Line options={{ plugins: { legend: { position: "bottom" } } }} data={{ ...data, datasets: data.datasets.filter((dataset) => selectedSubjects.includes(dataset.label)) }} />
            <form>
              {data.datasets.map((dataset, subjectIndex) => (
                <div key={subjectIndex} className="form-group">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value={dataset.label} checked={selectedSubjects.includes(dataset.label)} onChange={handleSubjectSelect} />
                    <label className="form-check-label">{dataset.label}</label>
                  </div>
                  {selectedSubjects.includes(dataset.label) && (
                    <div className="row">
                      {dataset.data.map((d, weekIndex) => (
                        <div key={weekIndex} className="col-sm">
                          <label>Week {weekIndex + 1}:</label>
                          <input
                            type="number"
                            className="form-control"
                            value={d}
                            onChange={(e) => handleInputChange(subjectIndex, weekIndex, parseInt(e.target.value))}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </form>

            {showPrintButton && <ReactToPrint
              trigger={() => <button>Print this out!</button>}
              content={() => componentRef.current}
            />}

          </div>
        </div>

      </div>

    </div>
  );
};

export default ChartJsExample;

 

 */


import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import { getProfile } from '../../apicalls/helper';

const ChartJsExample = () => {
  const chartRef = useRef(null);
  const [marks, setMarks] = useState([]);
  const [marks1, setMarks1] = useState([]);
  const [apiData1, setApiData1] = useState({});
  const id = apiData1.studentId;

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await axios.get('http://localhost:9090/feed/getMark');
        setMarks1(response.data);
      } catch (error) {
        console.error('Error retrieving marks:', error);
      }
    };

    fetchMarks();
  }, []);

  useEffect(() => {
    let usernameFrom = localStorage.getItem('userName');
    getProfile(usernameFrom).then((results) => {
      setApiData1(results.data);
    });
  }, []);

  useEffect(() => {
    const filteredMarks = marks1.filter((marks) => marks.studentName === id);
    if (filteredMarks.length > 0) {
      setMarks(filteredMarks);
      console.log(filteredMarks);
    }
  }, [marks1, id]);

  useEffect(() => {
    if (marks.length > 0) {
      createChart();
    }
  }, [marks]);

  const createChart = () => {
    const assignmentTypes = marks.map((mark) => mark.AssignmentType);
    const markValues = marks.map((mark) => mark.marks);

    const chartConfig = {
      type: 'bar',
      data: {
        labels: assignmentTypes,
        datasets: [
          {
            label: 'Marks',
            data: markValues,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    };

    if (chartRef.current) {
      new Chart(chartRef.current, chartConfig);
    }
  };

  return (
    <div>
      <h1>Marks</h1>
      <div style={{ width: '300px', height: '200px' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default ChartJsExample;
