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
    </Routes>
    </BrowserRouter>
  );
}

export default App;
