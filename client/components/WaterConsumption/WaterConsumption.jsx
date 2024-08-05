import React, { useState, useEffect } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const WaterConsumption = () => {
  const [glassesConsumed, setGlassesConsumed] = useState(0);
  const [percentage, setPercentage] = useState(0);

  // Function to update state based on local storage value
  const updateStateFromLocalStorage = () => {
    console.log('Updating state from local storage');
    const storedGlassesConsumed = localStorage.getItem('glassesConsumed');
    console.log('Stored glasses consumed:', storedGlassesConsumed);
    if (storedGlassesConsumed) {
      const newGlassesConsumed = parseInt(storedGlassesConsumed, 10);
      console.log('Parsed glasses consumed:', newGlassesConsumed);
      setGlassesConsumed(newGlassesConsumed);
      const newPercentage = (newGlassesConsumed / 12) * 100;
      console.log('New percentage:', newPercentage);
      setPercentage(newPercentage);
    }
  };

  useEffect(() => {
    // Call the function to update state from local storage when component mounts
    updateStateFromLocalStorage();
  }, []);

  const incrementGlassesConsumed = () => {
    const newGlassesConsumed = glassesConsumed + 1;
    if (newGlassesConsumed <= 12) {
      setGlassesConsumed(newGlassesConsumed);
      const newPercentage = (newGlassesConsumed / 12) * 100;
      setPercentage(newPercentage);
      const userId = localStorage.getItem('id');
      axios.post(`http://localhost:3001/waterconsumption/${userId}`, { glassesConsumed: newGlassesConsumed })
        .then(res => console.log('Water consumption progress updated:', res.data))
        .catch(err => console.error('Error updating water consumption:', err));
      localStorage.setItem('glassesConsumed', newGlassesConsumed.toString());
    }
  };

  return (
    <div style={{ width: '380px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)', padding: '29px', borderRadius: '10px', borderLeft: '4px solid #007bff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '16px', color: '#666' }}>Water Tracker ({glassesConsumed}/12)</h2>
      <div style={{ position: 'relative', width: '100px', margin: 'auto' }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage.toFixed(0)}%`}
          styles={buildStyles({
            pathColor: '#3f51b5',
            textColor: '#3f51b5',
          })}
        />
      </div>
      <br />
      <div style={{ textAlign: 'center' }}>
        <Button onClick={incrementGlassesConsumed}>Drink a Glass</Button>
      </div>
    </div>
  );
};

export default WaterConsumption;
