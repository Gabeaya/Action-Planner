import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import CreateQuest from './components/CreateQuest';
import Authentication from './components/Authentication';
import { useState } from "react";
// import {signOut} from 'firebase/auth';
// import {auth} from './firebase';



function App() {
  const [missionValues, setMissionValues] = useState([{ mission:""}]);

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  // const signUserOut = () => {
  //   signOut(auth).then(() => {
  //     localStorage.clear()
  //     setIsAuth(false)
  //     window.location.pathname = "/authentication";
  //   })
  // };

  return (  
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      {/* <nav>
        <Link to="/"> Home</Link>
        {!isAuth ? (
          <Link to="/authentication"> Login </Link> 
        ) : (
          <>
          <Link to="/createquest"> Begin a Quest</Link>
          <button onClick={signUserOut}> Log Out</button>
          </>
        )}
      </nav> */}
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />}/>
        <Route path="/createquest"  element={<CreateQuest missionValues={missionValues} setMissionValues={setMissionValues}/>}/>
        <Route path="/authentication" element={<Authentication setIsAuth={setIsAuth}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
