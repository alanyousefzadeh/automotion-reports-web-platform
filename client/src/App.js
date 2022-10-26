import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Monthlies from "./pages/MonthliesPage/Monthlies";

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
                  <WelcomePage />
                </ProtectedRoute>
              }
            />
            
            {/* list of available reports for each garage */}
            <Route
              path="/reportSelect/:garageName"
              element={
                <ProtectedRoute>
                  <ReportSelectPage />
                </ProtectedRoute>
              }
            />
            
            {/* schemehorn filtered report */}
            <Route
              exact
              path="/reportSelect/schemehorn/filtered"
              element={
                <ProtectedRoute>
                  <SchemehornFilteredPage />
                </ProtectedRoute>
              }
            />
            
            {/* schemehorn daily report  (24 hour report)*/}
            <Route
              exact
              path="/reportSelect/schemehorn/daily"
              element={
                <ProtectedRoute>
                  <SchemehornDailyPage />
                </ProtectedRoute>
              }
            />
            
            {/* atlantic terrace filtered report */}
            <Route
              exact
              path="/reportSelect/Atlantic%20Terrace/filtered"
              element={
                <ProtectedRoute>
                  <AtlanticFilteredReportPage />
                </ProtectedRoute>
              }
            />
            
            {/* all automated garages (baxter, vanvorst, waverly) filtered reports */}
            <Route
              path="/reportSelect/:garageName/filtered"
              element={
                <ProtectedRoute>
                  <AutomatedFilteredReportPage />
                </ProtectedRoute>
              }
            />
            
            {/* atlantic terrace daily report (24 hour report) */}
            <Route
              exact
              path="/reportSelect/Atlantic%20Terrace/daily"
              element={
                <ProtectedRoute>
                  <AtlanticDailyReportPage />
                </ProtectedRoute>
              }
            />
            
            {/* daily report (24 hours) */}
            <Route
              path="/reportSelect/:garageName/daily"
              element={
                <ProtectedRoute>
                  <AutomatedDailyReportPage />
                </ProtectedRoute>
              }
            />
            
            {/* wait times report */}
            <Route
              path="/reportSelect/:garageName/wait"
              element={
                <ProtectedRoute>
                  <WaitTimePage />
                </ProtectedRoute>
              }
            />
            
            {/* open tickets report */}
            <Route
              path="/reportSelect/:garageName/open"
              element={
                <ProtectedRoute>
                  <AtlanticOpenPage />
                </ProtectedRoute>
              }
            />
            
            {/* filter by rate report */}
            <Route
              path="/reportSelect/:garageName/filter"
              element={
                <ProtectedRoute>
                  <AutomatedFilteredByRate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reportSelect/:garageName/monthlies"
              element={
                <ProtectedRoute>
                  <Monthlies />
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
