import React from 'react';
import './AppBar.css';
import { useNavigate } from 'react-router-dom';

const AppBar = () => {

  const navigate = useNavigate()
  const logs = ()=>{
    navigate('/login')
  }
  const signs = ()=>{
    navigate('/register')
  }

  return (
    <div className="Background">
      <div className="content-container">
        <div className="fitness-tracker">
          <h1>Fitness Tracker</h1>
        </div>
        <div className="button-container">
          <button className="btn btn-primary" onClick={logs}> Login</button>
          <button className="btn btn-secondary" onClick={signs}>Signup</button>
        </div>
      </div>

    </div>
  );
}

export default AppBar;
