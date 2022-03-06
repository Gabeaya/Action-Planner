import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import Authentication from './components/Authentication';
import { useState } from "react";
import {signOut} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

function App() {
  
  let navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      navigate("/")
    })
  };

  return (  
    <Router>
      <nav>
        <Link to="/"> Home</Link>
        <Link to="/createpost"> Create Post</Link>
        {!isAuth ? <Link to="/authentication"> Login </Link> : <button> Log Out</button>}


      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/createpost" element={<CreatePost />}/>
        <Route path="/authentication" element={<Authentication setIsAuth={setIsAuth}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
