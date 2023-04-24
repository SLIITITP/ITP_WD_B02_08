//import logo from './logo.svg';
//import './App.css';

import TeacherD from './components/Assignment_Management_components/TeacherD';


import StripeContainer from './components/PaymentComponents/StripeContainer';

import './stylesheets/theme.css'
import './stylesheets/layout.css'
import './stylesheets/alignments.css'
import './stylesheets/textelements.css'
import './stylesheets/custom-component.css'
import './stylesheets/form-elements.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/common/Login';
import Register from './pages/common/Register';
import GetPayment from './components/GetPayment'
import Header from './components/Header'
import testuser from './pages/user/testuser'
import Testuser from './pages/user/testuser'
import T1 from './pages/user/T1'

import TimetableSideNav from "./components/TimetableSideNav";
import AdminEditSchedule from "./pages/admin/Timetable/AdminEditSchedule";
import AddClass from "./pages/admin/Timetable/AddClass";
import MainTimetable from './pages/user/Timetable/MainTimetable'
import MyTimetable from './pages/user/Timetable/MyTimetable'
import AdminExamSchedule from "./pages/admin/Timetable/AdminExamSchedule";
import ClassEnrolling from './pages/user/ClassEnrollment/classEnrolling';

import AddPayment from './components/PaymentComponents/AddPayment'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/common/Home'
import OnlinePayment from './components/PaymentComponents/OnlinePayment'
import Exams from './pages/admin/Exams'
import AddEditExam from './pages/admin/Exams/AddEditExam'

import { AuthorizeUser, ProtectRoute } from './middleware/auth'
import Username from './components/Username';
import Password from './components/Password';
import Registers from './components/Registers';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import TeaProfile from './components/TeaProfile';
import TeaRegister from './components/TeaRegister'
import AdminDash from './components/AdminDash'
import Reset from './components/Reset';
import Loader from './components/Loader'
import { useSelector } from 'react-redux'

import TicketsSideNav from "./components/TicketsSideNav";
import StudentTicket from './components/StudentTicket'
import AddTicket from './components/AddTicket'
import EditTicket from './components/EditTicket'
import TicketList from './components/TicketList';
import ViewReply from './components/ViewReply';
import Reply from './components/reply';
import FAQ from './components/faq';
import Gvideos from './components/GuideVideos';


/////__________________Assignments___________________/////////////////////////////////////


import AssignmentRoute from "./components/AssignmentRoutes";



import FileUploader from './components/Assignment_Management_components/FileUploader';



import DownloadAllFilesButton from './components/Assignment_Management_components/DownloadAllFilesButton';

import EmailSend from './components/Assignment_Management_components/EmailSend';

import AssignmentFeedback from './components/Assignment_Management_components/AssignmentFeedback';





import Details from './components/Assignment_Management_components/Details'

import AssignmentDetails from './components/Assignment_Management_components/AssignmentDetails';


import AllFilesList from './components/Assignment_Management_components/AllFilesList';

import ViewFeedbacks from './components/Assignment_Management_components/ViewFeedbacks';








///////////////////////////////////////////////////




import ViewPayment from './components/PaymentComponents/ViewPayment'
import PaymentConfirm from './components/PaymentComponents/PaymentConfirm'

import { Switch } from 'antd'

import WriteExam from './pages/user/WriteExam/WriteExam'
import UserReports from './pages/user/UserReports/UserReports'


import PaymentCheckout from './components/PaymentComponents/PaymentCheckout'


//import main pages
//import EnrollPage from './pages/Materials/enrollPage';
import StudentDashboard from './pages/Materials/StudentDashboard';
import TeacherDashboard from './pages/Materials/TeacherDashboard';
import TeacherNotePage from './pages/Materials/TeacherNotePage';
import TeacherPdfPage from './pages/Materials/TeacherPdfPage';
import TeacherResearchPage from './pages/Materials/TeacherResearchPage';
import TeacherRecordPage from './pages/Materials/TeacherRecordPage';
import StudyLogin from './pages/common/Login/StudyLogin';

//import student main pages
import NoteMaterialPage from './pages/Materials/NoteMaterialPage';
import PdfMaterialPage from './pages/Materials/PdfMaterialPage';
import ResearchMaterialPage from './pages/Materials/ResearchMaterialPage';
import RecordMaterialPage from './pages/Materials/RecordMaterialPage';
import FeedbackPage from './pages/Materials/FeedbackPage';


//import teacher pages
import NotesAdd from './pages/Materials/addNotes';
import AddPdf from './pages/Materials/AddPdf';
import AddRecords from './pages/Materials/AddRecords';
import AddResearch from './pages/Materials/AddResearch';
import EditFeedBackPage from './pages/Materials/EditFeedBackPage';

// import teacher Components
import AddNoteMaterial from './components/AddNoteMaterial';
import AddPdfMaterial from './components/AddPdfMaterial';
import AddRecordMaterial from './components/AddRecordMaterial';
import AddResearchMaterial from './components/AddResearchMaterial';
//import EditFeedback from './components/EditFeedback';
import NoteMaterialCardTeacher from './components/NoteMaterialCardTeacher';
import PdfMaterialCardTeacher from './components/PdfMaterialCardTeacher';
import ResearchMaterialCardTeacher from './components/ResearchMaterialCardTeacher';
import RecordMaterialTeacher from './components/RecordMaterialTeacher';
import StudyMaterialRoute from './components/StudyMaterialRoute';



//import student Components
import NoteMaterialCardStudent from './components/NoteMaterialCardStudent';
import PdfMaterialCardStudent from './components/PdfMaterialCardStudent';
import ResearchMaterialCardStudent from './components/ResearchMaterialCardStudent';
import RecordMaterialCardStudent from './components/RecordMaterialCardStudent';
import FeedBackStudent from './components/FeedBackStudent';
import AddSubToTeachers from './components/PaymentComponents/AddSubToTeachers';
import SubListUpdate from './components/PaymentComponents/SubListUpdate';
import SalaryCalculation from './components/PaymentComponents/SalaryCalculation';
import NipTest from './components/PaymentComponents/NipTest';
import WelcomePage from './pages/welcome/welcome';
import TeacherLogin from './components/TeacherLogin';
import PasswordTeacher from './components/PasswordTeacher';
import AdminLogin from './components/AdminLogin';
import SalaryHistory from './components/PaymentComponents/SalaryHistory';
import NipTest2 from './components/PaymentComponents/NipTest2';
import AdminSideNav from './components/AdminSideNav';
import GetAm from './components/AMFunction/GetAm';
import CheckAm from './components/AMFunction/CheckAm';


//------------------------------------------/////////////////////////////////////////


import AssignmentForm from './components/Assignment_Management_components/AssignmentForm';
import AllAssignments from './components/Assignment_Management_components/AllAssignments';
import AssignmentEdit from './components/Assignment_Management_components/AssignmentEdit';
import StudentAssignments from './components/Assignment_Management_components/StudentAssignments';
import ChartJsExample from './components/Assignment_Management_components/ChartJsExample';


import getSubjects from './components/Assignment_Management_components/getSubjects';


import QRScanner from './components/QRScanner';
import FinanceProtectRoute from './components/FinanceProtectRoute';








/*

//both components
import MaterialTable from './components/MaterialTable';
import PdfMaterialTable from './components/PdfMaterialTable';
import ResearchMaterialTable from './components/ResearchMaterialTable';
import RecordMaterialTable from './components/RecordMaterialTable';
import FeedbackTable from './components/FeedbackTable';
*/




function App() {
  const { loading } = useSelector((state) => state.loader);
  return (

    <BrowserRouter>

      {loading && <Loader />}
      <Routes>
        <Route path='/' element={<WelcomePage />}/> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/getPayment' exact element={<GetPayment />} />
        <Route path='/testuser' element={<Testuser />} />
        <Route path='/t1' element={<T1 />} />

        {/* Financial Management Routes */}
        <Route path='/addPayment' exact element={<FinanceProtectRoute><AddPayment /></FinanceProtectRoute>} />
        <Route path='/viewPayment' exact element={<FinanceProtectRoute><ViewPayment /></FinanceProtectRoute>} />
        <Route path='/salary/calculate' element={<FinanceProtectRoute><SalaryCalculation /></FinanceProtectRoute>} />
        <Route path='/salary/history' element={<FinanceProtectRoute><SalaryHistory /></FinanceProtectRoute>} />
        <Route path='/subject/addOrUpdate' element={<FinanceProtectRoute><AddSubToTeachers /></FinanceProtectRoute>} />

        <Route path='/confirmPayment' exact element={<PaymentConfirm />} />
        <Route path='/payment/checkout' exact element={<StripeContainer />} />
        <Route path='/payOnline' exact element={<OnlinePayment />} />
        <Route path='/subject/update' element={<SubListUpdate />} />
        <Route path='/niptest' element={<NipTest />} />
        <Route path='/niptest2' element={<NipTest2 />} />
        <Route path='/am/add' element={<GetAm />} />
        <Route path='/am/check' element={<CheckAm />} />






        {/* Admin Routes for Timetable Management */}
        <Route path="/allClasses" exact element={<TimetableSideNav>
          <AdminEditSchedule />
        </TimetableSideNav>} />
        <Route path="/addClass" exact element={<TimetableSideNav>
          <AddClass />
        </TimetableSideNav>} />
        <Route path="/adminExamSchedule" exact element={<TimetableSideNav>
          <AdminExamSchedule />
        </TimetableSideNav>} />

        {/* User Routes for Timetable Management */}
        <Route path="/mainTimetable" exact element={<TimetableSideNav>
          <MainTimetable />
        </TimetableSideNav>} />
        <Route path="/myTimetable" exact element={<TimetableSideNav>
          <MyTimetable />
        </TimetableSideNav>} />
        <Route path="/user/classEnrolling" exact element={<ClassEnrolling />} />


        <Route path="/plogin" element={<Username />} />
        <Route path="/password" element={<ProtectRoute><Password /></ProtectRoute>} />
        <Route path="/registers" element={<Registers />} />
        <Route path="/profile" element={<AuthorizeUser><Profile /></AuthorizeUser>} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />

        <Route path="/tProfile" element={<TeaProfile />} />
        <Route path="/tRegister" element={<TeaRegister />} />
        <Route path="/adminDash" element={<AdminDash />} />

        <Route path="/tProfile" element={<TeaProfile/>}/> 
        <Route path="/tRegister" element={<TeaRegister/>}/> 
        {/* <Route path="/adminDash" element={<AdminDash/>}/> */}
        <Route path="/adminDash" element={<AdminSideNav><AdminDash/></AdminSideNav>}/>
        <Route path='/pteacherLogin' element={<TeacherLogin/>}/>
        <Route path='/passwordTeacher' element={<PasswordTeacher></PasswordTeacher>}></Route>
        <Route path='/teacherProfile' element={<TeaProfile/>}></Route>
        <Route path='/adminLogin' element={<AdminLogin/>}></Route>

        {/* <Route path="*" element={<PageNotFoud/>}/> */}


        {/* User Routes for exams management */}


        <Route path='/exams' element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />




        <Route path='/user/write-exam/:id' element={<ProtectedRoute>
          <WriteExam />
        </ProtectedRoute>} />
        <Route
          path="/user/reports"
          element={
            <ProtectedRoute>
              <UserReports />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes for exams management */}


        <Route path='/admin/exams' element={<ProtectedRoute>
          <Exams />
        </ProtectedRoute>} />
        <Route path='/admin/exams/add' element={<ProtectedRoute>
          <AddEditExam />
        </ProtectedRoute>} />
        <Route path='/admin/exams/edit/:id' element={<ProtectedRoute>
          <AddEditExam />
        </ProtectedRoute>} />


       {/* support Service Routes*/}

        <Route path="/ticket" exact element={<TicketsSideNav/>} />
        <Route path="/Stickets" exact element={<TicketsSideNav>
          <StudentTicket />
        </TicketsSideNav>} />
        <Route path="/ticketlist" exact element={<TicketsSideNav>
          <TicketList />
        </TicketsSideNav>} />
        <Route path="/addTicket" exact element={<TicketsSideNav>
          <AddTicket />
        </TicketsSideNav>} />
        <Route path="/reply/:id" exact element={<TicketsSideNav>
          <Reply />
        </TicketsSideNav>} />
        <Route path="/vreply/:id" exact element={<TicketsSideNav>
          <ViewReply />
        </TicketsSideNav>} />
        <Route path="/edit/:id" exact element={<TicketsSideNav >
        <EditTicket />
        </TicketsSideNav>}/>
        
      
        <Route path="/faq" exact element={<FAQ />} />
        <Route path="/gvideos" element={<Gvideos />} />

        {/*---------------------------- Assignmet Management--------------------------------------- */}


        {/*                      -------------------- Admin   ---------------------                  */}



        <Route path="/a1" element={<AssignmentRoute><AssignmentForm /></AssignmentRoute>} />
        <Route path="/a2" element={<AssignmentRoute><AllAssignments /></AssignmentRoute>} />
        <Route path="/a3/:id" element={<AssignmentRoute><AssignmentEdit /></AssignmentRoute>} />
        <Route path="/viewFeed" element={<AssignmentRoute><ViewFeedbacks /></AssignmentRoute>} />
        <Route path="/emailAss" element={<AssignmentRoute><EmailSend /></AssignmentRoute>} />
        <Route path="/test" element={<AssignmentRoute><AllFilesList /></AssignmentRoute>} />

    
        

     




        {/*                      --------------------  User  ---------------------                  */}

        <Route path="/s1" element={<AssignmentRoute><StudentAssignments/></AssignmentRoute>} />
    
        <Route path="/sub" element={<AssignmentRoute><FileUploader /></AssignmentRoute>} />

        <Route path="/FeedbackAss" element={<AssignmentRoute><AssignmentFeedback /></AssignmentRoute>} />


        <Route exact path="/T/D" element={<AssignmentRoute><TeacherD /></AssignmentRoute>} />
        <Route exact path="/charts" element={<AssignmentRoute><ChartJsExample /></AssignmentRoute>} />
     

        <Route path="/details" exact element={<Details />} />



        <Route path="/all" exact element={<DownloadAllFilesButton />} />

        <Route path="/in/get" exact element={<getSubjects/>} />


    











        {/* <Route path="/retriveAss" element={<AssignmentRoute><RetrieveAssignments /></AssignmentRoute>} />
        <Route path="/editAss/:id" element={<AssignmentRoute><EditAssignment /></AssignmentRoute>} /> */}

        <Route path="/AssD" exact element={<AssignmentDetails />} />




         <Route  path="/sm"  exact element={<StudyLogin/>} /> 
        <Route  path="/smt"  exact element={<StudyMaterialRoute><TeacherDashboard /></StudyMaterialRoute>} />
        <Route  path="/sms"  exact element={<StudyMaterialRoute><StudentDashboard /></StudyMaterialRoute>} />
        <Route  path="/smN"  exact element={<StudyMaterialRoute><TeacherNotePage /></StudyMaterialRoute>} />
        <Route  path="/smP"  exact element={<StudyMaterialRoute><TeacherPdfPage /></StudyMaterialRoute>} />
        <Route  path="/smR"  exact element={<StudyMaterialRoute><TeacherResearchPage /></StudyMaterialRoute>} />
        <Route  path="/smRe"  exact element={<StudyMaterialRoute><TeacherRecordPage /></StudyMaterialRoute>} />
        <Route  path="/nmp"  exact element={<StudyMaterialRoute><NoteMaterialPage /></StudyMaterialRoute>} />
        <Route  path="/pmp"  exact element={<StudyMaterialRoute><PdfMaterialPage /></StudyMaterialRoute>} />
        <Route  path="/rmp"  exact element={<StudyMaterialRoute><ResearchMaterialPage /></StudyMaterialRoute>} />
        <Route  path="/rmpRe"  exact element={<StudyMaterialRoute><RecordMaterialPage /></StudyMaterialRoute>} />
        <Route  path="/fbs"  exact element={<FeedbackPage />} />

        <Route  path="/smN/add"  exact element={<NotesAdd />} />
        <Route  path="/smP/add"  exact element={<AddPdf />} />
        <Route  path="/smR/add"  exact element={<AddResearch />} />
        <Route  path="/smRe/add"  exact element={<AddRecords />} />
        <Route  path="/ef"  exact element={<EditFeedBackPage />} />

        <Route  path="/smN/a"  exact element={<AddNoteMaterial />} />
        <Route  path="/smP/a"  exact element={<AddPdfMaterial />} />
        <Route  path="/smR/a"  exact element={<AddResearchMaterial />} />
        <Route  path="/smRe/a"  exact element={<AddRecordMaterial />} />
        <Route  path="/fbs/a"  exact element={<FeedBackStudent />} />
        <Route  path="/fbs/e"  exact element={<StudyMaterialRoute><EditFeedBackPage /></StudyMaterialRoute>} />

        <Route  path="/smN/t/:id"  exact element={<NoteMaterialCardTeacher />} />
        <Route  path="/smP/t/:id"  exact element={<PdfMaterialCardTeacher />} />
        <Route  path="/smR/t/:id"  exact element={<ResearchMaterialCardTeacher />} />
        <Route  path="/smRe/t/:id"  exact element={<RecordMaterialTeacher />} />

        <Route  path="/nmp/s/:id"  exact element={<NoteMaterialCardStudent />} />
        <Route  path="/pmp/s/:id"  exact element={<PdfMaterialCardStudent />} />
        <Route  path="/rmp/s/:id"  exact element={<ResearchMaterialCardStudent />} />
        <Route  path="/rmpRe/s/:id"  exact element={<RecordMaterialCardStudent />} />

        <Route  path="/fbs/t/:id"  exact element={<EditFeedBackPage />} />


        <Route path='/qrgen' exact element={<QRScanner/>}></Route>






      </Routes>
    </BrowserRouter>
  );
}

export default App;
