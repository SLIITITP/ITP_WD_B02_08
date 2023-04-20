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

import {AuthorizeUser , ProtectRoute} from './middleware/auth'
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

import StudentTicket from './components/StudentTicket'
import AddTicket from './components/AddTicket'
import EditTicket from './components/EditTicket'
import TicketList from './components/TicketList';
import ViewReply from './components/ViewReply';
import Reply from './components/reply';
import FAQ from './components/faq';
import Gvideos from './components/GuideVideos';


/////__________________Assignments___________________/////////////////////////////////////

import AssignmentForm1 from './components/Assignment_Management_components/AssignmentForm1'
import AssignmentRoute from "./components/AssignmentRoutes";
import RetrieveAssignments from './components/Assignment_Management_components/RetrieveAssignments'
import EditAssignment from './components/Assignment_Management_components/EditAssignment'
import StudentView from './components/Assignment_Management_components/StudentView';

import FileUploader from './components/Assignment_Management_components/FileUploader';

import SubjectRelated from './components/Assignment_Management_components/SubjectRelated';

import DownloadAllFilesButton from './components/Assignment_Management_components/DownloadAllFilesButton';







import Details from './components/Assignment_Management_components/Details'

import AssignmentDetails from './components/Assignment_Management_components/AssignmentDetails';



///////////////////////////////////////////////////




import ViewPayment from './components/PaymentComponents/ViewPayment'
import PaymentConfirm from './components/PaymentComponents/PaymentConfirm'

import { Switch } from 'antd'

import WriteExam from './pages/user/WriteExam/WriteExam'
import UserReports from './pages/user/UserReports/UserReports'


import PaymentCheckout from './components/PaymentComponents/PaymentCheckout'


//import main pages
//import enrollPage from './pages/Materials/enrollPage';
import StudentDashboard from './pages/Materials/StudentDashboard';
import TeacherDashboard from './pages/Materials/TeacherDashboard';
import TeacherNotePage from './pages/Materials/TeacherNotePage';
import TeacherPdfPage from './pages/Materials/TeacherPdfPage';
import TeacherResearchPage from './pages/Materials/TeacherResearchPage';
import TeacherRecordPage from './pages/Materials/TeacherRecordPage';

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
        <Route path='/addPayment' exact element={<AddPayment />} />
        <Route path='/payOnline' exact element={<OnlinePayment />} />
        <Route path='/viewPayment' exact element={<ViewPayment />} />
        <Route path='/confirmPayment' exact element={<PaymentConfirm />} />
        <Route path='/payment/checkout' exact element={<StripeContainer />} />
        <Route path='/payment/addSubToTeachers' element={<AddSubToTeachers />} />
        <Route path='/subject/update' element={<SubListUpdate />} />
        <Route path='/salary/calculate' element={<SalaryCalculation />} />
        <Route path='/niptest' element={<NipTest />} />
        <Route path='/niptest2' element={<NipTest2 />} />
        <Route path='/salary/history' element={<SalaryHistory />} />
        <Route path='/am/add' element={<GetAm />} />
        <Route path='/am/check' element={<CheckAm />} />






        {/* Admin Routes for Timetable Management */}
        <Route path="/timetable" exact element={<TimetableSideNav />} />
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
        <Route path="/profile" element={<AuthorizeUser><Profile /></AuthorizeUser> } />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
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



        <Route path="/STickets" exact element={<StudentTicket />} />
        <Route path="/addTicket" exact element={<AddTicket />} />
        <Route path="/edit/:id" exact element={<EditTicket />} />
        <Route path="/ticketlist" exact element={<TicketList />} />
        <Route path="/vreply/:id" exact element={<ViewReply />} />
        <Route path="/reply/:id" exact element={<Reply />} />
        <Route path="/faq" exact element={<FAQ />} />
        <Route path="/gvideos" element={<Gvideos />} />

        {/*---------------------------- Assignmet Management--------------------------------------- */}

        <Route path="/CreateAssignment" exact element={<AssignmentForm1 />} />
        <Route path="/retriveAss" element={<AssignmentRoute><RetrieveAssignments /></AssignmentRoute>} />
        <Route path="/editAss/:id" element={<AssignmentRoute><EditAssignment /></AssignmentRoute>} />


{/*                      --------------------  User  ---------------------                  */}


        <Route path="/student/view" element={<AssignmentRoute><StudentView /></AssignmentRoute>} />
        <Route path="/subR" element={<AssignmentRoute><SubjectRelated /></AssignmentRoute>} />
       



        <Route exact path="/T/D" element={<AssignmentRoute><TeacherD /></AssignmentRoute>} />

        <Route path="/details" exact element={<Details />} />

        <Route path="/sub" exact element={<FileUploader />} />

          <Route path="/all" exact element={<DownloadAllFilesButton />} />
    





        {/* <Route path="/retriveAss" element={<AssignmentRoute><RetrieveAssignments /></AssignmentRoute>} />
        <Route path="/editAss/:id" element={<AssignmentRoute><EditAssignment /></AssignmentRoute>} /> */}

        <Route path="/AssD" exact element={<AssignmentDetails />} />




        <Route exact path="/sm" element={<enrollPage />} />
        <Route exact path="/smt" element={<TeacherDashboard />} />
        <Route exact path="/sms" element={<StudentDashboard />} />
        <Route exact path="/smN" element={<TeacherNotePage />} />
        <Route exact path="/smP" element={<TeacherPdfPage />} />
        <Route exact path="/smR" element={<TeacherResearchPage />} />
        <Route exact path="/smRe" element={<TeacherRecordPage />} />
        <Route exact path="/nmp" element={<NoteMaterialPage />} />
        <Route exact path="/pmp" element={<PdfMaterialPage />} />
        <Route exact path="/rmp" element={<ResearchMaterialPage />} />
        <Route exact path="/rmpRe" element={<RecordMaterialPage />} />
        <Route exact path="/fbs" element={<FeedbackPage />} />

        <Route exact path="/smN/add" element={<NotesAdd />} />
        <Route exact path="/smP/add" element={<AddPdf />} />
        <Route exact path="/smR/add" element={<AddResearch />} />
        <Route exact path="/smRe/add" element={<AddRecords />} />
        <Route exact path="/ef" element={<EditFeedBackPage />} />

        <Route exact path="/smN/a" element={<AddNoteMaterial />} />
        <Route exact path="/smP/a" element={<AddPdfMaterial />} />
        <Route exact path="/smR/a" element={<AddResearchMaterial />} />
        <Route exact path="/smRe/a" element={<AddRecordMaterial />} />
        <Route exact path="/fbs/a" element={<FeedBackStudent />} />
        <Route exact path="/fbs/e" element={<EditFeedBackPage />} />

        <Route exact path="/smN/t/:id" element={<NoteMaterialCardTeacher />} />
        <Route exact path="/smP/t/:id" element={<PdfMaterialCardTeacher />} />
        <Route exact path="/smR/t/:id" element={<ResearchMaterialCardTeacher />} />
        <Route exact path="/smRe/t/:id" element={<RecordMaterialTeacher />} />

        <Route exact path="/nmp/s/:id" element={<NoteMaterialCardStudent />} />
        <Route exact path="/pmp/s/:id" element={<PdfMaterialCardStudent />} />
        <Route exact path="/rmp/s/:id" element={<ResearchMaterialCardStudent />} />
        <Route exact path="/rmpRe/s/:id" element={<RecordMaterialCardStudent />} />

        <Route exact path="/fbs/t/:id" element={<EditFeedBackPage />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
