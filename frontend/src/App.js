//import logo from './logo.svg';
//import './App.css';
import './stylesheets/theme.css'
import './stylesheets/alignments.css'
import './stylesheets/textelements.css'
import './stylesheets/custom-component.css'
import './stylesheets/form-elements.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
//import {createBrowserRouter , RouterProvider} from 'react-router-dom';
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

import Username from './components/Username';
import Password from './components/Password';
import Registers from './components/Registers';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
//import PageNotFoud from './components/PageNotFound';
import Reset from './components/Reset';

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


      <Route path="/plogin" element={<Username/>}/>
      <Route path="/password" element={<Password/>}/>
      <Route path="/registers" element={<Registers/>}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/recovery" element={<Recovery/>}/>
      <Route path="/reset" element={<Reset/>}/>
      {/* <Route path="*" element={<PageNotFoud/>}/> */}

    </Routes>
    </BrowserRouter>
  );
}

export default App;
