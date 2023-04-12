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
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/common/Home'

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

      //study materials routes
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



      <Route path='/exams' element={<ProtectedRoute>
      
        
        
        <Home/>


      </ProtectedRoute>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
