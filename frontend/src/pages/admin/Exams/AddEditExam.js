import { Button, Col, Form, Row, Select, message , Table} from 'antd'
import React, { useEffect } from "react";
import {
  addExam,
  deleteQuestionById,
  editExamById,
  getExamById,
} from "../../../apicalls/exams";
import PageTitle from "../../../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { Tabs } from "antd";
import AddEditQuestion from "./AddEditQuestion";

const { TabPane } = Tabs;

function AddEditExam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [examData, setExamData] = React.useState(null); // set exam data
  const [showAddEditQuestionModal, setShowAddEditQuestionModal] =
    React.useState(false);
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);
  const params = useParams();
  const onFinish = async (values) => {
    try {
      console.log(values);
      dispatch(ShowLoading());
      let response;
      console.log(params);
      if (params.id) {
        response = await editExamById({  //check it is add exam or edit exam
          ...values,
          examId: params.id,
          
        });
      } else {
        response = await addExam(values);
      }
      if (response.success) {
        message.success(response.message);
        navigate("/admin/exams");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById({ //get exam by id
        examId: params.id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setExamData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);

  const deleteQuestion = async (questionId) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteQuestionById({
        questionId,
        examId : params.id
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getExamData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const questionsColumns = [
    {
      title: "Question",
      dataIndex: "name",
    },
    {
      title: "Options",
      dataIndex: "options",
      render: (text, record) => {
        return Object.keys(record.options).map((key) => {
          return (
            <div>
              {key} : {record.options[key]}
            </div>
          );
        });
      },
    },
    {
      title: "Correct Option",
      dataIndex: "correctOption",
      render: (text, record) => {
        return ` ${record.correctOption} : ${
          record.options[record.correctOption]
        }`;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => {
              setSelectedQuestion(record);
              setShowAddEditQuestionModal(true);
            }}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => {
              deleteQuestion(record._id);
            }}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title={params.id ? "Edit Exam" : "Add Exam"} /> {/*change header according to id edit or add exams*/}
      
      {(examData || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Exam Details" key="1">
            {/* exam details tab */}
            <Row gutter={[10, 10]}>
              <Col span={8}>
                <Form.Item
                  label="Exam Name"
                  name="name"
                  rules={[
                    { required: true, message: 'Please enter the exam name' },
                    { max: 50, message: 'Exam name cannot exceed 50 characters' },
                  ]}
                >
                  <input className='einput' type='text'/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Exam Duration"
                  name="duration"
                  rules={[
                    { required: true, message: 'Please enter the exam duration' },
                   
                    { min: 1, message: 'Duration must be at least 1' },
                  ]}
                >
                  <input className='einput' type='number'/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Subject"
                  name="category"
                  rules={[
                    { required: true, message: 'Please select a subject' },
                  ]}
                >
                  <Select placeholder="Choose subject">
                    <Select.Option value="Sinhala">Sinhala</Select.Option>
                    <Select.Option value="History">History</Select.Option>
                    <Select.Option value="Mathematics">Maths</Select.Option>
                    <Select.Option value="Science">Science</Select.Option>
                    <Select.Option value="English">English</Select.Option>
                    <Select.Option value="Information-Technology">Information-Technology</Select.Option>
                    <Select.Option value="Music">Music</Select.Option>
                    <Select.Option value="Art">Art</Select.Option>
                    <Select.Option value="Commerce">Commerce</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Total Marks"
                  name="totalMarks"
                  rules={[
                    { required: true, message: 'Please enter the total marks' },
                   
                    { min: 1, message: 'Total marks must be at least 1' },
                  ]}
                >
                  <input className='einput' type='number'/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Passing Marks"
                  name="passingMarks"
                  rules={[
                    { required: true, message: 'Please enter the passing marks' },
                   
                    { min: 1, message: 'Passing marks must be at least 1' },
                  ]}
                >
                  <input className='einput' type='number'/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Grade"
                  name="grade"
                  rules={[
                    { required: true, message: 'Please enter the grade' },
                   
                    { min: 1, message: 'Grade must be at least 1' },
                  ]}
                >
                  <input className='einput' type='number'/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Date (YYYY-MM-DD)"
                  name="date"
                  rules={[
                    { required: true, message: 'Please enter the date' },
                    // { pattern: /^\d{4}-\d{2}-\d{2}$/, message: 'Please enter a valid date format (YYYY-MM-DD)' },
                  ]}
                >
                  <input className='einput' type='date'/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Time (HH:MM) 24 hour format"
                  name="time"
                  rules={[
                    { required: true, message: 'Please enter the time' },
                    // { pattern: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, message: 'Please enter a valid time format (HH:MM)' },
                  ]}
                >
                  <input className='einput' type='time'/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Enrollment Key"
                  name="enrollmentkey"
                  rules={[
                    { required: true, message: 'Please enter the enrollment key' },
                  ]}
                >
                  <input className='einput' type='text'/>
                </Form.Item>
              </Col>
              <Col span={8} id="hidden" className="hidden1">
                <Form.Item
                  label="Teacher ID"
                  name="userID"
                  rules={[
                    { required: true, message: 'Please enter the teacher ID' },
                  ]}
                >
                  <input className="einput" type="text" />
                </Form.Item>
              </Col>
            </Row>
              <div className="flex justify-end gap-2">
                <Button
                  className="primary-contained-btn flex items-center mt-2 mr-9"
                  htmltype="button"
                  onClick={() => navigate("/admin/exams")}
                >
                  Cancel
                </Button>
                <Button className="primary-contained-btn flex items-center mt-2 mr-9" htmlType="submit">
                  Save
                </Button>
              </div>
            </TabPane>
            {params.id && (
              <TabPane tab="Questions" key="2">  {/*question tab*/}
                <div className="flex justify-end">
                  <button
                    className="primary-outlined-btn"
                    type="button"
                    onClick={() => setShowAddEditQuestionModal(true)}
                  >
                    Add Question
                  </button>
                </div>

                <Table
                  columns={questionsColumns}
                  dataSource={examData?.questions || []}
                />
              </TabPane>
            )}
          </Tabs>
        </Form>
      )}

      {showAddEditQuestionModal && (
        <AddEditQuestion
          setShowAddEditQuestionModal={setShowAddEditQuestionModal}
          showAddEditQuestionModal={showAddEditQuestionModal}
          examId={params.id}
          refreshData={getExamData}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
    </div>
  );
}

export default AddEditExam;
