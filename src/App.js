import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import CreateQuest from './components/CreateQuest';
import Authentication from './components/Authentication';
import Logout from './components/Logout';
import { useState } from "react";

// import {signOut} from 'firebase/auth';
// import {auth} from './firebase';



function App() {
  const [missionValues, setMissionValues] = useState([{ mission:""}]);

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (  
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>}/>
        <Route path="/createquest"  element={<CreateQuest missionValues={missionValues} setMissionValues={setMissionValues}/>}/>
        <Route path="/authentication" element={<Authentication setIsAuth={setIsAuth}/>}/>
        <Route path="/logout" element={<Logout setIsAuth={setIsAuth}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
