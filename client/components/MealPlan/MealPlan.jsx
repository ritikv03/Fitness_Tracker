import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import './MealPlan.css';

const MealPlan = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = localStorage.getItem('id');
        const response = await axios.post('http://localhost:3001/mealplan', { id });
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const calculateCalories = () => {
    if (!userData) return;
    const { age, height, weight, gender, exerciseLevel } = userData;
    let bmr = parseInt(10 * weight + 6.25 * height - 5 * age, 10) + (gender === 'male' ? 5 : -161);
    bmr = bmr * getExerciseFactor(exerciseLevel);
    bmr = Math.floor(bmr);
    const targetGainWeight = Math.round((bmr + 300) / 100) * 100;
    const targetMaintain = Math.round(bmr / 100) * 100;
    const targetLoseWeight = Math.round((bmr - 500) / 100) * 100;
    return { targetGainWeight, targetMaintain, targetLoseWeight };
  };

  const getExerciseFactor = (level) => {
    switch (level) {
      case 'none':
        return 1.2;
      case 'light':
        return 1.375;
      case 'moderate':
        return 1.55;
      case 'heavy':
        return 1.725;
      case 'veryActive':
        return 1.9;
      default:
        return 1.2;
    }
  };

  const handleContainerClick = async (caloriesType, caloriesAmount) => {
    localStorage.setItem(caloriesType, caloriesAmount.toString());
    const id = localStorage.getItem('id');
    try {
      await axios.post('http://localhost:3001/dashboard/update-goal', { id, dailyGoal: caloriesAmount });
    } catch (error) {
      console.error('Error updating daily goal:', error);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data found</div>;
  }

  const { targetGainWeight, targetMaintain, targetLoseWeight } = calculateCalories();

  return (
    <div className="bg">
      <Container fluid className="d-flex justify-content-center align-items-center vh-100">
        <Row>
          <Col md={4} className="text-center">
            <a href="/dashboard">
              <div className="calorie-container shadow" onClick={() => handleContainerClick('target', targetGainWeight)}>
                <h2>Gain Weight</h2>
                <h3 className="white-text">{targetGainWeight}</h3>
              </div>
            </a>
          </Col>
          <Col md={4} className="text-center">
            <a href="/dashboard">
              <div className="calorie-container shadow" onClick={() => handleContainerClick('target', targetMaintain)}>
                <h2>Maintain Weight</h2>
                <h3 className="white-text">{targetMaintain}</h3>
              </div>
            </a>
          </Col>
          <Col md={4} className="text-center">
            <a href="/dashboard">
              <div className="calorie-container shadow" onClick={() => handleContainerClick('target', targetLoseWeight)}>
                <h2>Lose Weight</h2>
                <h3 className="white-text">{targetLoseWeight}</h3>
              </div>
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
  
};

export default MealPlan;
