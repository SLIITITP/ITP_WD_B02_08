// import React, { useState, useEffect } from "react";
// import { message, Table } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
// import { getAllReports} from "../../../apicalls/reports";
// import moment from "moment";

// import PageTitle from "../../../components/PageTitle";
// import { SetUser } from "../../../redux/usersSlice";
// import { tgetUserInfo } from "../../../apicalls/teachers";

// function AdminReports() {
//   const [reportsData, setReportsData] = useState([]);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.users);

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       getUserData();
//       getData();
//     } else {
//       // navigate("/login"); //if there is problem with token user navigate login
//     }
//   }, []);

//   const columns = [
//     {
//       title: "Exam Name",
//       dataIndex: "examName",
//       render: (text, record) => <>{record.exam.name}</>,
//     },
//     {
//       title: "User Name",
//       dataIndex: "userName",
//       render: (text, record) => <>{record.user.username}</>,
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       render: (text, record) => (
//         <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
//       ),
//     },
//     {
//       title: "Total Marks",
//       dataIndex: "totalQuestions",
//       render: (text, record) => <>{record.exam.totalMarks}</>,
//     },
//     {
//       title: "Passing Marks",
//       dataIndex: "correctAnswers",
//       render: (text, record) => <>{record.exam.passingMarks}</>,
//     },
//     {
//       title: "Obtained Marks",
//       dataIndex: "correctAnswers",
//       render: (text, record) => <>{record.result.correctAnswers.length}</>,
//     },
//     {
//       title: "Verdict",
//       dataIndex: "verdict",
//       render: (text, record) => <>{record.result.verdict}</>,
//     },
//   ];

//   const getData = async () => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getAllReports();
//       dispatch(HideLoading());
//       if (response.success) {
//         const filteredExams = response.data.filter(
//           (report) => report.exam.userID === user.userID
//         );
//         setReportsData(filteredExams);
//         if (filteredExams.length > 0) {
//           dispatch(HideLoading());
//         }
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   const getUserData = async () => {
//     try {
//       dispatch(ShowLoading());
//       const response = await tgetUserInfo();
//       dispatch(HideLoading());
//       if (response.success) {
//         dispatch(SetUser(response.data));
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       // navigate("/login"); //if there is problem with token user navigate login
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   return (
//     <div>
//       <PageTitle title="Reports" />
//       <div className="divider"></div>
//       <Table columns={columns} dataSource={reportsData} />
//     </div>
//   );
// }

// export default AdminReports;

import React, { useState, useEffect } from "react";
import { message, Table, Input , Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getAllReports } from "../../../apicalls/reports";
import { DownloadOutlined } from '@ant-design/icons';
import moment from "moment";
import jsPDF from "jspdf";

import PageTitle from "../../../components/PageTitle";
import { SetUser } from "../../../redux/usersSlice";
import { tgetUserInfo } from "../../../apicalls/teachers";

function AdminReports() {
  const [reportsData, setReportsData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [users, setUsers] = useState([]);
  
  console.log(user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getData();
    } else {
      // navigate("/login"); //if there is problem with token user navigate login
    }
  }, []);

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => <>{record.exam.name}</>,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      render: (text, record) => <>{record.user.username}</>,
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
      const response = await getAllReports();
      dispatch(HideLoading());
      if (response.success) {
        console.log(user.userID);
        const filteredExams = response.data.filter(
          (report) => report.exam && report.exam.userID == user.userID
        );
        console.log(filteredExams);
        setReportsData(filteredExams);
        if (filteredExams.length > 0) {
          dispatch(HideLoading());
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };


  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredReports = reportsData.filter((report) => {
    const userName = report.user?.username?.toLowerCase() || '';
    const search = searchValue.toLowerCase();
    return userName.includes(search);
  });

  const handlePrintReport = () => {
    const doc = new jsPDF();
    const rows = filteredReports.map((report, index) => [
      index + 1,
      report.exam.name,
      report.user.username,
      moment(report.createdAt).format("DD-MM-YYYY hh:mm:ss"),
      report.exam.totalMarks,
      report.exam.passingMarks,
      report.result.correctAnswers.length,
      report.result.verdict,
    ]);

    doc.autoTable({
      head: [
        ["#", "Exam Name", "User Name", "Date", "Total Marks", "Passing Marks", "Obtained Marks", "Verdict"],
      ],
      body: rows,
    });

    doc.save("report.pdf");
  };

  return (
    <>
      <PageTitle title="Reports" />
      <div className="reports-search">
        <Input
          placeholder="Search by user name"
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredReports}
        rowKey={(record) => record._id}
      />
      <div>
      <Button type="primary" className="primary-outlined-btn h-10 p-2" icon={<DownloadOutlined  />}  onClick={handlePrintReport}>
            Download report
      </Button>
      {/* <button className="primary-outlined" >Print Report</button> */}
      </div>
    </>
  );
}

export default AdminReports;
