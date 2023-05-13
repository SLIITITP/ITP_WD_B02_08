import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";

function StudentHome() {
  const [exams, setExams] = React.useState([]);
  const [searchGrade, setSearchGrade] = React.useState("");
  const [searchName, setSearchName] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        dispatch(ShowLoading());
        const filteredExams = response.data.filter(exam => exam.grade == user.grade );
        if (filteredExams.length > 0) {
          dispatch(HideLoading());
        }
        dispatch(HideLoading());
        setExams(filteredExams);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  const handleSearch = () => {
    const filteredExams = exams.filter((exam) => {
      if (searchName && searchGrade) {
        return (
          exam.name.toLowerCase().includes(searchName.toLowerCase()) &&
          exam.grade == searchGrade
        );
      } else if (searchName) {
        return exam.name.toLowerCase().includes(searchName.toLowerCase());
      } else if (searchGrade) {
        return exam.grade == searchGrade;
      }
      return true;
    });

    if (filteredExams.length === 0) {
      message.warning("No exams found.");
      navigate("/exams");
      window.location.reload();
    } else {
      setExams(filteredExams);
    }
  };

  return (
    user && (
      <div>
        <PageTitle
          title={`Hi ${user.username}, Welcome to Thilina Institute Quiz Portal`}
        />
        <div className="divider"></div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <input
            className="primary-outlined-btn h-10"
            type="text"
            placeholder="Enter exam name or grade"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button
            className="primary-outlined-btn h-10 p-2"
            onClick={handleSearch}
          >
            <i className="ri-search-line p-2 text-2l"></i>
          </button>
        </div>

        <Row gutter={[10, 10]}>
          {exams.map((exam) => (
            <Col span={8}>
              <div className="card flex flex-col gap-2 p-1 mt-1">
                <h1 className="text-2xl">
                  <b>{exam.name}</b>
                </h1>
                <hr />
                <h1 className="text-md">Subject : {exam.category}</h1>
                <h1 className="text-md">Total Marks : {exam.totalMarks}</h1>
                <h1 className="text-md">Passing Marks : {exam.passingMarks}</h1>
                <h1 className="text-md">Grade : {exam.grade}</h1>
                <h1 className="text-md">Duration : {exam.duration} Minute</h1>
                <button
                  className="primary-outlined-btn"
                  onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                >
                  Start Exam
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    )
  );
}

export default StudentHome;
