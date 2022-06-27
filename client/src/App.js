import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<RegisterPage/>}/> */}
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/welcome' element={<WelcomePage/>}/>
          {/* <Route path='/report' element={<ReportPage/>}/>   */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
