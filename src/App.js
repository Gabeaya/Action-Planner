import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import Authentication from './components/Authentication';
import { useState } from "react";

function App() {

  const [isAuth, setIsAuth] = useState(false);

  return (  
    <Router>
      <nav>
        <Link to="/"> Home</Link>
        <Link to="/createpost"> Create Post</Link>
        <Link to="/authentication"> Login </Link>

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
