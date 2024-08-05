import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import ExerciseList from '../Exercise/Exercise';

const Legs = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'auto' }}>
        <Sidebar />
        <ExerciseList />
    </div>
  )
}

export default Legs
