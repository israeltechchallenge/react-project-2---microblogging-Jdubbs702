import './App.css';
import NavBar from './components/NavBar/Navbar';
import TweetsContainer from './pages/Home/Home';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Profile from './pages/Profile/Profile';
import { useState, useEffect } from 'react';
import localforage from "localforage";

function App() {

  const [userName, setUserName] = useState('');
  const [updatedUserName, setUpdatedUserName] = useState(userName);
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault()
    console.log(userName)
    setUpdatedUserName(userName);
    navigate('./home')
    }

  useEffect(() => {
    localforage.getItem("tweeter").then(val => {
      console.log("got: ", val);
      if (val) {
        setUserName(val)
      }
    });
  }, [])

  useEffect(() => {
    localforage.setItem("tweeter", userName).then(() => {

    });
  }, [userName])

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/home' element={<TweetsContainer userName={updatedUserName} />} />
        <Route path='/profile' element={<Profile userName={userName} setUserName={setUserName} handleSave={handleSave} />} />
      </Routes>
    </div>
  );
}

export default App;
