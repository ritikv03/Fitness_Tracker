import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Dashboard.css';
import axios from 'axios';
import WaterConsumption from '../WaterConsumption/WaterConsumption';
import Note from '../Notes/Notes';

const Dashboard = () => {
    const [dailyGoal, setDailyGoal] = useState(0);
    const [caloriesConsumed, setCaloriesConsumed] = useState(0);
    const [glassesConsumed, setGlassesConsumed] = useState(0);
    const [caloriesToGo, setCaloriesToGo] = useState(0);
    const [inputCalories, setInputCalories] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem('id');
            if (!userId) {
                console.error('User ID not found in local storage');
                return;
            }
            try {
                const response = await axios.post(`http://localhost:3001/dashboard`, { id: userId });
                const { dailyGoal, caloriesConsumed} = response.data;
                setDailyGoal(dailyGoal);
                setCaloriesConsumed(caloriesConsumed);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const remaining = dailyGoal - caloriesConsumed;
        setCaloriesToGo(Math.max(remaining, 0));
    }, [dailyGoal, caloriesConsumed]);

    const handleAddCalories = () => {
        const caloriesToAdd = parseInt(inputCalories);
        if (!isNaN(caloriesToAdd)) {
            const updatedCaloriesConsumed = caloriesConsumed + caloriesToAdd;
            setCaloriesConsumed(updatedCaloriesConsumed);
            localStorage.setItem('caloriesConsumed', updatedCaloriesConsumed.toString());
    
            const userId = localStorage.getItem('id');
            axios.post(`http://localhost:3001/dashboard/${userId}/add-calories`, { caloriesConsumed: updatedCaloriesConsumed })
                .then(() => {
                    console.log('Calories added successfully');
                })
                .catch(err => console.error('Error adding calories:', err));
    
            setInputCalories('');
        }
    };

    const handleClear = () => {
        const userId = localStorage.getItem('id');
        axios.delete(`http://localhost:3001/dashboard/${userId}/clear`)
            .then(() => {
                setCaloriesConsumed(0);
                setGlassesConsumed(0);
                localStorage.setItem('caloriesConsumed', '0');
                localStorage.setItem('glassesConsumed', '0');
            })
            .catch(err => console.error('Error clearing calories:', err));
    };

    const caloriePercentage = ((dailyGoal - caloriesToGo) / dailyGoal) * 100;
    const getColor = (percentage) => {
        if (percentage <= 50) {
            return '#f00';
        } else if (percentage <= 75) {
            return '#ff0';
        } else {
            return '#0f0';
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'auto' }}>
            <Sidebar />
            <Container fluid className="dashboard-container">
                <div className="text-center mb-4">
                    <h1 className="font-weight-bold">Daily Progress</h1>
                </div>
                <Row className="justify-content-center">
                    <Col md={4} className="mb-3">
                        <div className="p-3 shadow bg-white rounded">
                            <div>Daily Goal</div>
                            <div>{dailyGoal}</div>
                        </div>
                    </Col>
                    <Col md={4} className="mb-3">
                        <div className="p-3 shadow bg-white rounded">
                            <div>Calories Consumed</div>
                            <div>{caloriesConsumed}</div>
                        </div>
                    </Col>
                    <Col md={4} className="mb-3">
                        <div className="p-3 shadow bg-white rounded">
                            <div>Calories to Go</div>
                            <div>{caloriesToGo}</div>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center align-items-center">
                    <Col md={8} className="mb-3">
                        <Form.Group>
                            <Form.Control
                                type="number"
                                placeholder="Enter calories consumed"
                                value={inputCalories}
                                onChange={(e) => setInputCalories(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2} className="mb-3">
                        <Button variant="primary" onClick={handleAddCalories} className="btn-block">Add Calories</Button>
                        <Button variant="danger" onClick={handleClear} className="btn-block">Clear</Button>
                    </Col>
                    <Col md={1} className="mb-3">
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={4} className="mb-3">
                    <div className="p-3 shadow bg-white rounded text-center" style={{ height: '250px', backgroundColor: getColor(caloriePercentage) }}>
                    <h2 style={{ marginBottom: '10px', fontSize: '16px', color: '#666' }}>Overall Progress</h2>
                        <div style={{ width: '200px', height: '200px', margin: '0 auto' }}>
                        <CircularProgressbar
                            value={caloriePercentage}
                            text={`${caloriePercentage.toFixed(2)}%`}
                            styles={buildStyles({
                                pathColor: getColor(caloriePercentage),
                                textColor: getColor(caloriePercentage),
                            })}
                        />
                        </div>
                    </div>
                    </Col>
                    <Col md={4} className="mb-3">
                        <WaterConsumption />
                    </Col>
                    <Col md={4} className="mb-3">
                        <Note />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
