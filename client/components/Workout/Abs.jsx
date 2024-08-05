import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import ExerciseList from '../Exercise/Exercise';

const Abs = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'auto' }}>
        <Sidebar />
        <ExerciseList />
    </div>
  )
}

export default Abs
