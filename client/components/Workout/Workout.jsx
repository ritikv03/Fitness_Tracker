import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Workout = () => {
    const navigate = useNavigate();
    const handleNavigate = (route) => {
        navigate(route);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'auto' }}>
            <Sidebar />
            <Container fluid className="dashboard-container">
                <div className="text-center mb-4">
                    <h1 className="font-weight-bold">Workout Plan</h1>
                </div>
                <Row className="justify-content-center">
                    <Col md={4} className="mb-3 pl-0">
                        <div className="p-3 shadow bg-white rounded" style={linkStyle} onClick={() => handleNavigate('/chest')}>
                            <h2>Chest</h2>
                        </div>
                    </Col>
                    <Col md={4} className="mb-3 pl-0">
                        <div className="p-3 shadow bg-white rounded" style={linkStyle} onClick={() => handleNavigate('/back')}>
                            <h2>Back</h2>
                        </div>
                    </Col>
                    <Col md={4} className="mb-3 pl-0">
                        <div className="p-3 shadow bg-white rounded" style={linkStyle} onClick={() => handleNavigate('/legs')}>
                            <h2>Legs</h2>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={4} className="mb-3 pl-0">
                        <div className="p-3 shadow bg-white rounded" style={linkStyle} onClick={() => handleNavigate('/shoulders')}>
                            <h2>Shoulders</h2>
                        </div>
                    </Col>
                    <Col md={4} className="mb-3 pl-0">
                        <div className="p-3 shadow bg-white rounded" style={linkStyle} onClick={() => handleNavigate('/abs')}>
                            <h2>Abs</h2>
                        </div>
                    </Col>
                    <Col md={4} className="mb-3 pl-0">
                        <div className="p-3 shadow bg-white rounded" style={linkStyle} onClick={() => handleNavigate('/arms')}>
                            <h2>Arms</h2>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const linkStyle = {
    textDecoration: 'none',
    color: 'black', // Change text color to black
    cursor: 'pointer', // Add pointer cursor
};

export default Workout;
