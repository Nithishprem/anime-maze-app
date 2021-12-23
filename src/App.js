import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Detail from './pages/Detail';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/main" element={<PrivateRoute/>}>
          <Route path="/main" element={<Main/>}/>
        </Route>
        <Route path="/detail/:animeId" element={<Detail/>}/>
      </Routes> 
      </Router> 
      <ToastContainer/>
    </>
  );
}

export default App;
