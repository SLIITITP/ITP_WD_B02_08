//import logo from './logo.svg';
//import './App.css';
import './stylesheets/theme.css'
import './stylesheets/alignments.css'
import './stylesheets/textelements.css'
import './stylesheets/custom-component.css'
import './stylesheets/form-elements.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
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
import StudentTicket from './components/StudentTicket'
import AddTicket from './components/AddTicket'
import EditTicket from './components/EditTicket'
import TicketList from './components/TicketList';
import ViewReply from './components/ViewReply';
import Reply from './components/reply';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path='/getPayment' exact element={<GetPayment/>}/>
      <Route path='/testuser'  element={<Testuser/>}/>
      <Route path='/t1'  element={<T1/>}/>
      <Route path='/addPayment' exact element={<AddPayment/>}/>

      <Route path="/allClasses" exact element={<AdminEditSchedule/>} />
      <Route path="/addClass" exact element={<AddClass/>} />
      <Route path="/STickets" exact element={<StudentTicket/>} />
      <Route path="/addTicket" exact element={<AddTicket/>} />
      <Route path="/edit/:id" exact element={<EditTicket/>} />
      <Route path="/ticketlist" element ={<TicketList/>}/>
       <Route path="/vreply/:id" element ={<ViewReply/>}/>
       <Route path="/reply/:id" element ={<Reply/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
