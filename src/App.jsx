
import CustomRoutes from './Components/CustomRoutes'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './Pages/Home'
import AdminDashboard from './Pages/Admin/AdminDashboard'
function App() {

  return (
    <>
      hello world
      <Router>
        <CustomRoutes>
          <Route path="/" element={<Home />} />
          <Route path="/admin">
            <Route path='dashboard' element={<AdminDashboard />} />
          </Route>
        </CustomRoutes>
      </Router>
    </>
  )
}

export default App
