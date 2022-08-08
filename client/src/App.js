import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import ReportSelectPage from './pages/ReportSelectPage/ReportSelectPage';
import FilteredReportPage from './pages/AtlanticFilteredReportPage/AtlanticFilteredReportPage';
import AtlanticDailyReportPage from './pages/AtlanticDailyReportPage/AtlanticDailyReportPage';
import AutomatedFilteredReportPage from './pages/AutomatedFilteredReportPage/AutomatedFilteredReportPage';
import WaitTimePage from './pages/WaitTimesPage/WaitTimePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Navigate to='/login'/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/welcome' element={<WelcomePage/>}/>
          <Route path='/reportSelect/:garageName' element={<ReportSelectPage/>}/>  
          <Route path='/reportSelect/:garageName/filtered' element={<FilteredReportPage/>}/>
          <Route path='/reportSelect/:garageName/daily' element={<AtlanticDailyReportPage/>}/>  
          <Route path='/reportSelect/:garageName/wait' element={<WaitTimePage/>}/>
          {/* <Route path='/reportSelect/:garageName/partial' element={<AutomatedFilteredReportPage/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
