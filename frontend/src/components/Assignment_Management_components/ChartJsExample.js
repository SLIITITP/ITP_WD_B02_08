import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { getProfile } from '../../apicalls/helper';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ChartJsExample = () => {
  const chartRef = useRef(null);
  const tableRef = useRef(null);
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

  const generatePDF = () => {
    html2canvas(chartRef.current).then((chartCanvas) => {
      html2canvas(tableRef.current).then((tableCanvas) => {
        const chartImgData = chartCanvas.toDataURL('image/png');
        const tableImgData = tableCanvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(chartImgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(chartImgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
        pdf.addImage(tableImgData, 'PNG', 10, 150);

        pdf.save('chart_with_marks.pdf');
      });
    });
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