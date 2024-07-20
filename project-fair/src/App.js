import { Route, Routes } from 'react-router-dom';
import './App.css';
import PFHome from './Pages/PFHome'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Footer from './Components/Footer';
import Auth from './Components/Auth';

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<PFHome/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register />}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/projects' element={<Projects/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
