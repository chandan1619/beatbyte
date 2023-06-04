import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar';
import Login from './components/Login';
import Registration from './components/Registration';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import login from './pages/login';
import registration from './pages/registration';
import home from './pages/home';
import singlepage from './pages/singlepage';
import editor from './pages/editor';

function App() {
  return (
   <Router>

    <Routes>

      <Route path="/" Component={home}/>
      <Route path = "/login" Component={login}/>
      <Route path = "/register" Component={registration}/>
      <Route path = "/blog/:id" Component={singlepage} />
      <Route path = "/blog/:id/edit" Component={editor} />
      <Route path = '/write' Component = {editor} />
    

    </Routes>
    </Router>
  );
}

export default App;
