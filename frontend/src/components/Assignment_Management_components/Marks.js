import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import { getProfile } from '../../apicalls/helper';

const Marks = () => {
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

export default Marks;
