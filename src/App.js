import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import login from './pages/login';
import registration from './pages/registration';
import home from './pages/home';
import singlepage from './pages/singlepage';
import editor from './pages/editor';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';


function App() {

  const { state } = useContext(AuthContext);
  return (

   
   <Router>

    <Routes>

      <Route path="/" Component={home}/>
      <Route path = "/login" Component={login}/>
      <Route path = "/register" Component={registration}/>
      <Route path = "/blog/:id" Component={singlepage} />
    
      <Route path="/blog/:id/edit" Component = { state.user ? editor : login} />
      <Route path="/write" Component = { state.user ? editor : login} />
      
    </Routes>
    </Router>

  );
}

export default App;
