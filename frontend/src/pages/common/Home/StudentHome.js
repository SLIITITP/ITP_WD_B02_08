import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExamByGrade } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import PageTitle from "../../../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";


function StudentHome() {
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.users);

  const getExams = async () => {
    try {
      console.log(user?.grade);
      dispatch(ShowLoading());
      const response = await getExamByGrade({
        examGrade: user?.grade,
      });
      if (response.success) {
        setExams(response.data);
        //handleSearch();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleSearch = () => {
    const searchGrade = user?.grade;

    const filteredExams = exams.filter((exam) => {
      if (searchGrade) {
        return exam.grade === searchGrade;
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

  useEffect(() => {
    getExams();
    
  }, []);

  return (
    user && (
      <div>
        <PageTitle
          title={`Hi ${user?.grade}, Welcome to Thilina Institute Quiz Portal`}
        />
        <div className="divider"></div>

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
