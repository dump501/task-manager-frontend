
import CustomRoutes from './Components/CustomRoutes'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import { colorModeContext, useMode } from "./theme"
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import Topbar from './Pages/Global/Topbar'
import Sidebar from './Pages/Global/Sidebar'
import Dashboard from './Pages/Dashboard'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { drawerWidth } from './helpers/uiHelpers'

function App() {
  const [theme, colorMode] = useMode()
  const {isDrawerOpen} = useSelector((state) => state.ui)

  return (
    <>
      <colorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box display="flex">
            <Sidebar />
            <Box
              sx={{
                ml: isDrawerOpen ? "0" : `-${drawerWidth}px`
              }}
            >
              <Topbar />
              <Routes>
                <Route path='/' element={<Dashboard />} />
              </Routes>
            </Box>
          </Box>
        </ThemeProvider>
      </colorModeContext.Provider>
    </>
  )
}

export default App
