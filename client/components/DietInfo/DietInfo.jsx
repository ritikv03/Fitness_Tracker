import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function DietInfo() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [exerciseLevel, setExerciseLevel] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const id=localStorage.getItem("id");
        axios.post('http://localhost:3001/dietinfo',{name,age,height,weight,gender,exerciseLevel,id})
        .then(result=>{
            console.log(result)
            navigate('/mealplan')
        })
    };

    return (
        <div className='bg'>
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='glass-bg p-3 rounded w-25'>
                <h2 className='d-flex justify-content-center align-items-center'>User Information</h2>
                <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                        <label htmlFor='age'>
                            <strong>Name</strong>
                        </label>
                        <input
                          type="string"
                          placeholder='Enter Full Name'
                          autoComplete='off'
                          name="name"
                          className='form-control rounded-0'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='age'>
                            <strong>Age</strong>
                        </label>
                        <input
                          type="number"
                          placeholder='Enter Age'
                          autoComplete='off'
                          name="age"
                          className='form-control rounded-0'
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='height'>
                            <strong>Height</strong>
                        </label>
                        <input
                          type="number"
                          placeholder='Enter Height in cm'
                          autoComplete='off'
                          name="height"
                          className='form-control rounded-0'
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='age'>
                            <strong>Weight</strong>
                        </label>
                        <input
                          type="number"
                          placeholder='Enter Weight in kg'
                          autoComplete='off'
                          name="wright"
                          className='form-control rounded-0'
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='gender'>
                            <strong>Gender</strong>
                        </label>
                        <select
                          className='form-control rounded-0'
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='exerciseLevel'>
                            <strong>Exercise Level</strong>
                        </label>
                        <select
                          className='form-control rounded-0'
                          value={exerciseLevel}
                          onChange={(e) => setExerciseLevel(e.target.value)}
                        >
                            <option value="">Select Exercise Level</option>
                            <option value="sedentary">Sedentary</option>
                            <option value="lightlyActive">Lightly Active</option>
                            <option value="moderatelyActive">Moderately Active</option>
                            <option value="veryActive">Very Active</option>
                        </select>
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
}
export default DietInfo;
