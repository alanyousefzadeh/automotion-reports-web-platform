import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import ReportSelectPage from './pages/ReportSelectPage/ReportSelectPage';
import ReportPage from './pages/ReportPage/ReportPage.';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Navigate to='/login'/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/welcome' element={<WelcomePage/>}/>
          <Route path='/reportSelect/:garageName' element={<ReportSelectPage/>}/>  
          <Route path='/reportSelect/:garageName/:reportName' element={<ReportPage/>}/>  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
