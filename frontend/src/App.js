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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/getPayment' exact element={<GetPayment />} />
        <Route path='/testuser' element={<Testuser />} />
        <Route path='/t1' element={<T1 />} />
        <Route path='/addPayment' exact element={<AddPayment />} />
        <Route path='/payOnline' exact element={<OnlinePayment />} />

        <Route path="/allClasses" exact element={<AdminEditSchedule />} />
        <Route path="/addClass" exact element={<AddClass />} />


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
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
