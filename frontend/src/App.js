
import './App.css';
import HomePage from './components/landingpage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Dashboard from './components/dashboard/Dashboard';

import 'react-toastify/dist/ReactToastify.css';
import Planner from './components/dashboard/Planner';
import UserDashboard from './components/dashboard/UserDashboard';
import TripPlanner from './components/dashboard/TripPlanner';
import History from './components/dashboard/History'
import Collaborator from './components/dashboard/Collabrator'
import Recommendations from './components/dashboard/Recommendations'
import TravelExpense from './components/dashboard/TravelExpense'
function App() {
  AOS.init();


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/preferences" element={<Dashboard />} />
          <Route path="/plan" element={<Planner />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/travel-expense" element={<TravelExpense />} />
          <Route path="/history" element={<History />} />
          <Route path="/collaborator" element={<Collaborator />} />
          <Route path="/recommendations" element={<Recommendations />} />

        </Routes>
      </Router >

    </>
  );
}

export default App;
