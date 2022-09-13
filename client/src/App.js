import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import ReportSelectPage from './pages/ReportSelectPage/ReportSelectPage';
import FilteredReportPage from './pages/AtlanticFilteredReportPage/AtlanticFilteredReportPage';
import AtlanticDailyReportPage from './pages/AtlanticDailyReportPage/AtlanticDailyReportPage';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {AuthContextProvider} from "./components/Context/AuthContext";
import WaitTimePage from './pages/WaitTimesPage/WaitTimePage'
import AtlanticOpenPage from './pages/AtlanticOpenPage/AtlanticOpenPage';
import SchemehornFilteredPage from './pages/SchemehornFilteredPage/SchemehornFilteredPage';


function App() {
  return (
    <div className="App">
      <div className="App">
        <AuthContextProvider>
          <Routes>
            <Route exact path='/' element={<Navigate to='/login'/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/welcome' element={<ProtectedRoute><WelcomePage/></ProtectedRoute>}/>
            <Route path='/reportSelect/:garageName' element={<ProtectedRoute><ReportSelectPage/></ProtectedRoute>}/>
            {/* <Route exact path='/reportSelect/schemehorn/daily' element={<ProtectedRoute><schemehornDailyPage/></ProtectedRoute>}/> */}
            <Route exact path='/reportSelect/schemehorn/filtered' element={<ProtectedRoute><SchemehornFilteredPage/></ProtectedRoute>}/>
            <Route path='/reportSelect/:garageName/filtered' element={<ProtectedRoute><FilteredReportPage/></ProtectedRoute>}/>
            <Route path='/reportSelect/:garageName/daily' element={<ProtectedRoute><AtlanticDailyReportPage/></ProtectedRoute>}/>
            <Route path='/reportSelect/:garageName/wait' element={<ProtectedRoute><WaitTimePage/></ProtectedRoute>}/>
            <Route path='/reportSelect/:garageName/open' element={<ProtectedRoute><AtlanticOpenPage/></ProtectedRoute>}/>
          </Routes>
        </AuthContextProvider>
      </div>
      </div>
  );
}

export default App;