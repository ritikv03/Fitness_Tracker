import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [shouldFetchExercises, setShouldFetchExercises] = useState(true);
  const location = useLocation();
  const category = location.pathname.split('/')[1];
  
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const muscleId = getMuscleId(category);
        if (!muscleId) {
          console.error('Invalid muscle group:', category);
          return;
        }
        const response = await fetch(
          `https://wger.de/api/v2/exercise/?muscles=${muscleId}&language=2&limit=12` 
        );
        if (!response.ok) {
          throw new Error('Failed to fetch exercises');
        }
        const data = await response.json();
        const limitedExercises = data.results.slice(0, Math.min(12, data.results.length));
        shuffleArray(limitedExercises);
        setExercises(limitedExercises);
        setShouldFetchExercises(false);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    if (shouldFetchExercises) {
      fetchExercises();
    }
  }, [category, shouldFetchExercises]);
  
  const getMuscleId = (muscleName) => {
    const muscleMap = {
        chest: 5,
        back: 12,
        shoulders: 10,
        abs: 8,
        arms: 14,
        legs: 9,
    };
    return muscleMap[muscleName];
  };
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  return (
    <Container>
      <h2 className="text-center mt-4 mb-4">Workout Plan: {category}</h2>
      <Button variant="primary" className="mb-3" onClick={() => setShouldFetchExercises(true)}>Refresh Exercises</Button>
      <Row xs={1} md={2} lg={4} className="g-4">
        {exercises.map((exercise) => (
          <Col key={exercise.id}>
            <Card className="shadow" style={{ height: '100%' }}>
              <Card.Body>
                <Card.Title>{exercise.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExerciseList;
