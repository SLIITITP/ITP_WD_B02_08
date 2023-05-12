import { Button, Col, Form, Row, Select, message, Table, Input } from "antd";
import React, { useEffect, useState } from "react";
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
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

function AddEditExam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [examData, setExamData] = React.useState(null); // set exam data
  const [showAddEditQuestionModal, setShowAddEditQuestionModal] =
    React.useState(false);
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);
  const params = useParams();

  /////validation useState
  const [name, setName] = useState("");
  const [touched, setTouched] = useState(false);

  /////Validation Pattern
  const isNameValid = name.length == 0 ? null : /^[a-zA-Z0-9\s]{6,}$/.test(name);;

  const handleNameChange = (event) => {
    setName(event.target.value);
    setTouched(true);
  };

  const onFinish = async (values) => {
    try {
      console.log(values);
      dispatch(ShowLoading());
      let response;
      console.log(params);
      if (params.id) {
        response = await editExamById({
          //check it is add exam or edit exam
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
      const response = await getExamById({
        //get exam by id
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
        examId: params.id,
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
      <PageTitle title={params.id ? "Edit Exam" : "Add Exam"} />{" "}
      {/*change header according to id edit or add exams*/}
      {(examData || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Exam Details" key="1">
              {" "}
              {/**exam details tab*/}
              <Row gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item
                    label="Exam Name"
                    name="name"
                    validateStatus={
                      touched && (isNameValid ? "success" : isNameValid === false ? "error" : "")
                    }
                    help={
                      touched &&
                      (isNameValid ? (
                        <span style={{ color: "green" }}>
                          <CheckCircleOutlined />
                          &nbsp;Name is valid
                        </span>
                      ) : isNameValid === false ? (
                        <span style={{ color: "red" }}>
                          <CloseCircleOutlined />
                          &nbsp;Enter valid Exam Name
                        </span>
                      ) : null)
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please enter an exam name",
                      },
                      {
                        min: 7,
                        message: "Exam name must be longer than 6 characters",
                      },
                    ]}
                  >
                    <Input
                      className="einput"
                      type="text"
                      onChange={handleNameChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Exam Duration" name="duration">
                    <input className="einput" type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Subject" name="category">
                    <Select placeholder="Choose subject">
                      <Select.Option value="sinhala">sinhala</Select.Option>
                      <Select.Option value="history">history</Select.Option>
                      <Select.Option value="mathematics">
                        mathematics
                      </Select.Option>
                      <Select.Option value="science">science</Select.Option>
                      <Select.Option value="english">english</Select.Option>
                      <Select.Option value="information-technology">
                        information-technology
                      </Select.Option>
                      <Select.Option value="music">music</Select.Option>
                      <Select.Option value="art">art</Select.Option>
                      <Select.Option value="commerce">commerce</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Total Marks" name="totalMarks">
                    <input className="einput" type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Passing Marks" name="passingMarks">
                    <input className="einput" type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Grade" name="grade">
                    <input className="einput" type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Date (YYYY/MM/DD)" name="date">
                    <input className="einput" type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Time (HH:MM am/pm)" name="time">
                    <input className="einput" type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Enrollment Key" name="enrollmentkey">
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
                <Button
                  className="primary-contained-btn flex items-center mt-2 mr-9"
                  htmlType="submit"
                >
                  Save
                </Button>
              </div>
            </TabPane>
            {params.id && (
              <TabPane tab="Questions" key="2">
                {" "}
                {/*question tab*/}
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
