import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import ReportSelectPage from "./pages/ReportSelectPage/ReportSelectPage";
import AtlanticFilteredReportPage from "./pages/AtlanticFilteredReportPage/AtlanticFilteredReportPage";
import AtlanticDailyReportPage from "./pages/AtlanticDailyReportPage/AtlanticDailyReportPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthContextProvider } from "./components/Context/AuthContext";
import WaitTimePage from "./pages/WaitTimesPage/WaitTimePage";
import AtlanticOpenPage from "./pages/AtlanticOpenPage/AtlanticOpenPage";
import SchemehornFilteredPage from "./pages/SchemehornFilteredPage/SchemehornFilteredPage";
import SchemehornDailyPage from "./pages/SchemehornDailyPage/SchemehornDailyPage";
import AutomatedFilteredReportPage from "./pages/AutomatedFilteredReportPage/AutomatedFilteredReportPage";
import AutomatedDailyReportPage from "./pages/AutomatedDailyReportPage/AutomatedDailyReportPage";
import AutomatedFilteredByRate from "./pages/AutomatedFilteredByRate/AutomatedFilteredByRate";
import MonthliesPage from "./pages/MonthliesPage/MonthliesPage";
import AutomatedFilteredSelectPage from "./pages/AutomatedFilteredSelectPage/AutomatedFiltetedSelectPage";

function App() {
  return (
    <div className="App">
      <div className="App">
        <AuthContextProvider>
          <Routes>
            <Route exact path="/" element={<Navigate to="/login" />} />

            {/* login page */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* list of garages to select*/}
            <Route
              path="/welcome"
              element={
                <ProtectedRoute>
                  <WelcomePage 
                  email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}/>
                </ProtectedRoute>
              }
            />
            
            {/* list of available reports for each garage */}
            <Route
              path="/reportSelect/:garageName"
              element={
                <ProtectedRoute>
                  <ReportSelectPage 
                  email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}/>
                </ProtectedRoute>
              }
            />
            
            {/* schemehorn filtered report */}
            <Route
              exact
              path="/reportSelect/schemehorn/filtered"
              element={
                <ProtectedRoute>
                  <SchemehornFilteredPage 
                  email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
            
            {/* schemehorn daily report  (24 hour report)*/}
            <Route
              exact
              path="/reportSelect/schemehorn/daily"
              element={
                <ProtectedRoute>
                  <SchemehornDailyPage
                  email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
            
            {/* atlantic terrace filtered report */}
            <Route
              exact
              path="/reportSelect/Atlantic%20Terrace/filtered"
              element={
                <ProtectedRoute>
                  <AtlanticFilteredReportPage
                  email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
            
            {/* all automated garages (baxter, vanvorst, waverly) filtered reports */}
            <Route
              path="/reportSelect/:garageName/filtered"
              element={
                <ProtectedRoute>
                  {/* <AutomatedFilteredReportPage
                  email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  /> */}
                  <AutomatedFilteredSelectPage/>
                </ProtectedRoute>
              }
            />

            {/* all automated garages (baxter, vanvorst, waverly) filtered reports */}
            <Route
              path={`/reportSelect/:garageName/filtered/dates`}
              element={
                <ProtectedRoute>
                  <AutomatedFilteredReportPage
                  // email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  /> 
                  {/* <AutomatedFilteredSelectPage/> */}
                </ProtectedRoute>
              }
            />
            
            {/* atlantic terrace daily report (24 hour report) */}
            <Route
              exact
              path='/reportSelect/Atlantic%20Terrace/daily'
              element={
                <ProtectedRoute>
                  <AtlanticDailyReportPage
                  email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
            
            {/* daily report (24 hours) */}
            <Route
              path="/reportSelect/:garageName/daily"
              element={
                <ProtectedRoute>
                  <AutomatedDailyReportPage 
                  email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
            
            {/* wait times report */}
            <Route
              path="/reportSelect/:garageName/wait"
              element={
                <ProtectedRoute>
                  <WaitTimePage
                  email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
            
            {/* open tickets report */}
            <Route
              path="/reportSelect/:garageName/open"
              element={
                <ProtectedRoute>
                  <AtlanticOpenPage
                  email={['alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
            
            {/* filter by rate report */}
            <Route
              path="/reportSelect/:garageName/filter"
              element={
                <ProtectedRoute>
                  <AutomatedFilteredByRate
                  email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reportSelect/:garageName/monthlies"
              element={
                <ProtectedRoute>
                  <MonthliesPage
                  email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthContextProvider>
      </div>
    </div>
  );
}

export default App;
