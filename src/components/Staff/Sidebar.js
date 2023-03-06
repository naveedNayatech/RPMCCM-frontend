import React, { Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { staffLogout } from '../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import TDW_logo from '../../assets/Images/official_logo.png';

const Sidebar = (props) => {

    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
		
		if(isAuthenticated === false) {
			props?.history?.push("/login");
		}
	}, [isAuthenticated])


    const logoutHandler = () => {
        dispatch(staffLogout());
    }


    return (
        <Fragment>
            <div className="sidebar">
            <div className="logo-details">
             <img src={TDW_logo} className="logoImg" alt="logo" />
            </div>

            <ul className="nav-links">
            <li className="nav_link">
                    <NavLink key="dashboard" to="/doctor/dashboard" activeClassName="link-name-active">
                        <i className="fas fa-home" style={{color: '#F6D55C', fontSize: '24px'}}></i>
                        <span className="link_name">My Dashboard</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="staffpatients" to="/doctor/patients" activeClassName="link-name-active">
                    <i className="fas fa-hospital-user" style={{color: '#ED553B', fontSize: '24px'}}></i>
                        <span className="link_name">RPM Patients</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="staffpatients" to="/CCM/doctor/patients" activeClassName="link-name-active">
                    <i className="fas fa-disease" style={{color: '#2ec4b6', fontSize: '24px'}}></i>
                        <span className="link_name">CCM Patients</span>
                    </NavLink>
                </li>    

                <li className="nav_link">
                    <NavLink key="careplans" to="/doctor/careplan" activeClassName="link-name-active">
                    <i className="fas fa-pencil-alt" style={{color: '1D7874', fontSize: '24px'}}></i>
                        <span className="link_name">Careplans</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="timesummaryreport" to="/doctor/report/financialReport" activeClassName="link-name-active">
                    <i className="fas fa-dollar-sign" style={{color: 'green', fontSize: '24px'}}></i>
                        <span className="link_name">Financial Report</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink key="logout" to="#" onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt" style={{color: 'red', fontSize: '24px'}}></i>
                        <span className="link_name" style={{color: 'red', fontWeight: 'bold'}}>Logout</span>
                    </NavLink>
                </li> 
            </ul>
        </div>    
        </Fragment>
    )
}

export default Sidebar;
