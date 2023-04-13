//import logo from './logo.svg';
//import './App.css';


import StripeContainer from './components/StripeContainer';

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


import AddPayment from './components/AddPayment'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/common/Home'
import OnlinePayment from './components/OnlinePayment'
import Exams from './pages/admin/Exams'
import AddEditExam from './pages/admin/Exams/AddEditExam'

import Username from './components/Username';
import Password from './components/Password';
import Registers from './components/Registers';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
//import PageNotFoud from './components/PageNotFound';
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

import AssignmentForm from './components/Assignment_Management_components/AssignmentForm'

import RetrieveAssignments from './components/Assignment_Management_components/RetrieveAssignments'
import EditAssignment from './components/Assignment_Management_components/EditAssignment'
import Details from './components/Assignment_Management_components/Details'
import Navbar1 from './components/Assignment_Management_components/Navbar1'
import Home1 from './components/Assignment_Management_components/pages/Home1';
import Reports from './components/Assignment_Management_components/pages/Reports';
import Products from './components/Assignment_Management_components/pages/Products';

///////////////////////////////////////////////////




import ViewPayment from './components/ViewPayment'
import PaymentConfirm from './components/PaymentConfirm'

import { Switch } from 'antd'

import WriteExam from './pages/user/WriteExam/WriteExam'
import UserReports from './pages/user/UserReports/UserReports'


import PaymentCheckout from './components/PaymentCheckout'


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
        <Route path='/payment/addSubToTeachers' element={<AddSubToTeachers/>} />
        <Route path='/subject/update' element={<SubListUpdate/>} />
        <Route path='/salary/calculate' element={<SalaryCalculation />} />




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

        <Route path="/plogin" element={<Username />} />
        <Route path="/password" element={<Password />} />
        <Route path="/registers" element={<Registers />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
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



        <Route path="/CreateAssignment" exact element={<AssignmentForm />} />

        <Route path="/retriveAss" exact element={<RetrieveAssignments/>} />
        <Route path="/editAss/:id" exact element={<EditAssignment/>} />
        
        <Route path="/details" exact element={<Details/>} />

        
        <Route path="/nav" exact element={<Navbar1/>}/>
      
        <Route path="/reports" exact element={<Reports/>}/>
        <Route path="/products" exact element={<Products/>}/>
        

        <Route path="/retriveAss" exact element={<RetrieveAssignments />} />
        <Route path="/editAss/:id" exact element={<EditAssignment />} />
        

        <Route exact path="/sm" element={<enrollPage/>}/>
          <Route exact path="/smt" element={<TeacherDashboard/>}/>
          <Route exact path="/sms" element={<StudentDashboard/>}/>
          <Route exact path="/smN" element={<TeacherNotePage/>}/>
          <Route exact path="/smP" element={<TeacherPdfPage/>}/>
          <Route exact path="/smR" element={<TeacherResearchPage/>}/>
          <Route exact path="/smRe" element={<TeacherRecordPage/>}/>
          <Route exact path="/nmp" element={<NoteMaterialPage/>}/>
          <Route exact path="/pmp" element={<PdfMaterialPage/>}/>
          <Route exact path="/rmp" element={<ResearchMaterialPage/>}/>
          <Route exact path="/rmpRe" element={<RecordMaterialPage/>}/>
          <Route exact path="/fbs" element={<FeedbackPage/>}/>

          <Route exact path="/smN/add" element={<NotesAdd/>}/>
          <Route exact path="/smP/add" element={<AddPdf/>}/>
          <Route exact path="/smR/add" element={<AddResearch/>}/>
          <Route exact path="/smRe/add" element={<AddRecords/>}/>
          <Route exact path="/ef" element={<EditFeedBackPage/>}/>

          <Route exact path="/smN/a" element={<AddNoteMaterial/>}/>
          <Route exact path="/smP/a" element={<AddPdfMaterial/>}/>
          <Route exact path="/smR/a" element={<AddResearchMaterial/>}/>
          <Route exact path="/smRe/a" element={<AddRecordMaterial/>}/>
          <Route exact path="/fbs/a" element={<FeedBackStudent/>}/>
          <Route exact path="/fbs/e" element={<EditFeedBackPage/>}/>

          <Route exact path="/smN/t/:id" element={<NoteMaterialCardTeacher/>}/>
          <Route exact path="/smP/t/:id" element={<PdfMaterialCardTeacher/>}/>
          <Route exact path="/smR/t/:id" element={<ResearchMaterialCardTeacher/>}/>
          <Route exact path="/smRe/t/:id" element={<RecordMaterialTeacher/>}/>

          <Route exact path="/nmp/s/:id" element={<NoteMaterialCardStudent/>}/>
          <Route exact path="/pmp/s/:id" element={<PdfMaterialCardStudent/>}/>
          <Route exact path="/rmp/s/:id" element={<ResearchMaterialCardStudent/>}/>
          <Route exact path="/rmpRe/s/:id" element={<RecordMaterialCardStudent/>}/>

          <Route exact path="/fbs/t/:id" element={<EditFeedBackPage/>}/>

        






      </Routes>
    </BrowserRouter>
  );
}

export default App;
