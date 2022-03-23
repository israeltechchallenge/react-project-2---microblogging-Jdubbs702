import './App.css';
import NavBar from './components/NavBar/Navbar';
import TweetsContainer from './pages/Home/Home';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Profile from './pages/Profile/Profile';
import { useState, useEffect, useContext } from 'react';
import localforage from "localforage";
import LogIn from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import useAuth from './hooks/useAuth';
import { AuthContext } from './contexts/AuthContext'

function App() {

  const auth = useAuth();
  const { isLoggedIn } = auth;

  return (
    <div className="App">
      <AuthContext.Provider value={auth}>
        <NavBar />
        <Routes>
          {isLoggedIn ? <>
            <Route path='/' element={<TweetsContainer/>} protected='true'/>
            <Route path='/profile' element={<Profile/>} protected='true'/> 
            <Route path='*' element={<Navigate to="" />} /></>
            : <>
            <Route path='/login' element={<LogIn />} protected='false' />
            <Route path='/signup' element={<SignUp />} protected='false' />
            <Route path='*' element={<Navigate to="/login" />} /> </>
          }
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
