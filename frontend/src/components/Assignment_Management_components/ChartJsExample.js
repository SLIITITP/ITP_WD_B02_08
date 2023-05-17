import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
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
    }
  }, [marks1, id]);

  const createChart = () => {
    const assignmentTypes = marks.map((mark) => mark.AssignmentType);
    const markValues = marks.map((mark) => mark.marks);

    const chartData = {
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
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    };

    return (
      <div>
        <div style={{ width: '300px', height: '200px' }}>
          <Bar ref={chartRef} data={chartData} options={chartOptions} />
        </div>
        <button onClick={printChart}>Print</button>
      </div>
    );
  };

  const printChart = () => {
    if (chartRef.current && chartRef.current.chartInstance) {
      const chartCanvas = chartRef.current.chartInstance.canvas;
      const printWindow = window.open('', '_blank');
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Chart</title>
            <style>
              @media print {
                body * {
                  visibility: hidden;
                }
                #chart-container, #chart-container * {
                  visibility: visible;
                }
                #chart-container {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                }
              }
            </style>
          </head>
          <body>
            <div id="chart-container">${chartCanvas.outerHTML}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <div>
    <h1>Marks</h1>
    {marks.length > 0 && createChart()}
    </div>
    );
    };
    
    export default ChartJsExample;