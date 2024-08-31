
import './App.css';
import HomePage from './components/landingpage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Dashboard from './components/dashboard/Dashboard';

import 'react-toastify/dist/ReactToastify.css';
import Planner from './components/dashboard/Planner';
function App() {
  AOS.init();


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/preferences" element={<Dashboard />} />
          <Route path="/plan" element={<Planner />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
