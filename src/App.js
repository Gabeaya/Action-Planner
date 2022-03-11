import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import CreateQuest from './components/CreateQuest';
import Authentication from './components/Authentication';
import Logout from './components/Logout';
import React, { useState } from "react";

import './components/App.css';

function App() {
  const [missionValues, setMissionValues] = useState([{ mission:""}]);

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (  
    <div className='app'>
      <Router>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} missionValues={missionValues} setMissionValues={setMissionValues}/>}/>
          <Route path="/createquest"  element={<CreateQuest missionValues={missionValues} setMissionValues={setMissionValues}/>}/>
          <Route path="/authentication" element={<Authentication setIsAuth={setIsAuth}/>}/>
          <Route path="/logout" element={<Logout setIsAuth={setIsAuth}/>}/>
        </Routes>
      </Router>
    </div>
      

      
    

      

    
  );
}

export default App;