import React from 'react';
import { CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const navu = () => {
        navigate('/home');
    };

    return (
        <CDBSidebar textColor="#fff" backgroundColor="rgb(37, 90, 122)">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                <Link to="/dashboard" className="text-white" style={{ textDecoration: 'none' }}>Fitness Tracker</Link>
            </CDBSidebarHeader>
            <CDBSidebarContent className="sidebar-content">
                <CDBSidebarMenu>
                    <NavLink exact to="/dashboard" activeClassName="activeClicked" className="text-white" style={{ textDecoration: 'none' }}>
                        <CDBSidebarMenuItem icon="chart-line">
                            Dashboard
                        </CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/bmi" activeClassName="activeClicked" className="text-white" style={{ textDecoration: 'none' }}>
                        <CDBSidebarMenuItem icon="fire">
                            BMI Calculator
                        </CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/workout" activeClassName="activeClicked" className="text-white" style={{ textDecoration: 'none' }}>
                        <CDBSidebarMenuItem icon="dumbbell">
                            Workout Plan
                        </CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/account" activeClassName="activeClicked" className="text-white" style={{ textDecoration: 'none' }}>
                        <CDBSidebarMenuItem icon="user">
                            My Account
                        </CDBSidebarMenuItem>
                    </NavLink>
                </CDBSidebarMenu>
            </CDBSidebarContent>
            <hr style={{ borderTop: '1px solid #fff', margin: '10px 0' }} />
            <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
                <button className="btn btn-danger" onClick={navu}>Logout</button>
            </div>
        </CDBSidebar>
    );
};

export default Sidebar;
