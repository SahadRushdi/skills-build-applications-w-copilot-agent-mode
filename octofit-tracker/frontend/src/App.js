import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import octofitLogo from './octofitapp-small.png';
import './App.css';

const navItems = [
  { to: '/users',      label: 'Users',       icon: '👤' },
  { to: '/teams',      label: 'Teams',       icon: '🏆' },
  { to: '/activities', label: 'Activities',  icon: '🏃' },
  { to: '/leaderboard',label: 'Leaderboard', icon: '📊' },
  { to: '/workouts',   label: 'Workouts',    icon: '💪' },
];

const featureCards = [
  { to: '/users',       icon: '👤', title: 'Users',       desc: 'Manage athlete profiles and accounts.',        color: 'bg-primary' },
  { to: '/teams',       icon: '🏆', title: 'Teams',       desc: 'Create and manage competing fitness teams.',   color: 'bg-success' },
  { to: '/activities',  icon: '🏃', title: 'Activities',  desc: 'Log and review every workout activity.',       color: 'bg-warning' },
  { to: '/leaderboard', icon: '📊', title: 'Leaderboard', desc: 'See who is leading the fitness challenge.',    color: 'bg-danger'  },
  { to: '/workouts',    icon: '💪', title: 'Workouts',    desc: 'Browse personalised workout suggestions.',     color: 'bg-info'    },
];

function HomePage() {
  return (
    <>
      <div className="octofit-hero">
        <h1 className="display-4">Welcome to OctoFit Tracker 🐙</h1>
        <p className="lead mt-3">Track your fitness activities, compete with your team, and reach your goals.</p>
      </div>

      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">Explore the App</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {featureCards.map(card => (
            <div className="col" key={card.to}>
              <div className="card feature-card h-100">
                <div className={`card-header text-white ${card.color}`}>
                  <span className="me-2">{card.icon}</span>{card.title}
                </div>
                <div className="card-body d-flex flex-column">
                  <p className="card-text flex-grow-1">{card.desc}</p>
                  <NavLink to={card.to} className="btn btn-outline-primary mt-auto align-self-start">
                    View {card.title}
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src={octofitLogo} alt="OctoFit logo" className="navbar-logo" />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navItems.map(item => (
                <li className="nav-item" key={item.to}>
                  <NavLink
                    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                    to={item.to}
                  >
                    <span className="me-1">{item.icon}</span>{item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users"       element={<Users />} />
          <Route path="/teams"       element={<Teams />} />
          <Route path="/activities"  element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts"    element={<Workouts />} />
        </Routes>
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-5">
        <small>© 2026 OctoFit Tracker · Built with React &amp; Django</small>
      </footer>
    </div>
  );
}

export default App;
