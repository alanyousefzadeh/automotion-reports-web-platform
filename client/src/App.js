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
import MonthliesPage from "./pages/MonthliesPage/MonthliesPage";
import AdminProtectedRoute from "./components/AdminProtectedRoute/AdminProtectedRoute";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminSelectPage from "./pages/AdminSelectPage/AdminSelectPage";
import AdminDeletePage from "./pages/AdminDeletePage/AdminDeletePage";
import AdminUpdatePage from "./pages/AdminUpdatePage/AdminUpdatePage";
import AdminUpdateDetailsPage from "./pages/AdminUpdateDetailsPage/AdminUpdateDetailsPage";
import UnauthorizedPage from "./pages/UnauthorizedPage/UnauthorizedPage";
import CarDetailsPage from "./pages/CarDetailsPage/CarDetailsPage";

function App() {

  return (
    <div className="App">
      <div className="App">
        <AuthContextProvider>
          <Routes>
            <Route exact path="/" element={<Navigate to="/login" />} />

            {/* login page */}
            <Route path="/login" element={<LoginPage />} />
            <Route path='unauthorized' element={<UnauthorizedPage/>}/>
            
            {/* list of garages to select*/}
            <Route
              path="/welcome"
              element={
                <ProtectedRoute>
                  <WelcomePage 
                  //email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />

            {/* create new admin */}
            <Route
              path="/admin/Create"
              element={
                <ProtectedRoute>
                  <AdminPage 
                  />
                </ProtectedRoute>
              }
            />

            {/* delete admin */}
            <Route
              path="/admin/delete"
              element={
                <ProtectedRoute>
                  <AdminDeletePage 
                  />
                </ProtectedRoute>
              }
            />

            {/* update admin */}
            <Route
              path="/admin/update"
              element={
                <ProtectedRoute>
                  <AdminUpdatePage 
                  />
                </ProtectedRoute>
              }
            />

            {/* update admin */}
            <Route
              path="/admin/update/:userId"
              element={
                <ProtectedRoute>
                  <AdminUpdateDetailsPage 
                  />
                </ProtectedRoute>
              }
            />

            {/* admin portal*/}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminSelectPage 
                  //email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
            
            {/* list of available reports for each automated garage */}
            <Route
              path="/reportSelect/:garageName"
              element={
                <ProtectedRoute>
                  <ReportSelectPage 
                  //email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
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
                  //email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
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
                  //email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
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
                  //email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
            
            {/* all automated garages (baxter, vanvorst, waverly, 24th Street) filtered reports */}
            <Route
              path="/reportSelect/:garageName/filtered"
              element={
                <ProtectedRoute>
                  <AutomatedFilteredReportPage
                  //email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
            
            {/* atlantic terrace daily report (24 hour report) */}
            <Route
              exact
              path="/reportSelect/Atlantic%20Terrace/daily"
              element={
                <ProtectedRoute>
                  <AtlanticDailyReportPage
                  //email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
            
            {/* All automated Garages Daily report (24 hours) */}
            <Route
              path="/reportSelect/:garageName/daily"
              element={
                <ProtectedRoute>
                  <AutomatedDailyReportPage 
                  //email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
            
            {/* All automated Garages wait-times report */}
            <Route
              path='/reportSelect/:garageName/wait'
              element={
                <ProtectedRoute>
                  <WaitTimePage
                  //email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />

            
            {/* All automated Garages open-tickets report */}
            <Route
              path="/reportSelect/:garageName/open"
              element={
                <ProtectedRoute>
                  <AtlanticOpenPage
                  //email={['alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
            
            {/* All automated Garages filter-by-rate report */}
            <Route
              path="/reportSelect/:garageName/filter"
              element={
                <ProtectedRoute>
                  <AutomatedFilteredByRate
                  //email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reportSelect/:garageName/monthlies"
              element={
                <ProtectedRoute>
                  <MonthliesPage
                  //email={['shmuelw@automotionparking.com', 'alany@adgorg.com']}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reportSelect/:garageName/monthlies/carDetails/:carId"
              element={
                <ProtectedRoute>
                  <CarDetailsPage
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
