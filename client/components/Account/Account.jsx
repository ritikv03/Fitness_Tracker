import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userId = localStorage.getItem('id');
                if (!userId) {
                    setError('User ID not found in local storage');
                    return;
                }
                const response = await axios.get(`http://localhost:3001/account/${userId}`);
                setUserDetails(response.data.user);
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError('Error fetching user details. Please try again later.');
            }
        };
        fetchUserDetails();
    }, []);

    const updatePlan = () =>{
        navigate('/mealplan');
    };
    
    const updateStats = () =>{
        navigate('/dietinfo');
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'auto' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {error && <p>{error}</p>}
                {userDetails && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%', maxWidth: '800px' }}>
                        <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>Welcome {userDetails.name},</div>
                        <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>Your Stats</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                            <UserDetailRow label="Email" value={userDetails.email} />
                            <UserDetailRow label="Age" value={userDetails.age} />
                            <UserDetailRow label="Height" value={userDetails.height} />
                            <UserDetailRow label="Weight" value={userDetails.weight} />
                            <UserDetailRow label="Gender" value={userDetails.gender} />
                            <UserDetailRow label="Exercise Level" value={userDetails.exerciseLevel} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <button className="btn btn-primary" onClick={updateStats}>Update Stats</button>
                            <button className="btn btn-success" style={{ marginLeft: '10px' }} onClick={updatePlan}>Update Plan</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const UserDetailRow = ({ label, value }) => (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: '15px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{label}</div>
        <div style={{ fontSize: '14px' }}>{value}</div>
    </div>
);

export default Account;
