import React, { Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { hrLogout } from '../../actions/authActions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TDW_logo from '../../assets/Images/official_logo.png';

const HRSidebar = (props) => {

    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
		if(isAuthenticated === false) {
			props?.history?.push("/login");
		}
	}, [isAuthenticated])


    const logoutHandler = () => {
        dispatch(hrLogout());
    }


    return (
        <Fragment>
            <div className="sidebar">
            <div className="logo-details">
                <img src={TDW_logo} className="logoImg" alt="logo" />
            </div>
            <br/>

            <ul className="nav-links">
                <li className="nav_link">
                    <NavLink key="dashboard" to="/Nurse/Dashboard" activeClassName="link-name-active">
                        <i className="fas fa-home" style={{color: '#F6D55C', fontSize: '24px'}}></i>
                        <span className="link_name">My Dashboard</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="hrpatients" to="/Nurse/Patients" activeClassName="link-name-active">
                    <i className="fas fa-user-injured" style={{color: '#ED553B', fontSize: '24px'}}></i>
                        <span className="link_name">Assigned Patients</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink to="/CCM/Nurse/Patients" key="nurseCCMPts" activeClassName="link-name-active">
                    <i className="fas fa-hospital-user" style={{color: '#3CAEA3', fontSize: '24px'}}></i>
                        <span className="link_name">CCM Patients</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="timeReport" to="/Nurse/Report/TimeReport" activeClassName="link-name-active">
                    <i className="fas fa-stopwatch-20" style={{color: 'crimson', fontSize: '24px'}}></i>
                        <span className="link_name">Time Report By Pt.</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="timesummaryreport" to="/Nurse/Report/Financial_Report" activeClassName="link-name-active">
                    <i className="fas fa-dollar-sign" style={{color: 'green', fontSize: '24px'}}></i>
                        <span className="link_name">Financial Report</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="minuteshistory" to="/Nurse/Minutes/History" activeClassName="link-name-active">
                    <i className="fas fa-file-medical-alt" style={{color: 'orange', fontSize: '24px'}}></i>
                        <span className="link_name">Minutes History</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="careplans" to="/Nurse/careplans" activeClassName="link-name-active">
                    <i className="fas fa-pencil-alt" style={{color: '1D7874', fontSize: '24px'}}></i>
                        <span className="link_name">Careplans</span>
                    </NavLink>
                </li>

 
                {/* <li>
                    <NavLink key="logout" to="#" onClick={logoutHandler}>
                        <i className="bx bx-log-out" style={{color: 'red'}}></i>
                        <span className="link_name" style={{color: 'red', fontWeight: 'bold'}}>Logout</span>
                    </NavLink>
                </li> */}
            </ul>
        </div>    
        </Fragment>
    )
}

export default HRSidebar;
