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

function App() {
  const [theme, colorMode] = useMode();

  return (
    <>
      <colorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AuthGuard />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </colorModeContext.Provider>
    </>
  );
}

export default App;
