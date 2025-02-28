import { Routes, Route } from 'react-router-dom';
import { isUserLoggedIn } from './app/AuthSlice';
import { useSelector } from 'react-redux';
import RequireAuth from './hooks/RequireAuth.jsx';

// pages
import Landing from './pages/Landing.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import Welcome from './pages/Welcome';
import ForgotPassword from './pages/ForgotPassword';
import Unauthorized from './pages/Unauthorized';
import Records from './pages/admin/Records.jsx';
import AddEmployee from './pages/admin/AddEmployee.jsx';

//layouts
import SidebarLayout from './layouts/SidebarLayout.jsx';

function App() {
  return (

    <Routes>
      <Route index path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/verify-email' element={<VerifyEmail />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/unauthorized' element={<Unauthorized />} />

      {/* Employee Routes */}
      <Route element={<RequireAuth allowedRoles={[2]} />}>
        <Route path="/dashboard" element={<Welcome />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<RequireAuth allowedRoles={[1]} />}>
        <Route path="/dashboard" element={<SidebarLayout />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="records" element={<Records />} />
          <Route path="add" element={<AddEmployee />} />
        </Route>
      </Route>

    </Routes >

  )
}

export default App