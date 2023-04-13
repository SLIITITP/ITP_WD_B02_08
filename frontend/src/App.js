//import logo from './logo.svg';
//import './App.css';
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

import AssignmentForm from './components/Assignment_Management_components/AssignmentForm'
import Dashboard from './components/Assignment_Management_components/Dashboard'
import RetrieveAssignments from './components/Assignment_Management_components/RetrieveAssignments'
import EditAssignment from './components/Assignment_Management_components/EditAssignment'





import ViewPayment from './components/ViewPayment'
import PaymentConfirm from './components/PaymentConfirm'
import WriteExam from './pages/user/WriteExam/WriteExam'
import UserReports from './pages/user/UserReports/UserReports'


import PaymentCheckout from './components/PaymentCheckout'


function App() {
  const { loading } = useSelector((state) => state.loader);
  return (

    <BrowserRouter>
      <Header />
      {loading && <Loader />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/getPayment' exact element={<GetPayment />} />
        <Route path='/testuser' element={<Testuser />} />
        <Route path='/t1' element={<T1 />} />
        <Route path='/addPayment' exact element={<AddPayment />} />
        <Route path='/payOnline' exact element={<OnlinePayment />} />
        <Route path='/viewPayment' exact element={<ViewPayment/>}/>
        <Route path='/confirmPayment' exact element={<PaymentConfirm/>}/>
        <Route path='/payment/checkout' exact element={<PaymentCheckout />} />



        {/* Admin Routes for Timetable Management */}
        <Route path="/timetable" exact element={<TimetableSideNav/>}/>
        <Route path="/allClasses" exact element={<TimetableSideNav>
        <AdminEditSchedule/>
        </TimetableSideNav> } />
        <Route path="/addClass" exact element={<TimetableSideNav>
        <AddClass />
        </TimetableSideNav> } />
        <Route path="/adminExamSchedule" exact element={<TimetableSideNav>
        <AdminExamSchedule />
        </TimetableSideNav> } />

         {/* User Routes for Timetable Management */}
        <Route path="/mainTimetable" exact element={<TimetableSideNav>
        <MainTimetable/>
        </TimetableSideNav> } />
        <Route path="/myTimetable" exact element={<TimetableSideNav>
        <MyTimetable/>
        </TimetableSideNav> } />

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
                <UserReports/>
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
        <Route path="/faq" exact element={<FAQ/>}/>
        <Route path="/gvideos" element ={<Gvideos/>}/>
        


        <Route path="/CreateAssignment" exact element={<AssignmentForm />} />
        <Route path="/retriveAss" exact element={<RetrieveAssignments/>} />
        <Route path="/editAss/:id" exact element={<EditAssignment/>} />
        <Route path="/dash" exact element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
