import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './pages/auth-pages/Login';
import Signup from './pages/auth-pages/Signup';
import Profile from './pages/ProfilePage/Profile';
import RestrictAuth from './restrictedRoutes/RestrictAuth';
import RequireAuth from './restrictedRoutes/RequireAuth';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<RestrictAuth />}>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
        
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
