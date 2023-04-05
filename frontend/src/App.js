import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import GetPayment from './components/GetPayment';

function App() {
  return (
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/getPayment' exact element={<GetPayment/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
