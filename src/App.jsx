import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import { colorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AuthGuard from "./Components/AuthGuard";
import AdminUsers from "./Pages/Admin/AdminUsers";
import AdminTasks from "./Pages/Admin/AdminTasks";
import Profile from "./Pages/Profile";
import AdminTaskCreate from "./Pages/Admin/AdminTaskCreate";
import DisplayAlert from "./Components/DisplayAlert";
import Logout from "./Pages/Logout";
import NotFound from "./Pages/NotFound";
import UserDashboard from "./Pages/User/UserDashboard";
import UserTasks from "./Pages/User/UserTasks";
import Register from "./Pages/register";

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
            <Route path="/user" element={<AuthGuard />}>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="tasks" element={<UserTasks />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </colorModeContext.Provider>
    </>
  );
}

export default App;
