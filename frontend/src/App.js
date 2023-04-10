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
import AdminEditSchedule from "./components/AdminEditSchedule";
import AddClass from "./components/AddClass";
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

import AssignmentForm from './components/Assignment_Management_components/AssignmentForm'


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

        {/* Admin Routes for Timetable Management */}
        <Route path="/allClasses" exact element={<AdminEditSchedule />} />
        <Route path="/addClass" exact element={<AddClass />} />


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




        <Route path="/CreateAssignment" exact element={<AssignmentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
