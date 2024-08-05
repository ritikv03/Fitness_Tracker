import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Container, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const BMI = () => {
  const [userData, setUserData] = useState({
    height: 0,
    weight: 0,
  });
  const [bmi, setBMI] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('id');
        if (!userId) throw new Error('User ID not found in local storage');
        
        const response = await axios.get(`http://localhost:3001/bmi/${userId}`);
        const { height, weight } = response.data.user;
        setUserData({ height, weight });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const calculateBMI = () => {
    const { height, weight } = userData;
    const heightInMeter = height / 100;
    const calculatedBMI = weight / (heightInMeter * heightInMeter);
    setBMI(calculatedBMI.toFixed(2));
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'auto' }}>
      <Sidebar />
      <Container fluid style={{ padding: '20px' }}>
        <h1 className="mb-4">BMI Calculator</h1>
        <p>
          Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.
          It is used to screen for weight categories that may lead to health problems.
          Maintaining a healthy BMI is important for overall health and reduces the risk of various diseases.
        </p>
        <Button variant="primary" className="mb-4" onClick={calculateBMI}>Calculate</Button>
        <h2 className="mb-3">BMI Categories and Ranges</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category</th>
              <th>BMI Range (kg/m²)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Underweight</td>
              <td>Less than 18.5</td>
            </tr>
            <tr>
              <td>Normal weight</td>
              <td>18.5 – 24.9</td>
            </tr>
            <tr>
              <td>Overweight</td>
              <td>25 – 29.9</td>
            </tr>
            <tr>
              <td>Obesity</td>
              <td>30 or greater</td>
            </tr>
          </tbody>
        </Table>
        {bmi && (
          <div className="mt-4">
            <h3>Your BMI: {bmi}</h3>
          </div>
        )}
      </Container>
    </div>
  );
};

export default BMI;
