import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import Authentication from './components/Authentication';

function App() {
  return (  
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/createpost" element={<CreatePost />}/>
        <Route path="/authentication" element={<Authentication />}/>
      </Routes>
    </Router>
  );
}

export default App;
