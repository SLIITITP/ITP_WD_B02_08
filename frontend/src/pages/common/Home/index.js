import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch(); //dispatch for loader
  const { user } = useSelector((state) => state.users);
  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams(); //get all exam it will change after adding search
      if (response.success) {
        setExams(response.data); //set data to setexams
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
    getExams(); //get exam function
  }, []);

  return (
    <div className='mb-30'>
      <PageTitle 
        title={
          `Hi ${user.name} , Welcome to Thilina Institute Quiz Portal` //showing name in home page
        }
      />

      <Row gutter={[10, 10]}>
        {" "}
        {/*this show 3 exam in one row*/}
        {exams.map(
          (
            exam //mapping exams data
          ) => (
            <Col span={8}>
              <div className="card flex flex-col gap-2 p-2 mt-10">
                <h1 className="text-2xl"><b>{exam.name}</b></h1>   {/*show exam details */}
                <hr/>
                <h1 className="text-md">Subject : {exam.category}</h1>
                <h1 className="text-md">Total Marks : {exam.totalMarks}</h1>
                <h1 className="text-md">Passing Marks : {exam.passingMarks}</h1>
                <h1 className="text-md">Duration : {exam.duration} Hour</h1>
                <button
                  className="primary-outlined-btn"
                  onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                >
                  Start Exam
                </button>
              </div>
            </Col>
          )
        )}
      </Row>
    </div>
  );
}
