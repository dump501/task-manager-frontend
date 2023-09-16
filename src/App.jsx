import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import { colorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./Pages/Global/Topbar";
import Sidebar from "./Pages/Global/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Tasks from "./Pages/Tasks";
import AuthGuard from "./Components/AuthGuard";
import Users from "./Pages/Users";
import AdminUsers from "./Pages/Admin/AdminUsers";
import AdminTasks from "./Pages/Admin/AdminTasks";
import Profile from "./Pages/Profile";
import AdminTaskCreate from "./Pages/Admin/AdminTaskCreate";
import DisplayAlert from "./Components/DisplayAlert";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <>
      <colorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DisplayAlert />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AuthGuard />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="tasks" element={<AdminTasks />} />
              <Route path="tasks/create" element={<AdminTaskCreate />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </colorModeContext.Provider>
    </>
  );
}

export default App;
