import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import ReportSelectPage from './pages/ReportSelectPage/ReportSelectPage';
import FilteredReportPage from './pages/FilteredReportPage/FilteredReportPage';
import DailyReportPage from './pages/DailyReportPage/DailyReportPage';
import Transactions from './pages/TransactionsPage/Transactions';

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
          <Route path='/reportSelect/:garageName/daily' element={<DailyReportPage/>}/>  
          <Route path='/transactions' element={<Transactions/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
