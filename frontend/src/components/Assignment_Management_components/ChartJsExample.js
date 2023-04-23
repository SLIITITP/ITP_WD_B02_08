import { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

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
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [data, setData] = useState(initialData);


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
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const showChart = selectedSubjects.length > 0;




 


  return (
    <div className="container mt-5">
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



        </div>
      </div>
    </div>
  );
};

export default ChartJsExample;
