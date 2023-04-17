import React, { useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { message, Modal, Table , Row , Col} from "antd";

import { useDispatch , useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getAllReportsByUser } from "../../../apicalls/reports";
import { useEffect } from "react";
import moment from "moment";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { SetUser } from "../../../redux/usersSlice";
import { getUserInfo } from "../../../apicalls/users";

function UserReports() {
  const [reportsData, setReportsData] = React.useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => <>{record.exam.name}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.exam.totalMarks}</>,
    },
    {
      title: "Passing Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.exam.passingMarks}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.result.correctAnswers.length}</>,
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text, record) => <>{record.result.verdict}</>,
    },
  ];
  

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllReportsByUser();
      if (response.success) {
        setReportsData(response.data);
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
    getData();
  }, []);

  const downloadPDF = (report) => {
    const doc = new jsPDF();
    doc.autoTable({
      startY: 20,
      head: [["Thilina Institute", ""]],
      body: [
        ["Name", report.user.name],
        ["Subject", report.exam.category],
        ["Date", moment(report.createdAt).format("DD-MM-YYYY hh:mm:ss")],
        ["Duration", report.exam.duration],
        ["Total Marks", report.exam.totalMarks],
        ["Passing Marks", report.exam.passingMarks],
        ["Obtained Mark", report.result.correctAnswers.length],
        ["Verdict", report.result.verdict],
      ],
      styles: {
        cellPadding: 2,
        fontSize: 10,
        valign: 'middle',
        halign: 'center',
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineWidth: 0.1,
        lineColor: [0, 0, 0]
      },
      headStyles: {
        fillColor: [204, 204, 204],
        textColor: [0, 0, 0],
        lineWidth: 0.1,
        lineColor: [0, 0, 0]
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineWidth: 0.1,
        lineColor: [0, 0, 0]
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      columnStyles: {
        0: {
          fontStyle: 'bold'
        }
      }
    });
    doc.save(`${report.exam.name}.pdf`);
  };

  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserInfo();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
        console.log(response.data.email)
      } else {
        message.error(response.message);
      }
    } catch (error) {
      //navigate("/login"); //if there is problem with token user navigate login
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      //navigate("/login"); //if there is problem with token user navigate login
    }
  }, []);

  return (
    <div>
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <Table columns={columns} dataSource={reportsData} />
      <Row gutter={[10, 10]}>
        {reportsData.map((report) => (
          <Col span={8} key={report.id}>
            <div className="card flex flex-col gap-2 p-2 mt-10">
              <h1 className="text-2xl">
                <b>{report.exam.name}</b>
              </h1> {/*show exam details */}
              <hr />
              <h1 className="text-md">Name : {user?.email}</h1>
              <h1 className="text-md">Subject : {report.exam.category}</h1>
              <h1 className="text-md">
                Date : {moment(report.createdAt).format("DD-MM-YYYY hh:mm:ss")}{" "}
              </h1>
              <h1 className="text-md">Duration : {report.exam.duration} </h1>
              <h1 className="text-md">Total Marks : {report.exam.totalMarks}</h1>
              <h1 className="text-md">
                Passing Marks : {report.exam.passingMarks}
              </h1>
              <h1 className="text-md">
                Obtained Mark : {report.result.correctAnswers.length}
              </h1>
              <h1 className="text-md">Verdict :{report.result.verdict}</h1>

              <button
                className="primary-outlined-btn"
                onClick={() => downloadPDF(report)}
              >
                Print Result
              </button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default UserReports;
